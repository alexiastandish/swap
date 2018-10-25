const getOffers = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getOffers([req.params.userId])
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const createNewOffer = async (req, res) => {
  console.log('req.body', req.body)
  const { yourId, yourItemId, theirId, theirItemId } = req.body
  const db = req.app.get('db')
  await db.offers.createOffer([yourId, yourItemId, theirId, theirItemId])
  return res.status(200).send('okie dokie')
}

const updateOffer = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .postOffer([req.params.offerId, req.body.status])
    .then(response => {
      return res.status(200).send('cool')
    })
    .catch(err => {
      console.log('err', err)
    })
}

module.exports = {
  getOffers,
  createNewOffer,
  updateOffer,
}
