import NewsRepository from "../repository/newsRepository";

class NewsService {

    async get() {
        /*
            exemplo com filtro por periodo de tempo
            let startDate = new Date("2021-09-01")
            let endDate = new Date("2021-09-30")
            NewsRepository.find({ 'publishDate': {$gt: startDate, $lt:  endDate} });
        */
        let result = await NewsRepository.find();
        return result;
    }

    async getById(_id) {
        let result = await NewsRepository.findById(_id);
        return result;
    }

    async search(term, page, perPage) {
        let result = await NewsRepository.find({ 'title': new RegExp(term, 'i') })
        .skip((page - 1) * perPage)
        .limit(perPage);
        return result;
    }

    async create(news) {
        let result = await NewsRepository.create(news);
        return result;
    }

    async update(_id, news) {
        let result = await NewsRepository.findByIdAndUpdate(_id, news);
        return result;
    }

    async delete(_id) {
        let result = await NewsRepository.findByIdAndRemove(_id);
        return result;
    }
}

export default new NewsService();