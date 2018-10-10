SELECT u.*
FROM users u
  JOIN following f
  ON (f.user_followingid = u.user_id)
WHERE follower_id = $1;