create table if not exists users (
    id serial primary key,
    username varchar(20),
    gender text,
    profile_pic text,
    auth_id text
);

create table if not exists meets (
    mId serial primary key,
    mDate varchar(20),
    mName varchar(40),
    mFormat varchar(20),
    athleteId integer references users (id) 
);

create table if not exists events (
    mId integer references meets (mId),
    rId integer references race (rId)
);

create table if not exists race (
    rId serial primary key,
    rName varchar(20),
    rTime varchar(20)
);

create table if not exists sliderimages (
    id serial primary key,
    img_url text
);
