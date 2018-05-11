insert into meets (mDate, mName, mFormat, athleteId)
values ($1, $2, $3, $4);
select * from meets
where athleteId = $4