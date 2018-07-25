const express = require('express');
const passport = require('passport');
const router = express.Router();

//@/auth/google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

//@/auth/google/callback
router.get('/google/callback', passport.authenticate('google'));

//@auth/api/logout
router.get('/api/logout', (req,res)=> {
    req.logout();
    res.send(req.user);
})


//@auth/api/current_user
router.get('/api/current_user', (req, res)=> {
    console.log('req user is', req.user);
    res.send(req.user);
});


module.exports = router;
