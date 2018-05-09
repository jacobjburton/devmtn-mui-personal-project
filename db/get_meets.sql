select meets.mname from meets
left outer join users on meets.athleteId = users.id
where meets.athleteid = ($1)
