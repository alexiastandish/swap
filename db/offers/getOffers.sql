-- SELECT i.item_name, i.item_description, im.imageurl
-- FROM items i
-- JOIN offers o ON (o.fromuser_itemid = i.items_id) AND (o.requesteditemid = i.items_id)
-- JOIN images im ON (im.imageurl_itemid = i.items_id )
-- WHERE touserid = $1;

SELECT o.*
FROM offers o 
JOIN items i ON (i.items_id = o.fromuser_itemid)
WHERE touserid = $1;