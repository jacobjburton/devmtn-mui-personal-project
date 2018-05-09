module.exports =
{
    getEvents: (req,res) => 
    {
        console.log('getting here?') 
        const db = req.app.get('db'); 
        console.log('params id', req.params.userid)

        db.get_events(req.params.userid).then(events => res.status(200).send(events))
        .catch(() => res.status(500).send());
    },
    getSliderImages: (req, res) =>
    {
        console.log('getting images');
        const db = req.app.get('db');
    
        db.get_slider_images().then(images => res.status(200).send(images))
        .catch(() => res.status(500).send());
    },
    getMeetNames: (req, res) =>
    {
        const db = req.app.get('db');
        console.log(req.params)
        db.get_meets(req.params.userid).then(meetnames => res.status(200).send(meetnames))
        .catch(() => res.status(500).send());
    },
    addNewMeet: (req, res, next) =>
    {
        const db = req.app.get('db');
        const { date, name, format, athleteid} = req.body

        db.add_new_meet([date, name, format, athleteid]).then(() => res.status(200).send())
        .catch(() => res.status(500).send());
    },
    addNewRace: (req, res, next) =>
    {
        const db = req.app.get('db');
        
        db.add_new_race([raceName]).then(() => res.status(200).send())
        .catch(() => res.status(500).send());
    }
    
        
}