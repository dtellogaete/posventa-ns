import Axios from 'axios'

export const getMaxVals = async () => {
    try {
      const resultado = await Axios.get('http://localhost:3002/api/maxvals');
      const datos = resultado.data;
      const array = datos.map((item) => item.datamax)          
  
      return array;
      
    } catch (error) {
      console.error(error);
      return 0; // También puedes lanzar una excepción aquí si lo deseas
    }
  }; 

export default getMaxVals;