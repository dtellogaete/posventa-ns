import jsPDF from 'jspdf';

export const createPDFCapa = (data) =>{    
    var doc = new jsPDF();
    // Agrega texto al documento
    doc.setFontSize(10);    
  
    // Logo
    doc.addImage("img/logo.jpg", "jpg", 100, 10, 90, 30);

    //Fuente
    doc.setFont("times");

    // Texto Inicial
    doc.text(data.work,20, 50);
    doc.text("Ejecutivo Comercial",20, 55);
    doc.text("Ha solicitado un servicio para el sistema: "+data.soft+"®",20, 60);

     // Datos del cliente
    doc.setFontSize(12);
    doc.text("DATOS DEL CLIENTE", 105, 70, "center");
   
    doc.setFontSize(10);
    doc.text("Nombre Comercial:", 50, 80);
    doc.text("Teléfono de contacto:", 50, 88);
    doc.text("Dirección de sucursal:", 50, 96);
    doc.text("Nombre del contacto:", 50, 104);
    doc.text("Correo del contacto:", 50, 112);

    doc.text(data.name, 120, 80);
    doc.text(data.phone, 120, 88);
    doc.text(data.address, 120, 96);
    doc.text(data.contact, 120, 104);
    doc.text(data.email, 120, 112);

    // Footer
    doc.addImage("img/footer.png", "png", 0, 225, 210, 75);
    
    // Información del servicio
    doc.setFontSize(12);
    doc.text("INFORMACIÓN DEL SERVICIO", 105, 125, "center");
  
    doc.setFontSize(10);
    doc.text("Tipo de servicio:", 50, 135);
    doc.text("Modalidad:", 50, 143);
    doc.text("Folio Factura:", 50, 151);    

    doc.text(data.kind, 120, 135);
    doc.text(data.service, 120, 143);
    doc.text(data.folio, 120, 151);  

    doc.addPage("1");
    
    // Obtener las dimensiones de la página actual
    doc.setFontSize(12);    
    doc.text("CLAUSULAS", 105, 20, "center");    
    doc.setFontSize(11);  
    var text =
      "En National Soft de México® nos preocupados por nuestros clientes y la calidad de nuestros servicios, "+
      "proporcionamos la siguiente información para realizar un común acuerdo sobre los servicios "+
      "solicitados:"
      ;
    var maxWidth = 170;

    // Dividir el texto en líneas que se ajusten al ancho máximo
    var textlines= doc.splitTextToSize(text, maxWidth);    
    
    // Agregar las líneas justificadas al documento
    doc.text(textlines, 20, 30, { align: "justify", maxWidth: maxWidth});

    var dataClau = [
      {text: "Para proceder con la agenda de servicios se deberán cumplir los requisitos de infraestructura, hardware y software establecidos por National Soft®." },
      {text: "La agenda de los servicios se realizará de acuerdo a los calendarios de los ejecutivos disponibles." },
      {text: "Siempre nos contactaremos por los medios oficiales de National Soft® como: Llamada telefónica desde el número empresarial, conexiones remotas o de manera presencial según se solicite." },
      {text: "Es necesario anexar la factura correspondiente para la solicitud de equipos en almacén." },
      {text: "Nuestros especialistas están obligados a entregarle una copia del check list de implementación una vez finalizado el servicio." },
      {text: "En caso de detectar alguna anomalía durante la visita, le invitamos a reportarlo vía correo a: soporte@nationalsoft.com.mx." },
      {text: "Este documento constituye un acuerdo entre el ejecutivo de ventas y el departamento de posventa, al realizar la solicitud acepta que validó los requerimientos de implementación como: infraestructura del cliente, hardware de los equipos y software." },
      {text: "Al finalizar los servicios descritos se determina un plazo de 7 días hábiles para realizar cualquier configuración que pudiera quedar pendiente, posterior al plazo fijado en esta cláusula los servicios serán cobrados de acuerdo al valor establecido en nuestro catálogo de productos vigente." },
      {text: "La cancelación de servicios es aplicable con notificación de 4 días naturales previos. Si se realiza en un tiempo menor a 4 días habrá cargo administrativo de 15% sobre el importe del servicio contratado." },
      {text: "La reprogramación de fechas se realizará de acuerdo a disponibilidad de calendarios." },
      {text: "El Cliente acepta que al igual que una firma autógrafa (ya sea para el consentimiento de este Contrato, así como en cualquier consentimiento u aprobación a documentos relacionados con el mismo o aquellos correspondientes a servicios o productos adicionales), el uso de firmas electrónicas, digitales, numéricas, alfanuméricas, huellas de voz, biométricas o cualquier otra forma de manifestación de consentimiento por medios electrónicos, serán consideradas para todos los efectos, incluyendo pero no limitado a la legislación civil, mercantil, protección al consumidor y a la NOM-151-SCFI-2016, con la misma fuerza y consecuencias que la firma autógrafa de la parte firmante y tendrán el mismo valor probatorio." }
    ];

    var startY = [40, 50, 55, 65, 70, 80, 90, 105, 120, 135, 140];
    for (var i = 0; i < dataClau.length; i++) {
      doc.text("•", 30, startY[i]);
      var textlines= doc.splitTextToSize(dataClau[i].text, maxWidth-15);
      doc.text(textlines, 35, startY[i], { align: "justify", maxWidth: maxWidth-15});
    }       

    // Text
    var text =
      `Al realizar la solicitud, ${data.work} confirmo que realicé la validación y le informé al cliente los lineamientos y tiempos para la realización de los servicios contratados. \n\n`+
      "Gracias por tu ayuda, para finalizar la solicitud deberás levantar un ticket de servicio y adjuntar este documento. "
      ;

    var maxWidth = 170;

    // Dividir el texto en líneas que se ajusten al ancho máximo
    var textlines= doc.splitTextToSize(text, maxWidth);
    doc.text(textlines, 20, 180, { align: "justify", maxWidth: maxWidth});
    
    // Footer 
    doc.addImage("img/footer.png", "png", 0, 225, 210, 75);   
    
    // Descarga el documento PDF
    doc.save("servicio.pdf");
  }

export default createPDFCapa;