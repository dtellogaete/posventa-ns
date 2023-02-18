import Axios from 'axios'

export const getSoftware = async () => {
    try {
      const resultado = await Axios.get('http://localhost:3002/api/software');
      const datos = resultado.data;   
  
      // Hacer algún procesamiento adicional aquí si es necesario
      const software = datos.map((item) => ({ idsoft: item.IDSOFT, name: item.NAME }));
  
      return software;
    } catch (error) {
      console.error(error);
      throw error; // También puedes lanzar una excepción aquí si lo deseas
    }
  }; 

export default getSoftware;