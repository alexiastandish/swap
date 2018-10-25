UPDATE items
SET item_status=2
WHERE items_id = $1

RETURNING*;