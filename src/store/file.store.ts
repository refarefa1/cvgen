import { defineStore } from "pinia"
import { fileService } from "../services/file.service"


type State = {
}

export const useFileStore = defineStore('fileStore', {

    state: () => <State>({

    }),

    actions: {

        upload(file: FileList) {
            fileService.upload(file)
        },

        download(file: HTMLElement) {
            fileService.download(file)
        },
    }
})
