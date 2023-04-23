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

// new change
app.use(express.json())
app.use(cors()) 

function generateRandomKey() {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 32; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      key += chars[randomIndex];
    }
    return key;
  }

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

app.post("/login", (req,res) =>
{
    const checkLoginMatchSQL = "SELECT COUNT(*) AS UserFound, UserID FROM user WHERE EmailAddress = ? AND Password = ?"

    const values = [
        req.body.email,
        req.body.password
    ]

    db.query(checkLoginMatchSQL, values, (err, result) =>
    {
    if (err) 
    {
        return err;
    }
    else
    {
        
        console.log("users found:" + result[0].UserFound)

        if(result[0].UserFound == 0)
        {
            res.send({
                message:
                  "The email address and/or the password selected are not valid. Please try different credentials.",
                });
        }
        else if(result[0].UserFound == 1)
        {
            res.send({
                message:
                  "Success",
                  "UserID": result[0].UserID
                });
        }
    }
    })

});

app.post("/currentClient", (req, res) =>
    {
    const currentClientID = "SELECT ClientName FROM client WHERE ClientID IN (SELECT ClientID from user WHERE UserID = ?)";
    const UserID = req.body.UserID

    db.query(currentClientID, UserID, (err, result) =>
    {
    if (err) 
    {
        return err;
    }
    else
    {
        res.send({
            message:
              "Success",
              "ClientName": result[0].ClientName
            });
    }
    })

    });


    app.post("/user", (req, res) =>
    {
    const userDetails = "SELECT CONCAT(FirstName, ' ', LastName) AS FullName FROM user WHERE UserID = ?";
    const UserID = req.body.UserID

    db.query(userDetails, UserID, (err, result) =>
    {
    if (err) 
    {
        return err;
    }
    else
    {
        res.send({
            message:
              "Success",
              "FullName": result[0].FullName
            });
    }
    })

    });

    app.post("/dailyShift", (req, res) => {
        
        // get user id
        const UserID = req.body.UserID;
        // generator unique identifier
        
        // pw check before proceed to sign in & out
        const checkPassword = "SELECT COUNT(*) AS UserFound, UserID FROM user WHERE UserID = ? AND Password = ? "
        // inserting new daily record
        const insertDailyShift =
          "INSERT INTO user_shift_times (`UserID`,`ActionTypeID`,`UniqueShiftIdentifier`, `DateTime`, `Latitude`, `Longitude`, `Finished`) VALUES (?, ?, ?, NOW(), ?, ?, ?)";
          // get primary id & date
        const existingDailyShift =
          "SELECT UserShiftTimeID, DateTime, UniqueShiftIdentifier FROM user_shift_times WHERE UserID = ? AND ActionTypeID = 1 AND Finished = 0 AND DateTime IS NOT NULL ORDER BY UserShiftTimeID DESC LIMIT 1";
          
        const values = [UserID, req.body.password];
        const latitude = req.body.Latitude;
        const longitude = req.body.Longitude;

        db.query(checkPassword, values, (err,result) => {
            if (err) {
                return res.send({
                  message: "Error",
                  error: err,
                });
              } else {
                if(result[0].UserFound == 1)
                {

                    db.query(existingDailyShift, UserID, (err, result) => {
                        if (err) {
                          return res.send({
                            message: "Error",
                            error: err,
                          });
                        } else 
                        {
                        
                        if (result.length === 0) {
                            
                              const UniqueShiftIdentifier = generateRandomKey();
                              const valuesToInsert = [UserID, 1, UniqueShiftIdentifier, latitude, longitude, 0];

                              // record not found, do the insert
                              db.query(insertDailyShift, valuesToInsert, (err, result) => {
                              if (err) {
                                return res.send({
                                  message: "Error",
                                  error: err,
                                });
                              }
                              else
                              {
                                return res.send({
                                message: "You have succesfully signed in for today!",
                                Action: 'Sign In'
                              })
                            }
                            });
                            
                          }
                          else if (result.length > 0) {
                            // record found, do the update
                            const updateDailyShift = "UPDATE user_shift_times SET Finished = 1 WHERE UniqueShiftIdentifier = ?";
                            const uniqueShiftIdentifier = result[0].UniqueShiftIdentifier;
                            const valuesToUpdate = [uniqueShiftIdentifier];

                            const valuesToInsert = [UserID, 2, result[0].UniqueShiftIdentifier, latitude, longitude, 1];

                            db.query(insertDailyShift, valuesToInsert, (err, result) => {
                              if (err) {
                                return res.send({
                                  message: "Error",
                                  error: err,
                                });
                              }
                              else
                              {
                                return res.send({
                                    message: "You have succesfully signed out for today!",
                                    Action: "Sign Out"
                                  });
                              }
                            });

                           db.query(updateDailyShift, valuesToUpdate);
                          } 
                          
                        }
                      });

                }
                else 
                {
                    return res.send({
                        message: "The password you have entered does not seem to match the one previously used to login! Please try again."
                      });
                }
              }
        })
      
      });

      app.post("/currentShift", (req, res) => {
        const UserID = req.body.UserID;
        const existingDailyShift =
        "SELECT CONCAT(     IF(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%k') > 0,         CONCAT(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%k'),             IF(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%k') = 1, ' hour', ' hours')), ''),     IF(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%i') > 0,         CONCAT(IF(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%k') > 0, ', ', ''),             SUBSTRING(                 CONCAT(LPAD(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%i'), 2, '0'),                     IF(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%i') = 1, ' minute', ' minutes')),                 2),             IF(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%s') > 0 AND DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%i') < 1,                 CONCAT(IF(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%k') > 0, ', ', ''),                     SUBSTRING(CONCAT(LPAD(DATE_FORMAT(TIMEDIFF(NOW(), DateTime), '%s'), 2, '0'), ' seconds'), 2)),                 '')     ),     '' ) ) AS ShiftDuration FROM user_shift_times WHERE UserID = ? AND ActionTypeID = 1 AND Finished = 0 AND DateTime IS NOT NULL ORDER BY UserShiftTimeID DESC LIMIT 1 ";

          db.query(existingDailyShift, UserID, (err, result) => {
            if (err) {
              return res.send({
                message: "Error",
                error: err,
              });
            } else 
            {
            
            if (result.length === 0) 
            {
                    return res.send({
                        Action: 'Sign In'
                  })
            }
            else if (result.length > 0) {
                    return res.send({
                        Action: "Sign Out",
                        ShiftDuration: result[0].ShiftDuration
                      });
                  } 
            }
          });
      })
      
      app.post("/leaveType", (req, res) => {
        const UserID = req.body.UserID;
        const currentClientID = "SELECT ClientID FROM user WHERE UserID = ? LIMIT 1"
        const holidayTypesSQL = "SELECT lt.LeaveTypeID, lt.LeaveTypeName FROM leave_type lt LEFT JOIN client_leave_type clt on lt.LeaveTypeID = clt.LeaveTypeID WHERE ClientID = ?"
          db.query(currentClientID, UserID, (err, result) => {
            if (err) {
              return res.send({
                message: "Error",
                error: err,
              });
            } else 
            {
            
            if (result.length === 0) 
            {
                    return res.send({
                        value: 0,
                        label: "User not assigned to any client"
                  })
            }
            else if (result.length > 0) {
                    const clientID = result[0].ClientID

                    db.query(holidayTypesSQL, clientID, (err, result) => {
                      if (err) {
                        return res.send({
                          message: "Error",
                          error: err,
                        });
                      } else 
                      {
                        if (result.length === 0) 
                        {
                                return res.send({
                                  value: 0,
                                  label: "No holiday types avaialable"
                              })
                        }
                        else if (result.length > 0) {
                          const results = [];

                          for (let i = 0; i < result.length; i++) {
                            results.push({ value: result[i].LeaveTypeID, name: result[i].LeaveTypeName });
                          }

                        return res.send(results)
                      }

                      }
                    })
                  } 
            }
          });


          app.post("/userHolidayInfo", (req, res) => {
            const UserID = req.body.UserID;
            const userHolidayInfo =
            "SELECT WorkingShiftHours, HolidayEntitelementLeftDays, HolidayEntitelementLeftHours FROM user WHERE UserID = ?";
    
              db.query(userHolidayInfo, UserID, (err, result) => {
                if (err) {
                  return res.send({
                    message: "Error",
                    error: err,
                  });
                } else 
                {
                
                if (result.length === 0) 
                {
                        return res.send({
                            message: "Error",
                            Action: 'No User Found'
                      })
                }
                else if (result.length > 0) {
                        return res.send({
                            message: "Success",
                            WorkingShiftHours: result[0].WorkingShiftHours,
                            HolidayEntitelementLeftDays: result[0].HolidayEntitelementLeftDays,
                            HolidayEntitelementLeftHours: result[0].HolidayEntitelementLeftHours
                          });
                      } 
                }
              });
          })
      })

app.listen(8800, () => {
    console.log("Connected to backend")
})