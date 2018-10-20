SELECT i.*
FROM items i
JOIN following f
ON (i.item_userid = f.user_followingid)
WHERE follower_id = $1
ORDER BY post_time DESC;