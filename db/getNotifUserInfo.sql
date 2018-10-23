SELECT u.user_id, u.username, u.email
FROM users u
JOIN offers o
ON (u.user_id = o.touserid)
WHERE fromuserid = $1;