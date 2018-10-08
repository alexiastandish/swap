INSERT INTO users
  (first_name, last_name, authid)
VALUES
  ($1, $2, $3);

SELECT *
FROM users
WHERE authid = $1;