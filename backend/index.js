import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"Uv226cb04v",
    database:"at_hand_hr_test"
})


// if auth problems run this -> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ROOTPW';


app.use(express.json())
app.use(cors()) 

app.post("/register", (req,res) =>
{
    const checkExistingEmailAddress = "SELECT COUNT(*) AS NumberOfUsersFound FROM user WHERE EmailAddress = ?"

    const q = "INSERT INTO user (`ClientID`,`EmailAddress`, `Password`, `FirstName`, `LastName`,`DOB`,`Status`) VALUES (?)"

    const values = [
        1,
        req.body.email,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
        req.body.DOB,
        "Active"
    ]


    db.query(checkExistingEmailAddress, req.body.email, (err, result) =>
    {
    if (err) 
    {
        return err;
    }
    else
    // email address does not exist on the database -> we can insert new record in user table

        if(result[0].NumberOfUsersFound == 0)
        {
            console.log("before insert")
            db.query(q,[values], (err,data) =>
    {
        if(err)
        {
            return res.json(err);
        }
        else
            res.send({
            message:
              "Your registration was successful! Please check your email to activate your account!",
            });

    })
        }
        else
    // email address already exists on the dataabse -> we will NOT insert new record in user table
        res.send({
            message:
              "The selected email address exists already on our system. Please try a different one or contact your administrator!",
            });

    })
    
});

app.listen(8800, () => {
    console.log("Connected to backend")
})