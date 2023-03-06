import Axios from 'axios'

export const getServices = async () => {
  
    try {
      const resultado = await Axios.get('http://localhost:3002/api/tabledata');
      const datos = resultado.data;
      
      console.log(datos);
      return datos;
      
      
    } catch (error) {
      console.error(error);
      return 0; // También puedes lanzar una excepción aquí si lo deseas
    }
  }; 

export default getServices;