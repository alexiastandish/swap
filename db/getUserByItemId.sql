-- SELECT user_id, username, email
-- FROM users
-- WHERE user_id = $1;

SELECT u.user_id, u.username, u.email
FROM users u
JOIN items i
ON (u.user_id = i.item_userid  )
WHERE items_id = $1;