import React, { useState } from "react";

import { api } from "../../../../api";
import Swal from "sweetalert2/dist/sweetalert2.js";

const HomeScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  const handleUploadFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleUpload = async () => {
    setIsFilePicked(false);
    const formData = new FormData();
    formData.append("file", selectedFile);

    await api
      .post("/vacancy/read/xlsx", formData)
      .then((resp) => {
        if (resp.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Se cargaron con exito ${resp.data.length} registros`,
            showConfirmButton: false,
            timer: 3500,
          });
          api
            .post("/vacancy/save/list", resp.data)
            .then((resp) => {
              setIsFilePicked(true);
            })
            .catch((error) => {
              Swal.fire("Ocurrio un error", "Revise la informacion", "error");
            });
        }
      })
      .catch((error) => {
        if (selectedFile === null) {
          Swal.fire("Ocurrio un error", "Cargue el archivo", "error");
        } else {
          Swal.fire(
            "Ocurrio un error",
            "Revise el formato del archivo",
            "error"
          );
        }
      });
  };

  return (
    <>
      <label className="form-label">CARGAR ARCHIVO (.XLS)</label>
      <input
        className="form-control form-control-lg"
        id="formFileLg"
        type="file"
        onChange={handleUploadFile}
      />
      <br />
      {isFilePicked ? (
        <button
          type="button"
          accept="aplication/xlsx"
          className="btn btn-outline-dark"
          onClick={handleUpload}
        >
          Cargar
        </button>
      ) : (
        <p>Cargando ......</p>
      )}
    </>
  );
};

export default HomeScreen;
