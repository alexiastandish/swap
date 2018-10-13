INSERT INTO users
  ( username, authid, email)
VALUES
  ($1, $2, $3 )

SELECT *
FROM users
WHERE authid = $1;
