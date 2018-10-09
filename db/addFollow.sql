INSERT INTO following
  (follower_id, user_followingid)
VALUES
  ($1, $2)

SELECT *
FROM following;