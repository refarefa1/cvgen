import { jsPDF } from "jspdf"
import { httpService } from "./http.service";

const BASE_URL = 'file/'

// file: FileList

async function upload(file: string) {
  const fileObject = { file }
  return await httpService.post(BASE_URL + 'upload', fileObject)
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