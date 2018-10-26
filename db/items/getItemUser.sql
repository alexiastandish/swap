SELECT u.username
FROM users u
JOIN items i ON (i.item_userid = u.user_id)
WHERE items_id = $1;