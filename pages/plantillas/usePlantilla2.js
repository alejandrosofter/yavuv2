import axios from "axios";
import { useEffect, useState } from "react";

export function UsePlantilla2({ id, data }) {
  const [plantilla, setPlantilla] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPlantilla = async () => {
      setLoading(true);
      axios.post(`/api/plantillas/getPlantilla`, { id, data }).then((res) => {
        setPlantilla(res.data);
        setLoading(false);
      });
    };
    if (id) getPlantilla();
  }, [id, data]);
  if (loading) return "Cargando...";
  return [plantilla];
}
