
INSERT INTO items
  ( item_name, item_description, item_userid, post_time, item_status)
VALUES
  ( $1 , $2, $3, CURRENT_TIMESTAMP, 1)
RETURNING *;