SELECT i.item_name, i.item_description
FROM items i
JOIN offers o ON (o.fromuser_itemid = i.items_id) 
WHERE items_id = $1;