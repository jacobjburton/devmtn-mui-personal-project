insert into race (rName, rTime)
values($1, $2)
returning *;
