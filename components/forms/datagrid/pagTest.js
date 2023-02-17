import React from "react";
import { fuego, useCollection } from "@nandorojo/swr-firestore";

const collection = "modulos";
const limit = 10;
const orderBy = "nombre";

export default function Paginate() {
  const { data, mutate } = useCollection(
    collection,
    {
      limit,
      orderBy,
      // 🚨 this is required to get access to the snapshot!
      ignoreFirestoreDocumentSnapshotField: false,
    },
    {
      // this lets us update the local cache + paginate without interruptions
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      refreshInterval: 0,
    }
  );

  const paginate = async () => {
    if (!data?.length) return;

    const ref = fuego.db.collection(collection);

    // get the snapshot of last document we have right now in our query
    const startAfterDocument = data[data.length - 1].__snapshot;

    // get more documents, after the most recent one we have
    const moreDocs = await ref
      .orderBy(orderBy)
      .startAfter(startAfterDocument)
      .limit(limit)
      .get()
      .then((d) => {
        const docs = [];
        d.docs.forEach((doc) =>
          docs.push({ ...doc.data(), id: doc.id, __snapshot: doc })
        );
        return docs;
      });

    // mutate our local cache, adding the docs we just added
    // set revalidate to false to prevent SWR from revalidating on its own
    mutate((state) => [...state, ...moreDocs], false);
  };

  return data ? (
    <div>
      {data.map(({ id, nombre }) => (
        <div key={id}>{nombre}</div>
      ))}
      <button onClick={paginate}>paginate</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
