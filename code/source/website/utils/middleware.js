import jwt from "jsonwebtoken";

export function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

export function sumValues( obj ) { //summation of values in an object
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}

export function authorizeUser(req, res, next) {
        //function that checks if user is authorized to access the API
        // console.log(req.user._id)
        const userModel = req.app.locals.users;
    
        userModel
          .findOne({ _id: ObjectId(req.user._id) })
          .then((user) => {
            if (user.role === "admin") return next(); //user is an admin and can use this function
            return res.status(403).json("User has no access to this API");
          })
          .catch((error) => {
            res.status(500).json(error);
          });
    }
    
export function generateAccessToken(user_id){ //function that creates a jwt token
      return jwt.sign(
        { _id: user_id },
        process.env.JWT_SIGNIN_KEY,
        { expiresIn: "1d" }
      ); //use the jwt sign and expire the token in 1 day
    }
    
export function authenticateToken(req, res, next) {
     //middle ware that authenticates the jwt token
     if (req.cookies.auth == undefined)
     return res.status(401).json("No token sent. Make sure to login first");
        const token = req.cookies.auth; //get the token from the cookies
    
      jwt.verify(token, process.env.JWT_SIGNIN_KEY, (err, user) => {
        //verify the token if it's legit
        if (err) return res.status(403).json("User token has no access");
        req.user = user; //means that user has access and you send the details of the user to the next function that will use it
        next();
      });
    }
    
export function isEmptyObject(obj) {
        return !Object.keys(obj).length;
    }
    