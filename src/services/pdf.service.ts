import { jsPDF } from "jspdf"

function download(file: HTMLElement){
    var doc = new jsPDF('p', 'pt', 'a4');
    doc.html(file, {
        callback: function (doc) {
          doc.save();
        }});
    
}

export const pdfService = {
    download
}