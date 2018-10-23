const getOffers = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getOffers([req.params.id])
    .then(response => {
      // console.log('response', response)
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
      // console.log('response', response)
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
      // console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      // console.log('err', err)
    })
}

const offerUserInfo = (req, res) => {
  const db = req.app.get('db')
  db.getOfferUserInfo([req.params.id])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const notifUserInfo = (req, res) => {
  const db = req.app.get('db')
  db.getNotifUserInfo([req.params.id])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const userNotificationInfo = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getNotificationUserInfo([req.params.id])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const getNotificationItem = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getItemFromNotification([req.params.id])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

// const getFromUserEmail = (req, res) => {
//   const db = req.app.get('db')
//   db.offers
//     .fromUserEmail([req.params.id])
//     .then(response => {
//       console.log('response', response)
//       res.status(200).json(response)
//     })
//     .catch(err => {
//       console.log('err', err)
//     })
// }
module.exports = {
  getOffers,
  getItemFromOffer,
  getRequestedItem,
  offerUserInfo,
  userNotificationInfo,
  getNotificationItem,
  notifUserInfo,
  // getFromUserEmail,
}
