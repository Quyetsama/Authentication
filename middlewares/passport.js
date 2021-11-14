const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const GooglePlusTokenStrategy = require('passport-google-token').Strategy
const FacebookTokenStrategy = require('passport-facebook-token')
const User = require('../models/User')


// Passport jwt
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (jwt_payload, done) => {
    console.log('ok')
    try{
        const user = await User.findById(jwt_payload.sub)

        if(!user) return done(null, false)

        done(null, user)
    }
    catch(error){
        done(error, false)
    }
}))

// Passport local
passport.use(new LocalStrategy({
    // Phai trung voi name gui len
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email })

        if(!user) return done(null, false)

        const isCorrectPassword = await user.isValidPassword(password)

        if(!isCorrectPassword) return done(null, false)

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))


// Passport google
// passport.use(new GoogleStrategy({
//     clientID: '84101635302-vgg7ooari0u76ptkuv4atv1o2j32sn0q.apps.googleusercontent.com',
//     clientSecret: 'hnxgR45O45RGSKjcKR2ZX5T4',
//     callbackURL: 'http://localhost:3000/user/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         console.log('token', accessToken)
//         console.log('tokenSecret', refreshToken)
//         console.log('profile', profile)
//     } catch (error) {
//         done(error, false)
//     }
// }))


passport.use(new GooglePlusTokenStrategy({
    clientID: process.env.google_clientID,
    clientSecret: process.env.google_clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)
        // Check whether this current user exists in our database
        const user = await User.findOne({ authGoogle: profile.id, authType: 'google' })

        if(user) return done(null, user)

        // If new account
        const newUser = new User({
            authGoogleID: profile.id,
            authType: 'google',
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        })
        console.log(newUser)
        await newUser.save()
        done(null, newUser)
    } catch (error) {
        done(error, false)
    }
}))

passport.use(new FacebookTokenStrategy({
    clientID: process.env.facebook_appID,
    clientSecret: process.env.facebook_appSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check whether this current user exists in our database
        const user = await User.findOne({ authFacebookID: profile.id, authType: 'facebook' })

        if(user) return done(null, user)

        // If new account
        const newUser = new User({
            authFacebookID: profile.id,
            authType: 'facebook',
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        })
        console.log(newUser)
        await newUser.save()
        done(null, newUser)
    } catch (error) {
        done(error, false)
    }
}))