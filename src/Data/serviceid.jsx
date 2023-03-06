import axios from 'axios';

export const getServiceId = async (idservice) => {
  try {
    const response = await axios.get(`http://localhost:3002/api/servicepdf/${idservice}`);
    const data = response.data;

    const capacitacion = data.map((item) => ({ address: item.address, 
                                                name: item.work,
                                                contact: item.contact,
                                                email: item.email,
                                                folio: item.folio,
                                                kind: item.kind,
                                                phone: item.phone.toString(),
                                                service: item.service,
                                                soft: item.soft,
                                                work: item.work,
                                                qEquipment: item.qequipment,
                                                qReq: item.qreq,
                                                qNode:item.qnode,
                                                qLogo: item.qlogo,
                                                qCSD: item.qcsd
                                             }));
    
    // Do some additional processing here if necessary
    return capacitacion;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getServiceId;

