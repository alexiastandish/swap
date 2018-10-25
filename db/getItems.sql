SELECT *
FROM items
WHERE item_userid = $1 AND item_status = 1;