-- SELECT user_id, username, email
-- FROM users
-- WHERE user_id = $1;

-- SELECT u.user_id, u.username, u.email
-- FROM users u
-- JOIN offers o
-- ON (u.user_id = o.fromuserid  )
-- WHERE touserid = $1;


SELECT u.user_id, u.username, u.email
FROM users u
JOIN offers o
ON (u.user_id = o.fromuserid)
WHERE touserid = $1;