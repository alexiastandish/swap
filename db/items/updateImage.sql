UPDATE images
SET default_image_url=$2, imageurl=$3
WHERE image_id = $1

SELECT *
FROM images;