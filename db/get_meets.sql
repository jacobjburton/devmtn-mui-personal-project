select meets.mname, meets.mformat, meets.mid from meets
left outer join users on meets.athleteId = users.id
where meets.athleteid = ($1)
