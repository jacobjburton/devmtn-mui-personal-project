select users.username, raceevents.eventdate, raceevents.eventformat, raceevents.raceName, raceevents.raceTime from users
left outer join raceevents on raceevents.athleteId = users.id
where users.id = $1 and raceTime is not null and eventformat = 'SCY'
order by raceevents.racename, raceevents.eventdate