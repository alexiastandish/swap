const getItem = (req, res) => {
  const db = req.app.get('db')
  db.items
    .getItem([req.params.id])
    .then(response => {
      // console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('ITEMS ERROR', err)
    })
}

const getItems = (req, res) => {
  const db = req.app.get('db')
  db.getItems([req.params.id]).then(response => {
    res.status(200).json(response)
  })
}

const getItemImages = (req, res) => {
  const db = req.app.get('db')
  db.items.getImages([req.params.id]).then(response => {
    res.status(200).json(response)
  })
}

const addItem = async (req, res) => {
  console.log('req.body', req.body)
  const { itemName, itemDescription, imageUrls, userId } = req.body
  const db = req.app.get('db')
  const item = await db.items.addItem([itemName, itemDescription, userId])
  console.log('item', item)
  console.log('item[0].items_id, imageUrls', item[0].items_id, imageUrls)

  imageUrls.forEach(async url => {
    await db.items.addImage(item[0].items_id, url)
  })
  return res.status(200).send('okie dokie')
}

const deleteItem = (req, res) => {
  const db = req.app.get('db')
  console.log('req.params', req.params)
  db.items.deleteItem([req.params.id])
  db.items
    .deleteImages([req.params.id])
    .then(() => {
      return res.sendStatus(200)
    })
    .catch(err => console.log(err))
}

const editItem = (req, res) => {
  const { id } = req.params
  const { itemName, itemDescription } = req.body
  const db = req.app.get('db')
  db.items.updateItem([id, itemName, itemDescription])
  return res.sendStatus(200)
}

const changeItemImage = (req, res) => {
  console.log('req.body', req.body)
  console.log('req.params', req.params)
  // const { id } = req.params
  const { imageurl, imageurl_itemid } = req.body
  const db = req.app.get('db')
  db.items.updateImage([imageurl, imageurl_itemid])
  return res.sendStatus(200)
}

itemFeedForDash = (req, res) => {
  const db = req.app.get('db')
  db.following.getFollowingItems([req.params.id]).then(response => {
    console.log('response', response)
    res.status(200).json(response)
  })
}

module.exports = {
  getItem,
  getItems,
  getItemImages,
  addItem,
  deleteItem,
  editItem,
  changeItemImage,
  itemFeedForDash,
}
