import { jsPDF } from "jspdf"
import axios from 'axios'


async function upload(file: any) {
  const UPLOAD_PRESET = 'cvgenerator' // Insert your upload preset
  const CLOUD_NAME = 'cvgencloud' // Insert your cloud name
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()
  // Building the request body
  FORM_DATA.append('file', file)
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)

  // Sending a post method request to Cloudniarys' API
  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data.url
  } catch (err) {
    console.error('ERROR!', err)
  }
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