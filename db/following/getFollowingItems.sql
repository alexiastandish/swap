SELECT i.*
FROM items i
  JOIN following ON (item_userid = user_followingid)
WHERE follower_id = $1
ORDER BY post_time DESC;