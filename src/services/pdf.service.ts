import htmlToPdfmake from "html-to-pdfmake"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function download(file: HTMLElement) {
    const html = htmlToPdfmake(file.innerHTML)
    const fileToDownload = { content: html }
    pdfMake.createPdf(fileToDownload).download()
}

export const pdfService = {
    download
}