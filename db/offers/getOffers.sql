-- SELECT o.*
-- FROM offers o
-- JOIN items i ON (i.items_id = o.fromuser_itemid) 
-- WHERE touserid = $1;

SELECT i.item_name, i.item_description, i.item_userid, im.imageurl
FROM items i
JOIN offers o ON (o.fromuserid = i.item_userid)
JOIN images im ON (im.imageurl_itemid = i.items_id )
WHERE touserid = $1;