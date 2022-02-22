import { ObjectId } from "mongodb";
import {validateEmail} from "../../utils/middleware.js"

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

//add or update an admin
export async function addAdmin(req, res){
  var body = req.body;
  // check for data formatting of all attributes. course will not be created if there is incorrect formatting.
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
    const adminModel = req.app.locals.admins;
    adminModel.findOne({email: req.body.email}) //find email in the admin
    .then(result => {
        if (result != undefined ){ //if the admin account has been found
            if(result.password === req.body.password){ //if the password matches, then the user has successfully logged in
                return res.json(`USER ${result.username} LOGGED IN`);
            }
            return res.status(401).json(`Admin password is incorrect`);
        }else{ 
            return res.status(400).json("Admin email not found")
        }
    }).catch(error => res.status(500).json("Failed to load database"));
}

//admin logout, remove cookies and jwt


