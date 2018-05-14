module.exports =
{
    getEvents: (req,res) => 
    {
       // console.log('getting here?') 
        const db = req.app.get('db'); 
       // console.log('params id', req.params.userid)

        db.get_events(req.params.userid).then(events => res.status(200).send(events))
        .catch(() => res.status(500).send());
    },
    getSliderImages: (req, res) =>
    {
       // console.log('getting images');
        const db = req.app.get('db');
    
        db.get_slider_images().then(images => res.status(200).send(images))
        .catch(() => res.status(500).send());
    },
    getMeetNames: (req, res) =>
    {
        const db = req.app.get('db');
        //console.log(req.params)
        db.get_meets(req.params.userid).then(meetnames => res.status(200).send(meetnames))
        .catch(() => res.status(500).send());
    },
    addNewMeet: (req, res, next) =>
    {
        const db = req.app.get('db');
        const { date, name, format, athleteid} = req.body

        db.add_new_meet([date, name, format, athleteid]).then((meets) => res.status(200).send(meets))
        .catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    addNewRace: (req, res, next) =>
    {
        const db = req.app.get('db');
        const { name, time, meetId } = req.body;
        //console.log(req.body)
        db.add_new_race([name, time]).then((results) => 
        {
            //console.log(results[0].rid)
            db.add_new_event([meetId, results[0].rid]).then(() => res.status(200).send()).catch((err)=>{
                console.log(err)
                res.status(500).send(err)
            })
        }).catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    deleteRace: (req, res, next) =>
    {
        const db = req.app.get('db');
        const { id } = req.params;
        console.log("rid", id);

        db.delete_event([id]).then(() => {
            db.delete_race([id]).then(() =>{
                db.get_events(req.user.id).then(events => {
                    res.status(200).send(events)

                });
            }).catch((err)=>{
                console.log(err)
                res.status(500).send(err)
            })
        }).catch((err)=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    editRace: (req, res, next) =>
    {
        const db = req.app.get('db');
        const { id } = req.params;
        const { race, time, userid } = req.body;
        console.log(race, time, id, userid)

        db.edit_race([id, race, time, userid]).then((events) => {
            res.status(200).send(events)
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        });
    }
            
}