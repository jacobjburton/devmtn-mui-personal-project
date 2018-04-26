require('dotenv').config();

const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    Auth0Strategy = require('passport-auth0');


const app = express();
app.use(bodyParser.json());


const {
    SERVER_PORT,
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SESSION_SECRET
} = process.env;



app.use(session
({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(__dirname = '/../build'));

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

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: 'http://localhost:3000/#/home',
    failureRedirect: 'http://localhost:3000/'
}));

app.get('/auth/me', (req, res) =>
{
    if (req.user)
    {
        res.status(200).send(req.user);
    }
    else
    {
        res.status(401).send('No one logged in');    
    }
})
app.get('/logout', (req, res) =>
{
    req.logOut();
    res.redirect('http://localhost:3000'); 
});

massive(CONNECTION_STRING).then(db => 
{
    app.set('db', db);
});


app.listen(SERVER_PORT, () => 
{
    console.log(`Listeny McListenerson on port: ${SERVER_PORT}`);
});