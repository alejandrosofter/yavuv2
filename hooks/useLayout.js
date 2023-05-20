import { useContext, useEffect, useState } from "react";
import { Context } from "context/userContext";
export default function useLayout(dataLayout) {
  const { fnCambiaLayout } = useContext(Context);
  const [layout, setLayout] = useState(dataLayout);
  useEffect(() => {
    fnCambiaLayout(dataLayout);
  }, [layout]);
  return [layout, setLayout];
}
