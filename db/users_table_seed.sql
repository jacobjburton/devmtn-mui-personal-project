create table if not exists users (
    id serial primary key,
    username varchar(20),
    gender text,
    profile_pic text,
    auth_id text
)