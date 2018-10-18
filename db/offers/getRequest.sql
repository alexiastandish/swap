SELECT i.items_id, i.item_name, i.item_description, item_userid
FROM items i
JOIN offers o
ON (i.items_id = o.requesteditemid)
WHERE touserid = $1;