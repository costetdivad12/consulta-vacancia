import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MUIDataTable from "mui-datatables";
import TableContainer from '@mui/material/TableContainer';

import "../index.css";

const GetSelectNivel = () => {


  const [Selects, setSelect] = useState([]);
  const [chageSelect, setchageSelect] = useState("");
  const [SelectsMuni, setSelectsMuni] = useState([]);
  const [chageSelectMuni, setchageSelectMuni] = useState("");
  const [DatosVacancia, setDatosVacancia] = useState([]);
  const [chageSelectTipo, setchageSelectTipo] = useState("");
  const columns = [{ name:"cct",
  label:"CCT"},
  { name:"zonaEscolar",
  label:"ZONA ESCOLAR"},{ name:"sector",
  label:"SECTOR"},{ name:"turno",
  label:"TURNO"}, { name:"tipoVacancia",
  label:"TIPO VACANCIA"},{ name:"plazaFormatoFone",
  label:"CLAVE PLAZA"},{ name:"rfc",
  label:"RFC"},{ name:"nombre",
  label:"NOMBRE"},{ name:"apellidoPaterno",
  label:"APELLIDO PATERNO"},{ name:"apellidoMaterno",
  label:"APELLIDO MATERNO"},{ name:"categoria",
  label:"CATEGORIA"},{ name:"claveCategoria",
  label:"CLAVE CATEGORIA"}];
  const options = {
 
};
 
 let datass =[];
 DatosVacancia.map((tabla)=>{

    datass=[{
        cct:tabla.cct,
        zonaEscolar:tabla.zonaEscolar,
        sector:tabla.sector,
        turno:tabla.turno,
        tipoVacancia:tabla.tipoVacancia===1?'DIRECTOR':'DOCENTE',
        plazaFormatoFone:tabla.teacher.plazaFormatoFone,
        rfc:tabla.teacher.rfc,
        nombre:tabla.teacher.nombre,
        apellidoPaterno:tabla.teacher.apellidoPaterno,
        apellidoMaterno:tabla.teacher.apellidoMaterno,
        categoria:tabla.teacher.categoria,
        claveCategoria:tabla.teacher.claveCategoria
    }];
     
 });
 
  const getData = () => {
    const data = "https://serviciosweb.iebem.edu.mx:7001/education/level";
    axios.get(data).then((resp) => {
      //    console.log(resp.data);
      const datas = resp.data;
      setSelect(datas);
    });
  };

  const handleSelectChage = (e) => {
    
    const id_muni = e.target.value;
    setchageSelect(id_muni);
    
    const municipios = `https://serviciosweb.iebem.edu.mx:7001/ubication/ct/level/${id_muni}`;

    axios.get(municipios).then((resp) => {
    //   console.log(resp.data);
      const datosMuni = resp.data;
      setSelectsMuni(datosMuni);
      setchageSelectTipo("");
    setchageSelectMuni("");
    });
  };

   
  const handleSelectChageMuni1 = (e) => {
    const id_tipo = e.target.value;
    setchageSelectTipo(id_tipo);
    setchageSelectMuni("");
    
    
  }

  const handleSelectChageMuni = (e) => {
    const id_mu = e.target.value;
    console.log(id_mu)
    setchageSelectMuni(id_mu);
    const datoss = `https://serviciosweb.iebem.edu.mx:7001/vacancy/type/${chageSelectTipo}/level/${chageSelect}/ubication/${id_mu}`;
    axios.get(datoss).then((resp) => {
        const datos_vacancia=resp.data;
        
        setDatosVacancia(datos_vacancia);

        
        
      });

  };
  

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <br />
      <div className="container">
        <Box sx={{ minWidth: 100 }}>
          <FormControl sx={{m:1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chageSelect}
              label="Nivel"
              onChange={handleSelectChage}
            >
              {Selects.map((resp) => (
                // <li key={id}>{title}</li>
                <MenuItem key={resp.id} value={resp.id}>
                  {resp.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        {/* </Box>         */}
        <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chageSelectTipo}
              label="tipo"
              onChange={handleSelectChageMuni1}
            >
              <MenuItem key={1} value={1}>DIRECTIVO</MenuItem>
              <MenuItem key={2} value={2}>DOCENTE</MenuItem>
            </Select>
          </FormControl>
        
      {/* <Box sx={{ minWidth: 80 }}> */}
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Municipio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chageSelectMuni}
              label="Nivel"
              onChange={handleSelectChageMuni}
            >
              {SelectsMuni.map((resp) => (
                // <li key={id}>{title}</li>
                <MenuItem key={resp.clave} value={resp.clave}>{resp.municipio}</MenuItem>
              ))}
            </Select>
          </FormControl>

          
         
        </Box>
         <br />
        
             
       
      </div>
      <TableContainer sx={{ maxHeight: 300 }}>

      
      <MUIDataTable
        title={"LISTA DE VACANCIA PARA EL CAMBIO DE CENTROS DE TRABAJO."}
        data={datass}
        columns={columns}
        options={options}
      />
      </TableContainer>
    </>
  );
};

export default GetSelectNivel;
