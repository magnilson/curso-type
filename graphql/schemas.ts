const {buildSchema} = require('graphql') 
import newsType from "./types/newsType"

const schemas = buildSchema(
    newsType
)

export default schemas

