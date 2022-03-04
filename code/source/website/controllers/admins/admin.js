import { ObjectId } from "mongodb";
import {validateEmail, generateAccessToken, authorizeUser} from "../../utils/middleware.js"

//view all the admins
export async function viewAllAdmins(req,res){

    const adminModel = req.app.locals.admins;

    await adminModel.find({})
        .sort({ title: 1, id: 1 })
        .toArray()//get data from database
        .then(results => {
            res.json(results) //send it as json
            })
        .catch(error => res.status(500).json("Failed to view database"))
}

//view a specific admin
export async function viewAdmin(req, res){
    const adminModel = req.app.locals.admins;

   adminModel.findOne({username: req.params.username})//get from database with a specific username
        .then(result => {
            if(result != undefined) res.json(result);
            else res.status(400).json("Admin not found");
            })
        .catch(error => res.status(500).json("Failed to view database"))
};

//add an admin
export async function addAdmin(req, res){
  var body = req.body;
  // check for data formatting of all attributes. admin will not be created if there is incorrect formatting.
  if (typeof(body.name) != 'string' || typeof(body.password) != 'string' || typeof(body.username) != 'string') return res.status(400).json("Name, password and username should be a valid string");
  if (validateEmail(body.email) == false) return res.status(400).json("email should be a valid email address");

  // at this point, we are sure that all data is already formatted correctly.
  const adminModel = req.app.locals.admins;

  await adminModel.findOneAndUpdate({email: body.email}, 
      // set all attributes
      {$set: 
          {name: body.name, password: body.password, username: body.username, email: body.email
              }}, 
      // ensures that it will update existing entries and create a new one if there is none yet
      {upsert: true})
      .then(() => {
          return res.status(200).json(`Successfully added and updated ${body.name} admin!`);
      })
      .catch(error => res.status(400).json("Failed to create an admin"));  
};

//update an admin details
export async function updateAdmin(req, res){
    var body = req.body;
    // check for data formatting of all attributes. admin will not be created if there is incorrect formatting.
    if(body.name && typeof(body.name) != 'string') return res.status(400).json("Name should be a valid string");
    if(body.password && typeof(body.password) != 'string') return res.status(400).json("Password should be a valid string");
    if(body.username && typeof(body.username) != 'string') return res.status(400).json("Username should be a valid string");
    if(validateEmail(body.email) == false) return res.status(400).json("Email should be a valid email address");
  
    // at this point, we are sure that all data is already formatted correctly.
    const adminModel = req.app.locals.admins;

    await adminModel.findOne({email:body.email})
    .then(async account =>{
        await adminModel.findOneAndUpdate({email: body.email}, 
            // set all attributes
            {$set: 
                {name:(body.name? body.name : account.name), 
                password: (body.password? body.password : account.password), 
                username: (body.username? body.username : account.username)
                    }})
            // ensures that it will update existing entries and create a new one if there is none yet
            .then(() => {
                return res.status(200).json(`Successfully updated admin ${account.name} !`);
            })
            .catch(error => res.status(400).json("Failed to create an admin"))  
    })  
} 
    
export async function deleteAdmin(req, res){
    const adminModel = req.app.locals.admins;
    adminModel.deleteOne({email:req.params.email}) //pass the email
  .then((result)=>{
      if(result.deletedCount >=1 ) res.json("Successfully deleted admin " + req.params.email);
      else res.status(400).json("Admin Not Found")
  }).catch(error => res.status(500).json("Failed to delete Admin on database"))
};

//admin login - jtw token and password encryption
export async function loginAdmin(req,res){
    // console.log(req.body);
    const adminModel = req.app.locals.admins;
    adminModel.findOne({email: req.body.email}) //find email in the admin
    .then(result => {
        if (result == undefined ){ //if the admin account has not been found
            return res.status(400).json("Admin email not found")
        }

        if(result.password !== req.body.password){ //if the password matches, then the user has successfully logged in
            return res.status(401).json(`Admin password is incorrect`);
        }

        const {email, name, username} = result;

        //generate a JWT token using the email
        const token = generateAccessToken(email);
        res.cookie("auth", token, {
            httpOnly: true, //set it to true for more security
            maxAge: 365 * 24 * 60 * 60 * 1000,
          }); //save it in the cookie
          res.json({
            //return the token and the user info to the client
            token,
            user: {email, name, username},
          });

        
    }).catch(error => res.status(500).json("Failed to load database"));
}

//admin logout
export async function adminLogout(req, res) {
    try {
      return res
        .cookie("auth", "", { httpOnly: false, expires: new Date(0) })
        .json("User Logged out"); //replace token with empty token that expires in 1 sec
      // res.status(200).json("Succesfully logged out.");
      // res.redirect("http://localhost:3000/");
    } catch (err) {
        res.status(404)
    }
};



