insert into meets (mDate, mName, mFormat, athleteId)
values ('08/05/17', 'Bend Open', 'LCM', 2),
('10/29/17', 'McSwimville Invitational', 'SCY', 2),
('10/29/17', 'McSwimville Invitational', 'SCY', 1),
('10/29/17', 'McSwimville Invitational', 'SCY', 3),
('08/05/17', 'Bend Open', 'LCM', 3),
('08/05/17', 'MHS vs NHS Dual Meet', 'SCY', 1),
('08/05/17', 'MHS vs NHS Dual Meet', 'SCY', 2),
('08/05/17', 'MHS vs TTHS Dual Meet', 'SCY', 2);


insert into race (rName, rTime)
values ('50 yard freestyle', '22.09'),
('100 yard freestyle', '47.91'),
('100 yard breastroke', '59.09'),
('200 yard IM', '1:57.11');

insert into events (mId, rId)
values (2, 5),
(2, 6), -- (2 = meet #2 in table, race #6 in table)
(2, 7), 
(2, 8);


select users.username, users.gender, meets.mName, meets.mDate, meets.mFormat, race.rName, race.rTime from users
left outer join meets on meets.athleteId = users.id
left outer join events on meets.mId = events.mId
left outer join race on events.rId = race.rId
where (race.rName) = lower('50 yard freestyle')


-- 50_Freestyle
-- 100_Freestyle,
-- 200_Freestyle
-- 500_Freestyle
-- 1000_Freestyle
-- 1650_Freestyle
-- 100_Backstroke
-- 200_Backstroke
-- 100_Breastroke 
-- 200_Breastroke
-- 100_Butterfly
-- 200_Butterfly


insert into sliderimages (img_url)
values ('https://s3-us-west-2.amazonaws.com/devmtn-personal-project-images/swim1.png'),
('https://s3-us-west-2.amazonaws.com/devmtn-personal-project-images/swim2.png'),
('https://s3-us-west-2.amazonaws.com/devmtn-personal-project-images/swim3.png'),
('https://s3-us-west-2.amazonaws.com/devmtn-personal-project-images/swim4.png'),
('https://s3-us-west-2.amazonaws.com/devmtn-personal-project-images/swim6.png')