UPDATE users
SET user_photo=$2
WHERE user_id = $1

RETURNING *;