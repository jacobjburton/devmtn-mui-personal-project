module.exports =
{
    getEvents: (req,res) => 
    {
        console.log('getting here?') 
        const db = req.app.get('db'); 

        db.get_events().then(events => res.status(200).send(events))
        .catch(() => res.status(500).send())
    }
    
        
}