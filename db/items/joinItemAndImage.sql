SELECT i.*
FROM items i
  JOIN images im
  ON ( im.imageurl_itemid = i.items_id )
WHERE i.items_id = $1;


-- SELECT im.*
-- FROM images im
--   JOIN items i
--   ON (i.items_id = im.imageurl_itemid)
-- WHERE im.imageurl_itemid = $1;