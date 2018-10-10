const getItem = (req, res) => {
  const db = req.app.get('db')
  db.items.getItem([req.params.id]).then(response => {
    res.status(200).json(response)
  })
}

const getItems = (req, res) => {
  const db = req.app.get('db')
  db.items.getItems([req.params.id]).then(response => {
    res.status(200).json(response)
  })
}

// const getItemAndImage = async (req, res) => {
//   console.log(req.body)
//   const db = req.app.get('db')
//   // const {}
//   await db.items.joinItemAndImage([req.params.id]).then(response => {
//     res.status(200).json(response)
//   })
// }

const getItemImages = (req, res) => {
  const db = req.app.get('db')
  db.items.getImages([req.params.id]).then(response => {
    res.status(200).json(response)
  })
}

const postItem = async (req, res) => {
  console.log('req.body', req.body)
  const { item_name, item_description, item_userid, post_time, post_date } = req.body
  const db = req.app.get('db')
  const item = await db.items.addItem([
    item_name,
    item_description,
    item_userid,
    post_time,
    post_date,
  ])
  return res.status(200).send(item)
}

const addItemImages = async (req, res) => {
  const { default_image_url, imageurl, imageurl_itemid } = req.body
  const db = req.app.get('db')
  const image = await db.items.addImages([default_image_url, imageurl, imageurl_itemid])
  return res.status(200).send(image)
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
  const { item_name, item_description } = req.body
  const db = req.app.get('db')
  db.items.updateItem([id, item_name, item_description])
  return res.sendStatus(200)
}

const changeItemImage = (req, res) => {
  const { id } = req.params
  const { default_image_url, imageurl } = req.body
  const db = req.app.get('db')
  db.items.updateImage([id, default_image_url, imageurl])
  return res.sendStatus(200)
}

module.exports = {
  getItem,
  getItems,
  // getItemAndImage,
  getItemImages,
  postItem,
  addItemImages,
  deleteItem,
  editItem,
  changeItemImage,
}
