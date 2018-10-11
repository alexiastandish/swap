INSERT INTO users
  ( username, authid, user_photo, email)
VALUES
  ($1, $2, $3, $4)

SELECT *
FROM users
WHERE authid = $1;
