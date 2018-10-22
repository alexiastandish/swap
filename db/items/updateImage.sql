UPDATE images
SET imageurl=$2
WHERE imageurl_itemid = $1

RETURNING*;