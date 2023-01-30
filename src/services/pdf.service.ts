import { jsPDF } from "jspdf"


function download(file: HTMLElement) {
  var doc = new jsPDF('p', 'pt', 'a4');
  doc.setFont('times', 'regular', 'normal')
  doc.html(file, {
    callback: function (doc) {
      doc.setFont('times', 'regular', 'normal')
      doc.save('My resume');
    },
  });

}

export const pdfService = {
  download
}