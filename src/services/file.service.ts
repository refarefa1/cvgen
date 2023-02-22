import { jsPDF } from "jspdf"
import axios from 'axios'
import { eventBus } from "./event.bus.service"

async function upload(file: any) {
  _cropFileToSquare(file)
}

async function uploadToCloudinary(file: any) {
  const UPLOAD_PRESET = 'cvgenerator'
  const CLOUD_NAME = 'cvgencloud'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()
  FORM_DATA.append('file', file)
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)

  try {
    const res = await axios.post(UPLOAD_URL, FORM_DATA)
    return res.data.url

  } catch (err) {
    console.error('ERROR!', err)
  }
}


async function _cropFileToSquare(file: any) {
  const image: any = new Image();
  const reader = new FileReader();
  reader.onload = (event) => {
    image.src = event.target?.result;
    image.onload = async () => {
      const canvas = document.createElement("canvas");
      const ctx: any = canvas.getContext("2d");
      const size = Math.min(image.width, image.height);
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(
        image,
        (image.width - size) / 2,
        (image.height - size) / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );
      const croppedFile = _dataURLToFile(canvas.toDataURL(), file.name);
      const url = await uploadToCloudinary(croppedFile)
      eventBus.emit('img-uploaded', url)
    };
  };
  reader.readAsDataURL(file);
}


function _dataURLToFile(dataURL: any, fileName: any) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
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