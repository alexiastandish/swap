const getOffers = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getOffers([req.params.id])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const getItemFromOffer = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getItemFromOffer([req.params.id])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const getRequestedItem = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getRequest([req.params.id])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

module.exports = {
  getOffers,
  getItemFromOffer,
  getRequestedItem,
}
