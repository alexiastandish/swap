INSERT INTO users
  ( username, authid, email)
VALUES
  ($1, $2, $3)
RETURNING *;