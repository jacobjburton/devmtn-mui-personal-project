create table if not exists users (
    id serial primary key,
    username varchar(20),
    gender text,
    profile_pic text,
    auth_id text
);



create table if not exists raceEvents (
    id serial primary key,
    eventDate varchar(20),
    eventFormat varchar(10),
    raceName varchar(40),
    raceTime varchar(20),
    athleteId integer references users (id)
);