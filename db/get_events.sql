select users.username, meets.mName, meets.mDate, meets.mFormat, race.rName, race.rTime from users
left outer join meets on meets.athleteId = users.id
left outer join events on meets.mId = events.mId
left outer join race on events.rId = race.rId
where lower(users.username) = lower($1) and rTime is not null 
order by race.rName, meets.mDate
