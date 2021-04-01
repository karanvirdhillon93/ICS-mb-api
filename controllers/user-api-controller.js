import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
const userModel = mongoose.model('user');
// Login Handler
const logInUser = (req, res) => {
    //res.status(200).send('Successful API Login Request');
    // generates a JWT Token
jwt.sign(
    { sub: req.user._id,
    username: req.user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h'},
    ( error, token) => {
    if (error) {
    res
    .status(400)
    .send('Bad Request. Couldn\'t generate token.');
    } else {
    res.status(200).json({ token: token });
    }
    }
   );
   
   }
const registerNewUser = async (req, res) => {
    //res.status(200).send('Successful API New User POST Request');
    try {
        // check if username or email already exist
        if ( await alreadyExists(req.body.email, req.body.username) ) {
        res.status(403).send('Username or email already exists.');
        } else {
        // email and username are unique, proceed to adding User
        let user = await userModel.create(req.body);
        res.status(201).json(user);
        }
       } catch (err) {
        res
        .status(400)
        .send('The User in the body of the \
        Request is either missing or malformed.');
        console.log(err);
       }
   }

const alreadyExists = async ( email, username ) => (
    await userModel.exists({
        '$or': [
        { email: email },
        { username: username }
        ]
    })
);


passport.use(new LocalStrategy(
    (username, password, done) => {
    userModel
    .findOne({
    '$or': [
    { email: username },
    { username: username }
    ]
    })
    .exec( async (error, user) => {
    if (error) return done(error);
    // user wasn't found
    if (!user) return done(null, false);
    // user was found, see if it's a valid password
    if (!await user.verifyPassword(password)) { return done(null,false); }
    return done(null, user);
    });
    }
   ));

export default { registerNewUser, logInUser };

