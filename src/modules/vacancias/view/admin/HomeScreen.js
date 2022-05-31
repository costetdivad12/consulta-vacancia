import React, { useState } from 'react'


const HomeScreen = () => {
    
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleUploadFile = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    const handleU=()=>{
        console.log('carga');
    };

    // console.log( selectedFile);
    return (
        <>
        
        <label className="form-label">CARGAR ARCHIVO (.XLS)</label>
        <input className="form-control form-control-lg" id="formFileLg" type="file"  onChange={handleUploadFile}/>
        <br/>
        <button type="button" className="btn btn-success" onClick={handleU}>Success</button>

        <button type='button' className="btn btn-outline-dark" onClick={handleU} >Cargar</button>
        
        </>
    )
}

export default HomeScreen