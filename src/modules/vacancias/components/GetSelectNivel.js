import React, { useEffect, useState } from "react";
import { api } from "../../../api";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MUIDataTable from "mui-datatables";


import "../../../index.css";

const GetSelectNivel = () => {


  const [Selects, setSelect] = useState([]);
  const [chageSelect, setchageSelect] = useState("");
  const [SelectsTipoVacancia, setSelectsTipoVacancia] = useState([]);
  const [SelectsTipoVacanciaresult, setSelectsTipoVacanciaresult] = useState([]);
  const [SelectsMuni, setSelectsMuni] = useState([]);
  const [chageSelectMuni, setchageSelectMuni] = useState("");
  const [DatosVacancia, setDatosVacancia] = useState([]);

  
  
  
  
  const [chageSelectTipo, setchageSelectTipo] = useState("");


  // mostrar y ocultar
  const [showTipo, setshowTipo] = useState(false);
  const [showTipoMuni, setshowTipoMuni] = useState(false);
  const columns = [
    { name:"cct", label:"CCT",disablePadding: false},
  { name:"zonaEscolar",label:"ZONA ESCOLAR",disablePadding: false},
  { name:"sector",label:"SECTOR",disablePadding: false},
  { name:"turno",label:"TURNO",disablePadding: false}, 
  { name:"tipoVacancia",label:"TIPO VACANCIA"},
  { name:"plazaFormatoFone",label:"CLAVE PLAZA",disablePadding: false},
 // { name:"rfc",
  //label:"RFC"},{ name:"nombre",
  //label:"NOMBRE"},{ name:"apellidoPaterno",
  //label:"APELLIDO PATERNO"},{ name:"apellidoMaterno",
  //label:"APELLIDO MATERNO"},
  { name:"categoria",label:"CATEGORIA",disablePadding: false},
  { name:"claveCategoria",label:"CLAVE CATEGORIA",disablePadding: false}];

  const options = {
   filterType:"dropdown",
   responsive:"scroll",
   selectableRows: false,
   
  };
 
 let datass =[];
 DatosVacancia.forEach((tabla)=>{

    datass.push({
        cct:tabla.cct,
        zonaEscolar:tabla.zonaEscolar,
        sector:tabla.sector,
        turno:tabla.turno,
        tipoVacancia:tabla.tipoVacanciaId===1?'DOCENTE':tabla.tipoVacanciaId===2?'DIRECTIVA':'SUPERVISIÓN',
        plazaFormatoFone:tabla.teacher.plazaFormatoFone,
       // rfc:tabla.teacher.rfc,
        //nombre:tabla.teacher.nombre,
        //apellidoPaterno:tabla.teacher.apellidoPaterno,
        //apellidoMaterno:tabla.teacher.apellidoMaterno,
        categoria:tabla.teacher.categoria,
        claveCategoria:tabla.teacher.claveCategoria
    });
     
 });
 
  const getData = async() => {
    await api.get("/education/level").then((resp) => {
        
      const datas = resp.data;
      setSelect(datas);
     

    });
    
  };

  const handleSelectChage = async(e) => {
    
    const id_nivel = e.target.value;
    setchageSelect(id_nivel);

    await api.get(`/vacancy/type/level/${id_nivel}`).then((resp) => {
      
      const datostipovacancia = resp.data;
      setSelectsTipoVacancia(datostipovacancia);
      setshowTipo(true);
      setSelectsTipoVacanciaresult("");
      setchageSelectMuni("");

  });    
   
  };

  const handleSelectChangeTipo=async(e)=>{
    const id_tipo = e.target.value;
    
    setSelectsTipoVacanciaresult(id_tipo) 
    await api.get(`/ubication/ct/level/${chageSelect}/type/${id_tipo}`).then((resp) => {
      
      const datosMuni = resp.data;
      setSelectsMuni(datosMuni);
      setshowTipoMuni(true)
      setchageSelectMuni("");
  });

  };

  const handleSelectChangeTipoMuni = async (e)=>{
    const id_tipo_muni = e.target.value;
 
    setchageSelectMuni(id_tipo_muni);
    await api.get(`/vacancy/type/${SelectsTipoVacanciaresult}/level/${chageSelect}/ubication/${id_tipo_muni}`).then((resp) => {
      console.log(resp.data);
      const datosTabla = resp.data;
      setDatosVacancia(datosTabla);
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
          {showTipo? ( <FormControl sx={{m:1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={SelectsTipoVacanciaresult}
              label="tipo"
              onChange={handleSelectChangeTipo}
            >
              {SelectsTipoVacancia.map((resp) => (
                // <li key={id}>{title}</li>
                <MenuItem key={resp.id} value={resp.id} >
                  {resp.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl> ) :('') }

          {showTipoMuni? ( <FormControl sx={{m:1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">Municipio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chageSelectMuni}
              label="muni"
              onChange={handleSelectChangeTipoMuni}
            >
              {SelectsMuni.map((resp) => (
                // <li key={id}>{title}</li>
                <MenuItem key={resp.clave} value={resp.clave} >
                  {resp.municipio}
                </MenuItem>
              ))}
            </Select>
          </FormControl> ) :('') }
          
      

          
         
        </Box>
         <br />
        
      <MUIDataTable
        title={"LISTA DE VACANCIA PARA EL CAMBIO DE CENTROS DE TRABAJO."}
        data={datass}
        columns={columns}
        options={options}
      />
      </div>
     

      
    
    </>
  );
};

export default GetSelectNivel;
