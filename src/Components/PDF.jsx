/* Generador de PDF */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createPDFS = () => {
  
const documentDefinition = { 
  
      content: [
        {
          text: 'Solicitud de Servicio\n\n',
          style: 'header',
          alignment: 'center'
        },
        
        {
          style: 'tableExample',
          table: {
            widths: [100, '*', 200, '*'],
            headerRows: 1,
            body: [
              ['1. Identificación del sistema'],
              ['fixed-width cells have exactly the specified width', {text: 'nothing interesting here', italics: true, color: 'gray'}, {text: 'nothing interesting here', italics: true, color: 'gray'}, {text: 'nothing interesting here', italics: true, color: 'gray'}]
            ],
            
          }
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        }
      }
    }      
    console.log("pdf hola hola")
    console.log(documentDefinition)
    return documentDefinition
    
    
  }
export default createPDFS;