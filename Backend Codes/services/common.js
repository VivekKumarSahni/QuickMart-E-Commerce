const passport = require('passport');

exports.sanitizeUser=(user)=>{
 return {id:user.id, role :user.role}
}

exports.isAuth=(req, res, done)=>{
   return passport.authenticate('jwt')
  }

  exports.cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjE2NjYzYjRmMTE1OWZmODk1M2M5NiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg5NDUzODY2fQ.ob9OfP1IDSwBKEDg5MFOHDnsaMFa5UwPQJUJLqRyxDo"
    return token;
  };
  