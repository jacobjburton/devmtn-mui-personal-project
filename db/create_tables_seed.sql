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



-- not using these tables anymore
create table if not exists scyEvent (
    scyEventId serial primary key,
    y_50_Freestyle varchar(20),
    y_100_Freestyle varchar(20),
    y_200_Freestyle varchar(20), 
    y_500_Freestyle varchar(20),
    y_1000_Freestyle varchar(20),
    y_1650_Freestyle varchar(20),
    y_100_Backstroke varchar(20),
    y_200_Backstroke varchar(20),
    y_100_Breastroke varchar(20), 
    y_200_Breastroke varchar(20),
    y_100_Butterfly varchar(20),
    y_200_Butterfly varchar(20), 
    y_200_IM varchar(20),
    y_400_IM varchar(20),
    meetId integer references events (eventId) 
);

create table if not exists lcmEvent (
    lcmEventId serial primary key,
    m_50_Freestyle varchar(20),
    m_100_Freestyle varchar(20),
    m_200_Freestyle varchar(20), 
    m_500_Freestyle varchar(20),
    m_800_Freestyle varchar(20),
    m_1500_Freestyle varchar(20), 
    m_100_Backstroke varchar(20),
    m_200_Backstroke varchar(20),
    m_100_Breastroke varchar(20), 
    m_200_Breastroke varchar(20),
    m_100_Butterfly varchar(20),
    m_200_Butterfly varchar(20), 
    m_200_IM varchar(20),
    m_400_IM varchar(20),
    meetId integer references events (eventId) 
);