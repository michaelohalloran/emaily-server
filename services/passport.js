const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

//this user is the one we just pulled from DB down below
passport.serializeUser((user,done)=> {
    return done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then(user=> done(null, user))
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done)=> {
        //check if user exists; if not, make one
        //googleId is what is shown in DB; profile.id is coming from this passport call
        User.findOne({googleId: profile.id})
            .then(existingUser=> {
                if(existingUser) {
                    //user already exists
                    return done(null, existingUser);
                } else {
                    new User({googleId: profile.id}).save()
                        .then(user=> done(null, user));
                }
            })
    })
);