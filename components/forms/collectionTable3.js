import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MaterialReactTable from "material-react-table";
import { Typography } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fuego } from "@nandorojo/swr-firestore";

const fetchSize = 25;

const _colectionTable = ({
  coleccion,
  where,
  columns,
  orderBy,
  limit,
  acciones,
  callbackchangedata,
}) => {
  const tableContainerRef = useRef(null); //we can get access to the underlying TableContainer element and react to its scroll events
  const virtualizerInstanceRef = useRef(); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method
  const rowVirtualizerInstanceRef = useRef(null);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState();
  const [sorting, setSorting] = useState([]);

  const { data, fetchNextPage, isError, isFetching, isLoading } =
    useInfiniteQuery(
      ["table-data", columnFilters, globalFilter, sorting],
      async ({ pageParam = 0 }) => {
        let ref = fuego.db.collection(coleccion);
        // ref = addsWheres(ref, columnFilters);
        // ref = addsWheres(ref, orderBy);
        //add orderby array
        if (orderBy && Array.isArray(orderBy))
          ref = ref.orderBy(orderBy[0], orderBy[1]);
        // ref = ref.limit(limit);

        const querySnapshot = await ref.get();
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return docs;
      },
      {
        getNextPageParam: (_lastGroup, groups) => groups.length,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      }
    );

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  //scroll to top of table when sorting or filters change
  useEffect(() => {
    if (virtualizerInstanceRef.current) {
      virtualizerInstanceRef.current.scrollToIndex(0);
    }
  }, [sorting, columnFilters, globalFilter]);

  //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  return (
    <MaterialReactTable
      columns={columns}
      data={flatData}
      enablePagination={false}
      enableRowNumbers
      enableRowVirtualization //optional, but recommended if it is likely going to be more than 100 rows
      manualFiltering
      manualSorting
      muiTableContainerProps={{
        ref: tableContainerRef, //get access to the table container element
        sx: { maxHeight: "600px" }, //give the table a max height
        onScroll: (
          event //add an event listener to the table container element
        ) => fetchMoreOnBottomReached(event.target),
      }}
      muiToolbarAlertBannerProps={
        isError
          ? {
              color: "error",
              children: "Error loading data",
            }
          : undefined
      }
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onSortingChange={setSorting}
      renderBottomToolbarCustomActions={() => (
        <Typography>
          Fetched {totalFetched} of {totalDBRowCount} total rows.
        </Typography>
      )}
      state={{
        columnFilters,
        globalFilter,
        isLoading,
        showAlertBanner: isError,
        showProgressBars: isFetching,
        sorting,
      }}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
      rowVirtualizerProps={{ overscan: 10 }}
    />
  );
};

const queryClient = new QueryClient();

const ColectionTable3 = ({
  coleccion,
  where,
  columns,
  orderBy,
  limit,
  acciones,
  callbackchangedata,
}) => (
  <QueryClientProvider client={queryClient}>
    <_colectionTable
      coleccion={coleccion}
      where={where}
      columns={columns}
      orderBy={orderBy}
      limit={10}
      acciones={acciones}
      callbackchangedata={callbackchangedata}
    />
  </QueryClientProvider>
);

export default ColectionTable3;
