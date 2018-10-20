SELECT email
FROM users u
JOIN offers o
ON (u.user_id = o.fromuserid)
WHERE touserid = $1;