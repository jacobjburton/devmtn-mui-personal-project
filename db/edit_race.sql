update race
set rname = $2, rtime = $3
where rid = $1;

select users.username, meets.mName, meets.mDate, meets.mFormat, race.rId, race.rName, race.rTime from users
left outer join meets on meets.athleteId = users.id
left outer join events on meets.mId = events.mId
left outer join race on events.rId = race.rId
where users.id = $4 and rTime is not null 
order by race.rName, meets.mDate

