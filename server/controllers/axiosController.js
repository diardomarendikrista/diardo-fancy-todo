const axios = require('axios');

class AxiosController {
  static quotes(req, res, next) {
    axios({
      method: 'get',
      url: 'http://api.quotable.io/random'
    })
    .then(response => {
      const data = {
        quotes: response.data.content,
        author: response.data.author,
        tags: response.data.tags
      }
      res.status(200).json({data})
    })
    .catch(next)
  }
}

module.exports = AxiosController;