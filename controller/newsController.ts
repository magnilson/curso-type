import NewsService from "../services/newsService"
import * as HttpStatus from "http-status"

import Helper from "../infra/helper"
import ExportFiles from "../infra/exportFiles"

class NewsController {

    public sendResponse = function (response, statusCode, data) {
        response.status(statusCode).json({ result: data })
    }

    async get(request, response) {
        try {
            let result = await NewsService.get()
            Helper.sendResponse(response, HttpStatus.OK, result)
        } catch (error) {
            console.error.bind(console, `error ${error}`)
        }
    }
    async getById(request, response) {
        const _id = request.params.id
        try {
            let news = await NewsService.getById(_id)
            Helper.sendResponse(response, HttpStatus.OK, news)
        } catch (error) {
            console.error.bind(console, `error ${error}`)
        }
    }

    async search(request, response) {
        const term = request.query.term
        const page = request.query.page ? parseInt(request.query.page) : 1
        const perPage = request.query.limit ? parseInt(request.query.limit) : 10
        try {
            let news = await NewsService.search(term, page, perPage)
            Helper.sendResponse(response, HttpStatus.OK, news)
        } catch (error) {
            console.error.bind(console, `error ${error}`)
        }
    }

    async exportToCsv(request, response) {
        try {
            let result = await NewsService.get()
            let filename = await ExportFiles.toCSV(result)
            Helper.sendResponse(response, HttpStatus.OK, request.get('host') + "/exports/" + filename)
        } catch (error) {
            console.error.bind(console, `error ${error}`)
        }
    }

    async cretate(request, response) {
        let vm = request.body
        try {
            await NewsService.create(vm)
            Helper.sendResponse(response, HttpStatus.OK, "Noticia cadastrada com sucesso")
        } catch (error) {
            console.error.bind(console, `error ${error}`)
        }
    }
    async update(request, response) {

        const _id = request.params.id
        let vm = request.body
        try {
            await NewsService.update(_id, vm)
            Helper.sendResponse(response, HttpStatus.OK, "Noticia atualiada com sucesso")
        } catch (error) {
            console.error.bind(console, `error ${error}`)
        }
    }
    async delete(request, response) {
        const _id = request.params.id
        try {
            await NewsService.delete(_id)
            Helper.sendResponse(response, HttpStatus.OK, "Noticia removida com sucesso")
        } catch (error) {
            console.error.bind(console, `error ${error}`)
        }
    }
}

export default new NewsController()