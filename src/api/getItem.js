import axios from 'axios'

export default function getItem(itemId) {
  return axios
    .get(`/api/item/${itemId}`)
    .then(res => res.data)
    .catch(err => {
      console.error(err)
    })
}
