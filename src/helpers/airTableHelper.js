

/*
Id Tablas

Usuarios: tblol9IUdper1ueqY

*/

// Función helper para obtener registros de Airtable OK
export async function getAirtableRecords(table) {
  const API_KEY = process.env.REACT_APP_API_KEY
  const BASE_ID = process.env.REACT_APP_BASE_ID
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${table}`;

  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.records;
    } else {
      console.error('Error fetching data:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Función helper para obtener un item de una tabla específica
export async function getUserById(idItem, tableName) {
  const API_KEY = process.env.REACT_APP_API_KEY
  const BASE_ID = process.env.REACT_APP_BASE_ID
  const TABLE_NAME = tableName
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${idItem}`;



  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.fields; // Devuelve los campos del usuario
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}


// Función helper para eliminar un item de una tabla especifica OK
export async function deletById(recordId, tableName) {
  const API_KEY = process.env.REACT_APP_API_KEY
  const BASE_ID = process.env.REACT_APP_BASE_ID
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${tableName}/${recordId}`;

  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    return false;
  }
}

// Función helper para actualizar un registro de una tabla especifica pasándole su contenido OK
export const editAirtableRecord = async (rowId, tableName, dataToUpdate) => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const BASE_ID = process.env.REACT_APP_BASE_ID
  const TABLE_NAME = tableName;
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${rowId}`;

  
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(API_URL, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ fields: dataToUpdate })
    });

    if (response.ok) {
      return true; // Indica edición exitosa
    } else {
      return false; // Indica error en la edición
    }
  } catch (error) {
    console.error('Error al editar el registro:', error);
    return false; // Indica error en la edición
  }
};

// Función helper para agregar un registro a una tabla específica
export const addDataToAirtable = async (tableName, dataToAdd) => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const BASE_ID = process.env.REACT_APP_BASE_ID
  const TABLE_NAME = tableName;
  const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ records: [{ fields: dataToAdd }] })
    });

    if (response.ok) {
      return true; // Indica éxito en la adición
    } else {
      console.error('Error al agregar el registro:', response.statusText);
      return false; // Indica error en la adición
    }
  } catch (error) {
    console.error('Error al agregar el registro:', error);
    return false; // Indica error en la adición
  }
};


export const validateUser = async (name, password, tableName) => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const BASE_ID = process.env.REACT_APP_BASE_ID
  const TABLE_NAME = process.env.REACT_APP_TABLE_NAME_USER;
  console.log(API_KEY,BASE_ID, TABLE_NAME,name, password)

  try {
    const endpoint = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();
    const records = data.records;
    
    const filteredRecords = records.filter(record => {
      return record.fields.Name === name && record.fields.Password === password;
    });

    return [filteredRecords.length > 0, filteredRecords]; // Si hay al menos un registro, el usuario es válido
  } catch (error) {
    console.error('Error en la validación de usuario:', error);
    return false;
  }
};

