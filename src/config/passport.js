import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import MicrosoftStrategy from 'passport-microsoft';
import AppleStrategy from 'passport-apple';

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL}/api/auth/google/callback`,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Normalize profile data
    const normalizedProfile = {
      id: profile.id,
      provider: 'google',
      emails: profile.emails,
      name: {
        givenName: profile.name?.givenName,
        familyName: profile.name?.familyName
      },
      displayName: profile.displayName,
      photos: profile.photos
    };

    return done(null, normalizedProfile);
  } catch (error) {
    return done(error, null);
  }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.API_URL}/api/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'photos', 'email'],
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Normalize profile data
    const normalizedProfile = {
      id: profile.id,
      provider: 'facebook',
      emails: profile.emails,
      name: {
        givenName: profile.name?.givenName,
        familyName: profile.name?.familyName
      },
      displayName: profile.displayName,
      photos: profile.photos
    };

    return done(null, normalizedProfile);
  } catch (error) {
    return done(error, null);
  }
}));

// Microsoft OAuth Strategy
passport.use(new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL}/api/auth/microsoft/callback`,
  scope: ['user.read'],
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Normalize profile data
    const normalizedProfile = {
      id: profile.id,
      provider: 'microsoft',
      emails: profile.emails,
      name: {
        givenName: profile.name?.givenName,
        familyName: profile.name?.familyName
      },
      displayName: profile.displayName,
      photos: profile.photos
    };

    return done(null, normalizedProfile);
  } catch (error) {
    return done(error, null);
  }
}));

// Apple OAuth Strategy
passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,
  teamID: process.env.APPLE_TEAM_ID,
  keyID: process.env.APPLE_KEY_ID,
  privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH, // Path to .p8 file
  callbackURL: `${process.env.API_URL}/api/auth/apple/callback`,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, idToken, profile, done) => {
  try {
    // Apple profile structure is different
    const normalizedProfile = {
      id: profile.id,
      provider: 'apple',
      emails: profile.email ? [{ value: profile.email }] : [],
      name: {
        givenName: profile.name?.firstName,
        familyName: profile.name?.lastName
      },
      displayName: profile.name ? `${profile.name.firstName} ${profile.name.lastName}` : profile.id,
      photos: []
    };

    return done(null, normalizedProfile);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize user for session (not used in JWT auth, but required by passport)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport; 