INSERT INTO images
  (imageurl_itemid, imageurl) 
VALUES
  ($1, $2)
RETURNING *;