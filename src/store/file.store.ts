import { defineStore } from "pinia"
import { fileService } from "../services/file.service"


type State = {
}

export const useFileStore = defineStore('fileStore', {

    state: () => <State>({

    }),

    actions: {

        async upload(file: FileList) {
            const url = await fileService.upload(file)
            return url
        },

        download(file: HTMLElement) {
            fileService.download(file)
        },
    }
})
