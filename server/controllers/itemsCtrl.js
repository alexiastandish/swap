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

const addImage = async (req, res) => {
  const { imageUrls } = req.body
  const { itemId } = req.params
  const db = req.app.get('db')

  imageUrls.forEach(async url => {
    await db.items.addImage(itemId, url)
  })
  return res.status(200).send('okie dokie')
}

const deleteItem = (req, res) => {
  const db = req.app.get('db')
  console.log('req.params', req.params)
  const { item_status } = req.body
  db.items
    .deleteItem([req.params.itemId, item_status])
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => console.log(err))
}

const editItem = (req, res) => {
  const { itemId } = req.params
  const { itemName, itemDescription } = req.body
  const db = req.app.get('db')
  db.items.updateItem([itemId, itemName, itemDescription])
  return res.sendStatus(200)
}

const changeItemImage = async (req, res) => {
  const { imageUrls, imagesId } = req.body
  const db = req.app.get('db')

  imageUrls.forEach(async url => {
    await db.items.updateImage([imagesId, url])
  })

  return res.sendStatus(200)
}

itemFeedForDash = (req, res) => {
  const db = req.app.get('db')
  db.following.getFollowingItems([req.params.id]).then(response => {
    // console.log('response', response)
    res.status(200).json(response)
  })
}

deleteImage = (req, res) => {
  const db = req.app.get('db')
  db.items
    .removeImage([req.params.imageId])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => console.log(err))
}

module.exports = {
  getItem,
  getItems,
  getItemImages,
  addItem,
  addImage,
  deleteItem,
  editItem,
  changeItemImage,
  itemFeedForDash,
  deleteImage,
}
