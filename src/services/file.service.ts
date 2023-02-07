import { jsPDF } from "jspdf"

async function upload(file: FileList) {
  // TODO : POST REQUEST FOR (/api/upload/, {query:file})
}

function download(file: HTMLElement) {
  var doc = new jsPDF();
  doc.html(file, {
    callback: function (doc) {
      doc.save('My resume');
    },
    autoPaging: 'text',
    width: 210,
    windowWidth: file.clientWidth
  });
}

export const fileService = {
  download,
  upload
}