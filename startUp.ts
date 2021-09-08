import * as express from "express"
import * as cors from "cors"
import * as compression from "compression"
const {graphqlHTTP} = require('express-graphql') 

import Database from "./infra/database"
import NewsController from './controller/newsController'
import Auth from './infra/auth'
import uploads from "./infra/uploads"
import schemas from "./graphql/schemas"
import resolvers from "./graphql/resolvers"

class StartUp {
    public app: express.Application
    private _db: Database

    constructor() {
        this.app = express()
        this._db = new Database()
        this._db.createConnection()
        this.middler()
        this.routes()
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        }

        this.app.use(cors(options))
    }

    middler() {
        this.enableCors()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use('/exports', express.static(process.cwd() + '/exports'))
        this.app.use(compression())
    }
    routes() {
        this.app.route('/').get((request, response) => {
            response.send({ versao: '0.0.1' })
        })
        this.app.route('/uploads').post(uploads.single("file"), (request, response) => {
            try {
                response.send("Arquivo enviado com sucesso")
            } catch (error) {
                console.error(error)
            }
        })

        this.app.use('/graphql', graphqlHTTP({
            schema: schemas,
            rootValue: resolvers,
            graphiql: true
        }))

        //protege as rotas com auth

        //rotas de noticias
        this.app.route('/api/v1/news').get(NewsController.get)
        this.app.route('/api/v1/news/:id').get(NewsController.getById)
        this.app.route('/api/v1/news/pp/1').get(NewsController.search)
        this.app.route('/api/v1/news/export/tocsv').get(NewsController.exportToCsv)
        this.app.route('/api/v1/news').post(NewsController.cretate)
        this.app.route('/api/v1/news/:id').put(NewsController.update)
        this.app.route('/api/v1/news/:id').delete(NewsController.delete)
        this.app.use(Auth.validate)
    }
}

export default new StartUp();