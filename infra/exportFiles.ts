import * as json2csv from 'json2csv'
import * as uuid from 'uuid'
import * as fs from 'fs'

const fields = ['_id', 'hat', 'title', 'text', 'author', 'img', 'link', 'active']
const opts = { fields }

class ExportFiles {
    toCSV = async function (news) {
        try {
            const csv = await json2csv.parseAsync(news, opts)
            const filename = uuid.v4() + ".csv"
            fs.writeFile('./exports/' + filename, csv, function (error) {
                if(error) throw error
                console.log('arquivo salvo com sucesso!')
            })
            return filename
        } catch (error) {
            console.error(error)
        }
    }
}

export default new ExportFiles()