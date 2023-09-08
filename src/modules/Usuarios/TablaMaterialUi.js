import * as React from 'react';
import { DataGrid, GridToolbarContainer , GridToolbarExport } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { getAirtableRecords, editAirtableRecord, deletById } from '../../helpers/airTableHelper';
import { useState } from 'react';
import NotificacionInferior from '../../components/NotificacionInferior';
import ConfirmAction from '../../components/confirmAction';
import AgregarUsuarios from './AgregarUsuarios';
import BorrarMasivo from './BorrarMasivo';
import ImageViewer from '../../components/imageViewer';
import SyncIcon from '@mui/icons-material/Sync';




//esto es para configurar la responsividad de la tabla
let orientacionVertical;
function setMaxWidth() {
  let windowWidth;
  let maxWidth;

  if (window.matchMedia("(orientation: portrait)").matches) {
    windowWidth = orientacionVertical; // Obtener el ancho de la ventana
    maxWidth = Math.min(windowWidth - 113, 10000); // Calcular el ancho máximo
  } else if (window.matchMedia("(orientation: landscape)").matches) {
    windowWidth = window.innerWidth; // Obtener el ancho de la ventana
    maxWidth = Math.min(windowWidth - 113, 10000); // Calcular el ancho máximo
  }
  // Actualizar la variable CSS con el nuevo valor
  document.documentElement.style.setProperty('--max-width', `${maxWidth}px`);  
}

function setOrientacionVertical () {
  orientacionVertical = window.innerWidth;

  if (window.matchMedia("(orientation: portrait)").matches) {
    orientacionVertical = window.innerWidth;
  } else if (window.matchMedia("(orientation: landscape)").matches) {
      
  }
}

// Llamar a la función al cargar la página y en cada cambio de tamaño de ventana
window.addEventListener('load', setOrientacionVertical);
window.addEventListener('load', setMaxWidth);
window.addEventListener('resize', setMaxWidth);
window.addEventListener('orientationchange', setMaxWidth);


export default function TablaMaterialUi() {

  const [rows, setRows] = useState([])
  const [cargando, setCargando] = useState(true)
  const [valorInicialCelda, setValorInicialCelda] = useState("")
  const [valorCelda, setValorCelda] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [confirmacionOpen, setConfirmacionOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [rowIdDelete, setRowIdDelete] = useState("")
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [borrarMasivo, setBorrarMasivo] =  useState(false)

  //función que construye la tabla
  const handleCargarTabla = (datosTabla) => {
    setCargando(true)
    let rows = []
  
    datosTabla.forEach(item => {
      let id = item.id
      let nombre = item.fields.Name
      let pass = item.fields.Password
      let email = item.fields.Email
      let fotoPerfil = item.fields.FotoPerfil
      rows.push({ 
        id: id, 
        Name: nombre, 
        Password: pass, 
        Email : email,
        FotoPerfil: fotoPerfil  
      })
    });

    setRows(rows)
    setCargando(false)
  }

  //función para edición desde la celda
  const handleEditValue = async (rowId, tablaEditar, valorEditar, nombreCampo) => {
    try {
      const editSuccess = await editAirtableRecord(rowId, tablaEditar, valorEditar);
      if (editSuccess) {
        setSnackbarMessage(`${nombreCampo} editado exitosamente`)
        setSnackbarType("success")
        setSnackbarOpen(true)

        // Realiza acciones adicionales después de la edición exitosa
      } else {
        setSnackbarMessage(`Error al editar ${nombreCampo}`)
        setSnackbarType("error")
        setSnackbarOpen(true)
      }
    } catch (error) {
      setSnackbarMessage(`Error al editar ${nombreCampo}`)
      setSnackbarType("error")
      setSnackbarOpen(true)
    }
  };

  //función para llamar los datos y cargarlo en la tabla
  async function handleGetDataTable(nombreTabla){
    try {
      // Aquí puedes realizar operaciones asíncronas, como fetch de datos
      setCargando(true)
      const response = await getAirtableRecords(nombreTabla);
      handleCargarTabla(response)
      setCargando(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  

  const handleDelete = async () => {
    let tabla = process.env.REACT_APP_TABLE_NAME_USER
    
     try {
      const deleteSuccess = await deletById(rowIdDelete, tabla )

      if (deleteSuccess) {
        setSnackbarMessage(`Usuario eliminado exitosamente`)
        setSnackbarType("success")
        setSnackbarOpen(true)
        handleGetDataTable(tabla)
      }else{
        setSnackbarMessage(`Error al eliminar el usuario`)
        setSnackbarType("error")
        setSnackbarOpen(true)
        handleGetDataTable(tabla)
      }
      
     } catch (error) {
      handleGetDataTable(tabla)
      setSnackbarMessage(`Error al eliminar el usuario`)
      setSnackbarType("error")
      setSnackbarOpen(true)
     }

   
  };

  const handleConfirmDelete = (rowId) => {
    setConfirmacionOpen(true)
    setMessage("¿Estás seguro que deseas eliminar este usuario?")
    setRowIdDelete(rowId)
  }
 
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <AgregarUsuarios handleGetDataTable = {handleGetDataTable} />
          {borrarMasivo && 
          <BorrarMasivo 
          cantidad = {selectedItems.length} 
          selectedItems={selectedItems} 
          handleGetDataTable = {handleGetDataTable} 
          />
          } 

        <Button onClick={() => handleGetDataTable(process.env.REACT_APP_TABLE_NAME_USER)} color='secondary' size='small' startIcon={<SyncIcon />}>
          Actualizar
        </Button>
      </GridToolbarContainer>
    );
  }


  const columns = [
    { 
      field: 'id', 
      headerName: 'ID',
      width: 200,
      fixed: 'left',
    },
    {
      field: 'Name',
      headerName: 'Name',
      editable: true,
      width: 100
    },
    {
      field: 'Email',
      headerName: 'Email',
      editable: true,
      width: 200
    },
    {
      field: 'Password',
      headerName: 'Password',
      width: 200,
      editable: true,
      renderCell: (params) => {
        const isPasswordVisible = visiblePasswords[params.id] || false;
  
        return (
          <div
            onClick={() =>
              setVisiblePasswords((prevState) => ({
                ...prevState,
                [params.id]: !isPasswordVisible,
              }))
            }
          >
            {isPasswordVisible ? (
              params.value // Mostrar contraseña en texto plano
            ) : (
              '********' // Mostrar asteriscos por defecto
            )}
          </div>
        );
      },
    },
    {
      field: 'FotoPerfil',
      headerName: 'Foto',
      editable: false,
      sortable:false,
      filterable: false,
      width: 200,
      renderCell: (params) => {
        
        if(params["value"]){
          return (
                <ImageViewer imageUrl={params["value"][0]["url"]} />
          );
        }else{
          return (
            <div>No image</div>
          );
        }
      }

    },
    {
      field: 'actions',
      headerName: 'Actions',
      editable: false,
      sortable:false,
      filterable: false,
      width: 200,
      headerMenuProps: { // Desactivar el menú de esta columna
        disableColumnSelector: true,
        disableFilter: true,
        disableSort: true,
      },
      renderCell: (params) => (
        <div>
          <IconButton
            variant="text"
            color="error"
            size="small"
            onClick={() => handleConfirmDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  

  useEffect(() => {
    const windowWidth = window.innerWidth; // Obtener el ancho de la ventana
    const maxWidth = Math.min(windowWidth - 110, 10000); // Calcular el ancho máximo
  
    // Actualizar la variable CSS con el nuevo valor
    document.documentElement.style.setProperty('--max-width', `${maxWidth}px`);

    async function getDataTable(nombreTabla){
      try {
        // Aquí puedes realizar operaciones asíncronas, como fetch de datos
        const response = await getAirtableRecords(nombreTabla);
        handleCargarTabla(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getDataTable(process.env.REACT_APP_TABLE_NAME_USER)

  }, [])

  useEffect(() => {
    if(selectedItems.length > 0) {
      setBorrarMasivo(true)
    }else{
      setBorrarMasivo(false)
    }
  }, [selectedItems])
  
  
  return (
    <div style={{  overflowX: 'auto', marginTop: "30px"}} className='contenedorTabla'>
        
        <NotificacionInferior
        open={snackbarOpen}
        type={snackbarType}
        message={snackbarMessage}
        handleClose={handleSnackbarClose}
        />
        <ConfirmAction 
        confirmacionOpen={confirmacionOpen} 
        setConfirmacionOpen = {setConfirmacionOpen} 
        message = {message} 
        handleAction = {handleDelete}
        />
    
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          flex: "auto" // Puedes ajustar este valor según tus necesidades
        }))}
        rowHeight={30}
        autoHeight
        loading={cargando}
        slots={{
          toolbar: CustomToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5,10,20]}
        checkboxSelection
        disableRowSelectionOnClick
        onCellEditStart={(params) => {
          setValorInicialCelda(params.formattedValue)
        }}
        onStateChange={(params) => {
          let parametros = params.editRows
          if(Object.keys(parametros).length > 0){
            let keys = Object.keys(parametros)
            let keysDos = Object.keys(parametros[keys])
            setValorCelda(parametros[keys][keysDos]["value"])      
          }
          
        }}
        onCellEditStop={(params, event) => {
            const rowId = params.id;
            const tableName = params.field;
            const valorEditar = {[tableName]: valorCelda}
            const tablaEditar = process.env.REACT_APP_TABLE_NAME_USER
            if(valorInicialCelda !== valorCelda){
              handleEditValue(rowId, tablaEditar, valorEditar, tableName)
            }  
        }}
        onRowSelectionModelChange={(params, event) => {
            setSelectedItems(params)
        }}
      />
    </div>
  );
}
