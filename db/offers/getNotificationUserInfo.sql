SELECT u.user_id, u.username, u.email, o.offer_id, o.fromuserid, o.touserid, o.status
FROM users u
JOIN offers o
ON (u.user_id = o.touserid)
WHERE fromuserid = $1 AND status = 2 OR fromuserid = $1 AND status = 3;