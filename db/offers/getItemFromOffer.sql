-- SELECT i.item_name, i.item_description
-- FROM items i
-- JOIN offers o ON (o.fromuser_itemid = i.items_id) 
-- WHERE items_id = $1;



-- SELECT *
-- FROM offers o
-- JOIN item i
-- ON (o.fromuser_itemid = i.items_id)
-- WHERE touserid = $1;

SELECT i.items_id, i.item_name, i.item_description, item_userid
FROM items i
JOIN offers o
ON (i.items_id = o.fromuser_itemid)
WHERE touserid = $1;