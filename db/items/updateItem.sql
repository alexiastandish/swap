UPDATE items
SET item_name=$2, item_description=$3
WHERE items_id = $1

SELECT *
FROM items;