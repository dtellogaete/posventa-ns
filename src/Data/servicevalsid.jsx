import axios from 'axios';

export const getServiceValsId = async (idservice) => {
  try {
    const response = await axios.get(`http://localhost:3002/api/servicevalspdf/${idservice}`);
    const data = response.data;
  

    const updatedService = data.map((item) => ({
    cServer: {        
        processor: item.cserver_processor,
        ram: item.cserver_ram, 
        memory: item.cserver_memory,
        os: item.cserver_os,
        internet: item.cserver_internet,
    },
    cStation: {        
        processor: item.cserver_processor,
        ram: item.cserver_ram, 
        memory: item.cserver_memory,
        os: item.cserver_os,
    }
    }));
    
    // Do some additional processing here if necessary
    return updatedService;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getServiceValsId;