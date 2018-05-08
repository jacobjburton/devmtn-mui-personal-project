module.exports =
{
    getEvents: (req,res) => 
    {
        console.log('getting here?') 
        const db = req.app.get('db'); 

        db.get_events(req.params.username).then(events => res.status(200).send(events))
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
        db.get_meet_names(req.params.userid).then(meetnames => res.status(200).send(meetnames))
        .catch(() => res.status(500).send());
    }
    
        
}