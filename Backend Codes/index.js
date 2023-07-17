const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');


const passport = require("passport");
const session = require("express-session");
// const SQLiteStore=require('connect-sqlite3')(session);
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
 const ExtractJwt = require('passport-jwt').ExtractJwt;
const cookieParser =require('cookie-parser')

// It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
const productRouter = require("./routes/Products");
const brandRouter = require("./routes/Brands");
const categoryRouter = require("./routes/Categories");
const usersRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const { User } = require("./model/User");
const { sanitizeUser, isAuth, cookieExtractor } = require("./services/common");

const SECRET_KEY='SECRET_KEY'
//JWT Options


var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey =SECRET_KEY; //TODO: should not be in code

//middlewares
server.use(express.static('build'))
server.use(cookieParser());

server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    // store: new SQLiteStore({ db: 'quickmart.db', dir: './var/db' })
  })
);
server.use(passport.authenticate("session"));

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); //to parse req.body
server.use("/products",isAuth(),productRouter.router); //  /we can also use jwt token for client-only auth
server.use("/brands",isAuth(), brandRouter.router); //  /products is base router
server.use("/categories",isAuth(), categoryRouter.router); //  /products is base router
server.use("/users",isAuth(), usersRouter.router); //  /products is base router
server.use("/auth", authRouter.router); //  /products is base router
server.use("/cart",isAuth(), cartRouter.router); //  /products is base router
server.use("/orders",isAuth(), orderRouter.router); //  /products is base router

//passport Strategies
passport.use('local',
  new LocalStrategy({usernameField:'email'},async function (email, password, done) {
    //by deafault passport uses username
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: "no such user exists" }); //for safety write invalid credentials
      } 
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            done(null, false, { message: "invalid credentials" });
          } else {
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);

            done(null,{token});
          }
        }
      );
    } catch (err) {
      done(err);
    }
  })
);
passport.use('jwt',new JwtStrategy(opts,async function(jwt_payload, done) {
 console.log(jwt_payload);
 try{
  const user=await User.findById(jwt_payload.id) 
     if (user) {
          return done(null, sanitizeUser(user));//this calls serializer
      } else {
          return done(null, false);
      }
  }
catch(err){
  return done(err,false);
}

}));

//this creates session variable req.user on being called
passport.serializeUser(function (user, cb) {
  console.log("serilize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});
//this changes session variable req.user when called form authorised request
passport.deserializeUser(function (user, cb) {
  console.log("de-serilize", user);

  process.nextTick(function () {
    return cb(null, user);
  });
});
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quickmart");
  console.log("database connected");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});



server.listen(8080, () => {
  console.log("server started");
});
