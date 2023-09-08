// apiHelper.js
export const fetchGet = async (url) => {
  try {
    const response = await fetch(url); // Realizar la solicitud GET
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Convertir la respuesta a JSON
    return data; // Retornar los datos recibidos
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

  