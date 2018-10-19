INSERT INTO likes
  (postid, postedbyid, likinguser)
VALUES
  ($1, $2, $3)
RETURNING *;