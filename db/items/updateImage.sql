UPDATE images
SET default_image_url=$2, imageurl=$3
WHERE imageurl_itemid = $1

RETURNING*;