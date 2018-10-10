SELECT im.*
FROM images im
  JOIN items i
  ON (i.items_id = im.imageurl_itemid)
WHERE im.imageurl_itemid = 1;