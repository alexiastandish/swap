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

const getItemAndImage = (req, res) => {
  // console.log('req.body', req.body)
  const db = req.app.get('db')
  db.items.joinItemAndImage([req.params.id]).then(response => {
    res.status(200).json(response)
  })
}

// const postItem = async (req, res) => {
//   console.log('req.body', req.body)
//   const {
//     item_name,
//     item_description,
//     item_userid,
//     item_url,
//   } = req.body
//   let db = req.app.get('db')
//   const item = await db.items.addItem([
//     item_name,
//     item_description,
//     item_userid,
//     // firebaseImg,
//   ])
//   // const image = await db.images.addUploadImg([firebaseImg, property[0].id])
//   return res.status(200).send(item)
// }

// const deleteItem = (req, res) => {
//   const { id } = req.params
//   console.log('req.params', req.params)
//   let db = req.app.get('db')
//   db.items.deleteItem(id)
//   db.images.deleteImage(id).then(() => {
//     return res.sendStatus(200)
//   })
// }

// const editItem = (req, res) => {
//   let db = req.app.get('db')
//   db.items.updateItem(req.params.id, req.body.item_name, req.body.item_description)
//   db.images.update_image(req.params.id, req.body.imageUrl).then(() => {
//     return res.sendStatus(200)
//   })
// }

module.exports = {
  getItem,
  getItems,
  getItemAndImage,
  // addItem,
  // deleteItem,
  // editItem,
}
