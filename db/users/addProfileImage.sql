INSERT INTO users (user_photo)
VALUES ($1)
RETURNING *;
