import axios from 'axios';

export const getSoftwareId = async (idsoft) => {
  try {
    const response = await axios.get(`http://localhost:3002/api/softid/${idsoft}`);
    const data = response.data;
    
    // Do some additional processing here if necessary
    const array = data.map((item) => item.name);
    console.log(array)

    return array;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getSoftwareId;
