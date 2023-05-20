import { useEffect, useState } from "react";
import Select2 from "@components/forms/select2Formik";
export default function SelectCamara({ label, campo, callbackchange }) {
  const [camaras, setCamaras] = useState([]);
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        const camaras = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCamaras(camaras);
      })
      .catch(function (err) {});
  }, []);

  if (!camaras) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      campo={campo ? campo : "camara"}
      label={label ? label : "Camara"}
      lista={camaras}
      campoId="deviceId"
      campoLabel="label"
    />
  );
}
