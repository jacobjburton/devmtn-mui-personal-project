INSERT INTO users (username, gender, profile_pic, auth_id)
VALUES ($1, $2, $3, $4)
RETURNING *;