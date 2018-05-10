require('dotenv').config();

const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    Auth0Strategy = require('passport-auth0'),
    controller = require('./controller'),
    path = require('path');


const app = express();
app.use(bodyParser.json());


const {
    SERVER_PORT,
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SESSION_SECRET,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT
} = process.env;



app.use(session
({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, '/../build')));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new Auth0Strategy(
{
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
},function(accessToken, refreshToken, extraParams, profile, done)
{
    const db = app.get('db');
    //console.log(profile)
    const { displayName, gender, picture, id } = profile;
    //console.log(profile)

    db.find_user([id]).then(users => 
    {
        if (users[0])
        {
            //console.log("follow the trail of breadcrumbs", users[0].id)
            return done(null, users[0].id);
        }
        else
        {
            db.create_user([displayName, gender, picture, id])
            .then(createdUser => 
            {   
                //console.log(createdUser)
                return done(null, createdUser[0].id);
            });
        }
    });
    // return done(null, id)
}));

passport.serializeUser(function(id, done)
{
    //console.log('cereal', id )
    return done(null, id);
});

passport.deserializeUser((id, done) =>
{
    app.get('db').find_session_user([id]).then(user =>
    {
        done(null, user[0]);
    });
});

app.get('/auth', (r,s,n)=>{console.log('dude');n()} , passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
}));

app.get('/auth/me', (req, res) =>
{
    if (req.user)
    {
        res.status(200).send(req.user);
    }
    // else
    // {
    //     res.status(401).send('No one logged in');    
    // }
})
app.get('/logout', (req, res) =>
{
    req.logOut();
    res.redirect(FAILURE_REDIRECT); 
});

massive(CONNECTION_STRING).then(db => 
{
    app.set('db', db);
    console.log('db connected')
});


app.get('/api/events/:userid', controller.getEvents);
app.get('/api/getSliderImages', controller.getSliderImages);
app.get('/api/meetNames/:userid', controller.getMeetNames);
app.post('/api/addNewMeet/', controller.addNewMeet);
app.post('/api/addNewRace/', controller.addNewRace);
app.delete('/api/deleteRace/:id', controller.deleteRace);


app.listen(SERVER_PORT, () => 
{
    console.log(`Listeny McListenerson on port: ${SERVER_PORT}`);
});