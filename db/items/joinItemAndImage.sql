SELECT im.*
FROM images im
  JOIN itemList i
  ON (i.id = im.imageurl_itemid)
WHERE im.imageurl_itemid = 1;