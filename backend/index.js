import express from "express"
import mysql from "mysql"
import cors from "cors"
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: 'C:/Users/mihai/source/repos/atHandHR/backend/.env' });

const app = express()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


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
    const currentClientID = "SELECT ClientID, ClientName, HolidaySystem, DailyShiftTracker, LatLongTracker, WorkingWeekends FROM client WHERE ClientID IN (SELECT ClientID from user WHERE UserID = ?) AND Status = 'Active' ";
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
              "ClientID": result[0].ClientID,
              "ClientName": result[0].ClientName,
              "HolidaySystem": result[0].HolidaySystem,
              "DailyShiftTracker": result[0].DailyShiftTracker,
              "LatLongTracker": result[0].LatLongTracker,
              "WorkingWeekends": result[0].WorkingWeekends
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
            "SELECT WorkingShiftHours, HolidayEntitelementLeftDays, HolidayEntitelementLeftHours, client.WorkingWeekends FROM user LEFT JOIN client on user.ClientID = client.ClientID WHERE user.UserID = ?";
    
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
                            HolidayEntitelementLeftHours: result[0].HolidayEntitelementLeftHours,
                            WorkingWeekends: result[0].WorkingWeekends
                          });
                      } 
                }
              });
          })
      })


      app.post("/submitLeave", (req, res) => {
        const UserID = req.body.UserID;

        const q = "INSERT INTO leave_request (`UserID`,`LeaveTypeID`, `StatusID`, `StartDateTime`, `EndDateTime`,`WorkingDays`,`WorkingHours`,`Notes`) VALUES (?)"

        const values = [
            req.body.UserID,
            req.body.LeaveTypeID,
            1,
            req.body.StartDateTime,
            req.body.EndDateTime,
            req.body.WorkingDays,
            req.body.WorkingHours,
            req.body.Notes
        ]

        db.query(q,[values], (err,data) =>
    {
        if(err)
        {
            return res.json(err);
        }
        else
            res.send({
            message:
              "Your leave request was submitted!",
            });

    })

      })

      app.get("/leaveRequests", (req, res) => {
        const ClientID = req.query.ClientID; // Use req.query to get the query parameter
      
        const allLeaveRequests = `
          (SELECT b.LeaveTypeName, a.StartDateTime, a.EndDateTime, c.FirstName 
          FROM leave_request a 
          LEFT JOIN leave_type b on a.LeaveTypeID = b.LeaveTypeID 
          LEFT JOIN user c on c.UserID = a.UserID
          WHERE c.ClientID = ?)
          UNION 
          (SELECT 'Bank Holiday', d.Date, d.Date, 'N/A' FROM bank_holiday d)`;
      
        db.query(allLeaveRequests, [ClientID], (err, result) => {
          if (err) {
            return res.send({
              message: "Error",
              error: err,
            });
          } else {
            const response = result.map((item) => ({
              title: item.LeaveTypeName + (item.FirstName !== 'N/A' ? (" - " + item.FirstName) : ''),
              allDay: true,
              start: new Date(item.StartDateTime),
              end: new Date(item.EndDateTime)
            }));
      
            return res.send(response);
          }
        });
      });
      


      app.post("/bankHoliday", (req, res) => {
        const bankHolidayCheck = "SELECT Date FROM bank_holiday WHERE Date = ? LIMIT 1";
        const inputDate = new Date(req.body.Date)
      
        db.query(bankHolidayCheck, [inputDate], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send({ error: "An error occurred while executing the query." });
            return;
          }
      
          if (result.length === 0) {
            res.status(200).send({ BankHoliday: "No" });
          } else {
            res.status(200).send({ BankHoliday: "Yes" });
          }
        });
      });


      app.post("/WithinBankHoliday", (req, res) => {
        const bankHolidayCheck = "SELECT COUNT(*) as NumberOfBankHolidays FROM bank_holiday WHERE Date BETWEEN ? AND ?";
        const start = new Date(req.body.start);
        const end = new Date(req.body.end);
      
        db.query(bankHolidayCheck, [start, end], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send({ error: "An error occurred while executing the query." });
            return;
          }
      
          if (result.length >= 0) {
            const numberOfBankHolidays = result[0].NumberOfBankHolidays;
            const bankHolidayDuration = numberOfBankHolidays * 24 * 60 * 60 * 1000; // Assuming 1 bank holiday is 8 hours
            const updatedDiffInMs = req.body.diffInMs - bankHolidayDuration;
      
            res.status(200).send({ NumberOfBankHolidays: numberOfBankHolidays, updatedDiffInMs: updatedDiffInMs });
          }
        });
      });


      app.get("/totalStaffOfClient", (req, res) => {
        const totalStaffOfClient = `
        SELECT 
          UserID,
          CONCAT(FirstName, ' ', LastName) as 'FullName',
          EmailAddress,
          DATE_FORMAT(DOB, '%d/%m/%Y') as DateOfBirth,
          WorkingShiftHours,
          CONCAT(
            HolidayEntitelementLeftDays,
            IF(HolidayEntitelementLeftDays > 1 OR HolidayEntitelementLeftDays = 0, ' days, ', ' day, '),
            HolidayEntitelementLeftHours,
            IF(HolidayEntitelementLeftHours > 1 OR HolidayEntitelementLeftHours = 0, ' hours', ' hour')
          ) as HolidayEntitlement,
          PositionName,
          EmployeeNumber
        FROM user
        LEFT JOIN position p on user.PositionID = p.PositionID
        WHERE user.ClientID = ?
      `;
      
        const values = [req.query.ClientID]; // Retrieve ClientID from query parameters
      
      
        db.query(totalStaffOfClient, values, (err, result) => {
          if (err) {
            return res.send({
              message: "Error",
              error: err,
            });
          } else {
            const response = result.map(item => ({  
              UserID: item.UserID,
              FullName: item.FullName,
              EmailAddress: item.EmailAddress,
              DOB: item.DateOfBirth,
              WorkingShiftHours: item.WorkingShiftHours,
              HolidayEntitlement: item.HolidayEntitlement,
              Position : item.PositionName,
              EmployeeNumber : item.EmployeeNumber
            }));
      
            
        
            return res.send(response);
          }
        });
      });
      
      app.get("/getUserData/:userID", (req, res) => {
        const userData = `
          SELECT 
            UserID,
            CONCAT(FirstName, ' ', LastName) as 'FullName',
            EmailAddress,
            DATE_FORMAT(DOB, '%d/%m/%Y') as DateOfBirth,
            WorkingShiftHours,
            CONCAT(
              HolidayEntitelementLeftDays,
              IF(HolidayEntitelementLeftDays > 1 OR HolidayEntitelementLeftDays = 0, ' days, ', ' day, '),
              HolidayEntitelementLeftDays,
              IF(HolidayEntitelementLeftDays > 1 OR HolidayEntitelementLeftDays = 0, ' hours', ' hour')
            ) as HolidayEntitlement,
            PositionName,
            EmployeeNumber
          FROM user
          LEFT JOIN position p on user.PositionID = p.PositionID
          WHERE user.UserID = ?
        ` 
        const values = [req.params.userID]; // Retrieve UserID from URL params
      
        db.query(userData, values, (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Error",
              error: err,
            });
          } else {
            const response = result.map((item) => ({
              UserID: item.UserID,
              FullName: item.FullName,
              EmailAddress: item.EmailAddress,
              DOB: item.DateOfBirth,
              WorkingShiftHours: item.WorkingShiftHours,
              HolidayEntitlement: item.HolidayEntitlement,
              Position : item.PositionName,
              EmployeeNumber : item.EmployeeNumber
            }));
      
            return res.status(200).json(response);
          }
        });
      });

      app.get("/countStaffData", (req, res) => {
        const clientID = req.query.ClientID;
        
        const sqlQuery = `
          SELECT
            (
              SELECT COUNT(*) 
              FROM user 
              WHERE ClientID = u.ClientID
            ) AS TotalStaff,
            (
              SELECT COUNT(*) 
              FROM leave_request lr
              LEFT JOIN user u ON u.UserID = lr.UserID
              WHERE DATE(lr.EndDateTime) >= CURDATE()
              AND u.ClientID = u.ClientID
              AND DATE(lr.StartDateTime) <= DATE_ADD(CURDATE(), INTERVAL 0 DAY)
            ) AS StaffOnLeave,
            (
              SELECT COUNT(*) 
              FROM leave_request lr
              LEFT JOIN user u ON u.UserID = lr.UserID
              WHERE DATE(lr.EndDateTime) >= CURDATE()
              AND lr.StartDateTime <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
              AND u.ClientID = u.ClientID
            ) AS StaffOnLeaveNext30Days
          FROM user u
          WHERE u.ClientID = ?`;
        
        db.query(sqlQuery, [clientID], (err, result) => {
          if (err) {
            return res.send({
              message: "Error",
              error: err,
            });
          } else {
            return res.send(result[0]);
          }
        });
      });
      

      app.get("/leaveRequestsStatus", (req, res) => {
        const LeaveRequestsGroupedByStatus = `
        SELECT s.StatusName, IFNULL(subquery.NoOfLeaveRequests, 0) AS NoOfLeaveRequests
        FROM status s
        LEFT JOIN (
            SELECT a.StatusID, COUNT(*) AS NoOfLeaveRequests
            FROM leave_request a
            LEFT JOIN leave_type b ON a.LeaveTypeID = b.LeaveTypeID
            LEFT JOIN user c ON c.UserID = a.UserID
            LEFT JOIN leave_type_group d on d.LeaveTypeGroupID = b.LeaveTypeGroupID
            WHERE YEAR(a.StartDateTime) = YEAR(NOW())
            AND c.ClientID = ?
            AND d.LeaveTypeGroupID = ?
            GROUP BY a.StatusID
        ) subquery ON s.StatusID = subquery.StatusID
        ORDER BY s.StatusID;
        
        `;
      
        const { ClientID, LeaveTypeGroupID } = req.query; // Extract query parameters from the URL
      
        const values = [ClientID, LeaveTypeGroupID];

        db.query(LeaveRequestsGroupedByStatus, values, (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
              message: "Error",
              error: err,
            });
          } else {
            // Reorder the response data to match the expected order
            if(LeaveTypeGroupID == 1)
            {
              
            }
            const reorderedResponse = [
              result.find(item => item.StatusName === "Declined").NoOfLeaveRequests,
              result.find(item => item.StatusName === "Approved").NoOfLeaveRequests,
              result.find(item => item.StatusName === "Requested").NoOfLeaveRequests,
            ];
      
            return res.send(reorderedResponse);
          }
        });
      });

      app.get("/leaveRequestsType", (req, res) => {
        const LeaveRequestsGroupedByStatus = `
        SELECT ly.LeaveTypeName, IFNULL(subquery.NoOfLeaveTypeRequests, 0) AS NoOfLeaveTypeRequests
        FROM leave_type ly
        LEFT JOIN (
            SELECT a.LeaveTypeID, COUNT(*) AS NoOfLeaveTypeRequests
            FROM leave_request a
            LEFT JOIN leave_type b ON a.LeaveTypeID = b.LeaveTypeID
            LEFT JOIN user c ON c.UserID = a.UserID
            LEFT JOIN leave_type_group d on d.LeaveTypeGroupID = b.LeaveTypeGroupID
            WHERE YEAR(a.StartDateTime) = YEAR(NOW())
            AND c.ClientID = ?
            AND d.LeaveTypeGroupID = ?
            AND a.StatusID = ?
            GROUP BY a.LeaveTypeID
        ) subquery ON ly.LeaveTypeID = subquery.LeaveTypeID
        left join client_leave_type clt on clt.LeaveTypeID = ly.LeaveTypeID
        where clt.RequiresApproval = 1
        ORDER BY ly.LeaveTypeID;
        `;
      
        const { ClientID, LeaveTypeGroupID, StatusID } = req.query; // Extract query parameters from the URL
      
        const values = [ClientID, LeaveTypeGroupID, StatusID];

        db.query(LeaveRequestsGroupedByStatus, values, (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
              message: "Error",
              error: err,
            });
          } else {
            const reorderedResponse = result.map(item => ({
              LeaveTypeName: item.LeaveTypeName,
              NoOfLeaveTypeRequests: item.NoOfLeaveTypeRequests,
          }));
      
            return res.send(reorderedResponse);
          }
        });
      });

      app.get("/leaveRequestLastUpdated", (req, res) => {
        const LeaveRequestsLastUpdated = `
        SELECT CASE
        WHEN TIMESTAMPDIFF(DAY, a.ModifiedDate, NOW()) < 1 THEN
            CONCAT(TIMESTAMPDIFF(HOUR, a.ModifiedDate, NOW()), ' hours')
        ELSE
            CONCAT(TIMESTAMPDIFF(DAY, a.ModifiedDate, NOW()), ' days')
        END AS 'LastUpdatedInDays'
        FROM leave_request a
        LEFT JOIN leave_type b on a.LeaveTypeID = b.LeaveTypeID
        LEFT JOIN user c on c.UserID = a.UserID
        LEFT JOIN status d on d.StatusID = a.StatusID
        WHERE YEAR(a.StartDateTime) = YEAR(NOW())
        AND c.ClientID = ?
        AND b.LeaveTypeID = ?
        ORDER BY a.ModifiedDate DESC
        LIMIT 1
        `;
      
        const { ClientID, LeaveTypeID } = req.query; // Extract query parameters from the URL
      
        const values = [ClientID, LeaveTypeID];
      
        db.query(LeaveRequestsLastUpdated, values, (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
              message: "Error",
              error: err,
            });
          } else {
            // Reorder the response data to match the expected order
            const response = result.map(item => ({  
              LastUpdatedLeaveDate: item.LastUpdatedInDays
            }));
      
            return res.send(response);
          }
        });
      });

      app.get("/SignInOutReportToday", (req, res) => {
        const SignInOutReportToday = `
        SELECT
      (SELECT COUNT(DISTINCT UserID) FROM user_shift_times usshti_inner WHERE usshti_inner.ActionTypeID = us.ActionTypeID AND DATE(usshti_inner.DateTime) = CURDATE()) AS NumberOfUsersSignedInOut,
      ((SELECT COUNT(*) FROM user WHERE ClientID = u.ClientID AND user.Status = 'Active') -  (SELECT COUNT(DISTINCT UserID) FROM user_shift_times usshti_inner WHERE usshti_inner.ActionTypeID = us.ActionTypeID AND DATE(usshti_inner.DateTime) = CURDATE())) AS NumberOfUsersNotSignedInOut,
      (SELECT COUNT(*) FROM user WHERE ClientID = u.ClientID  AND user.Status = 'Active') AS TotalUsers,
      ROUND(((SELECT COUNT(DISTINCT UserID) FROM user_shift_times usshti_inner WHERE usshti_inner.ActionTypeID = us.ActionTypeID AND DATE(usshti_inner.DateTime) = CURDATE()) / (SELECT COUNT(*) FROM user WHERE ClientID = u.ClientID AND user.Status = 'Active')) * 100, 0) AS PercentageOfUsersSignedInOutToday
      FROM user_shift_times us
      LEFT JOIN user u ON u.UserID = us.UserID
      WHERE u.ClientID = ?
      AND us.ActionTypeID = ?
      GROUP BY u.ClientID;
        `;
      
        const { ClientID, ActionTypeID } = req.query; // Extract query parameters from the URL
      
        const values = [ClientID, ActionTypeID];
      
        db.query(SignInOutReportToday, values, (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
              message: "Error",
              error: err,
            });
          } else {
            const NumberOfUsersSignedInOut = result[0].NumberOfUsersSignedInOut;
            const NumberOfUsersNotSignedInOut = result[0].NumberOfUsersNotSignedInOut;
        
            // Extract PercentageOfUsersSignedOutToday
            const PercentageOfUsersSignedInOutToday = result[0].PercentageOfUsersSignedInOutToday;
        
            // Create an array with NumberOfUsersSignedOut and NumberOfUsersNotSignedOut
            const responseArray = [NumberOfUsersSignedInOut, NumberOfUsersNotSignedInOut];

            const responseObject = {
              SignInOutPending: responseArray,
              PercentageOfUsersSignedInOutToday,
            };
            return res.send(responseObject);
          }
        });

        app.get("/SignInOutLastUpdated", (req, res) => {
          const SignInOutLastUpdated = `
          SELECT CASE
          WHEN TIMESTAMPDIFF(HOUR, a.DateTime, NOW()) < 1 THEN
			  CONCAT(TIMESTAMPDIFF(MINUTE, a.DateTime, NOW()), ' minutes')
          WHEN TIMESTAMPDIFF(DAY, a.DateTime, NOW()) < 1 THEN
              CONCAT(TIMESTAMPDIFF(HOUR, a.DateTime, NOW()), ' hours')
          ELSE
              CONCAT(TIMESTAMPDIFF(DAY, a.DateTime, NOW()), ' days')
          END AS 'LastUpdatedInDays'
          FROM user_shift_times a
          LEFT JOIN user b on a.UserID = b.UserID
          WHERE YEAR(a.DateTime) = YEAR(NOW())
          AND b.ClientID = ?
          AND a.ActionTypeID = ?
          ORDER BY a.DateTime DESC
          LIMIT 1
          `;
        
          const { ClientID, ActionTypeID } = req.query; // Extract query parameters from the URL
        
          const values = [ClientID, ActionTypeID];
        
          db.query(SignInOutLastUpdated, values, (err, result) => {
            if (err) {
              console.error('Database error:', err);
              return res.status(500).json({
                message: "Error",
                error: err,
              });
            } else {
              // Reorder the response data to match the expected order
              const response = result.map(item => ({  
                LastSignInOutLeaveDate: item.LastUpdatedInDays
              }));
        
              return res.send(response);
            }
          });
        });
        
      });

      app.get("/CurrentNumberOfLeaveRequests", (req, res) => {
        const CurrentNumberOfLeaveRequests = `
        SELECT 
        COUNT(CASE WHEN LeaveTypeID = 1 THEN 1 END) AS NumberOfHolidayRequests,
        COUNT(CASE WHEN LeaveTypeID = 2 THEN 1 END) AS NumberOfSickRequests,
        COUNT(CASE WHEN LeaveTypeID NOT IN (1, 2) THEN 1 END) AS NumberOfMiscellaneousRequests
        FROM leave_request a
        LEFT JOIN user b ON b.UserID = a.UserID
        WHERE b.ClientID = ?;
        `;
      
        const { ClientID } = req.query; // Extract query parameters from the URL

        const values = [ClientID];
      
        db.query(CurrentNumberOfLeaveRequests, values, (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
              message: "Error",
              error: err,
            });
          } else {
            // Extract the aggregated values from the result
            const { NumberOfHolidayRequests, NumberOfSickRequests, NumberOfMiscellaneousRequests } = result[0];
      
            const response = {
              NumberOfHolidayRequests,
              NumberOfSickRequests,
              NumberOfMiscellaneousRequests
            };
      
            return res.send(response);
          }
        });
      });


      app.get("/CurrentNumberOfLeaveRequestsByMonth", (req, res) => {
        const CurrentNumberOfLeaveRequestsByMonth = `
          SELECT 
            MONTH(a.CreatedDate) as 'Month Number',
            SUM(CASE WHEN a.LeaveTypeID = 1 THEN 1 ELSE 0 END) AS NumberOfHolidayRequests,
            SUM(CASE WHEN a.LeaveTypeID = 2 THEN 1 ELSE 0 END) AS NumberOfSickRequests,
            SUM(CASE WHEN a.LeaveTypeID NOT IN (1, 2) THEN 1 ELSE 0 END) AS NumberOfMiscellaneousRequests
          FROM leave_request a
          LEFT JOIN user b ON b.UserID = a.UserID
          WHERE b.ClientID = ?
          GROUP BY MONTH(a.CreatedDate)
        `;
      
        const { ClientID } = req.query; // Extract query parameters from the URL
      
        const values = [ClientID];
      
        db.query(CurrentNumberOfLeaveRequestsByMonth, values, (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
              message: "Error",
              error: err,
            });
          } else {
            // Create an object to store counts for each month
            const monthCounts = {};
      
            // Initialize counts for all months to 0
            for (let i = 1; i <= 12; i++) {
              monthCounts[i] = {
                NumberOfHolidayRequests: 0,
                NumberOfSickRequests: 0,
                NumberOfMiscellaneousRequests: 0,
              };
            }
      
            // Process the query result and populate the monthCounts object
            result.forEach((row) => {
              const { 'Month Number': month, NumberOfHolidayRequests, NumberOfSickRequests, NumberOfMiscellaneousRequests } = row;
      
              monthCounts[month] = {
                NumberOfHolidayRequests,
                NumberOfSickRequests,
                NumberOfMiscellaneousRequests,
              };
            });
      
            return res.send(monthCounts);
          }
        });
      });


      app.get("/staffOnLeave", (req, res) => {
        const DateRange = req.query.DateRange || '0'; // Get the DateRange from query parameters, default to '0' if not provided
        const values = [req.query.ClientID, DateRange]; // Retrieve ClientID from query parameters
      
        const totalStaffOfClient = `
          SELECT u.UserID,
            CONCAT(FirstName, ' ', LastName) as 'FullName',
            CONCAT(
              WorkingDays,
              IF(WorkingDays > 1 OR WorkingDays = 0, ' days, ', ' day, '),
              WorkingHours,
              IF(WorkingHours > 1 OR WorkingHours = 0, ' hours', ' hour')
            ) as LeaveDuration,
            CONCAT(
              HolidayEntitelementLeftDays,
              IF(HolidayEntitelementLeftDays > 1 OR HolidayEntitelementLeftDays = 0, ' days, ', ' day, '),
              HolidayEntitelementLeftDays,
              IF(HolidayEntitelementLeftHours > 1 OR HolidayEntitelementLeftHours = 0, ' hours', ' hour')
            ) as HolidayEntitlement,
            DATE_FORMAT(lr.StartDateTime, '%d/%m/%Y') as StartDateTime,
            DATE_FORMAT(lr.EndDateTime, '%d/%m/%Y') as EndDateTime,
            lety.LeaveTypeName,
            st.StatusName
          FROM leave_request lr
          LEFT JOIN user u ON u.UserID = lr.UserID
          LEFT JOIN leave_type lety on lety.LeaveTypeID = lr.LeaveTypeID
          LEFT JOIN status st on st.StatusID = lr.StatusID
          WHERE DATE(lr.EndDateTime) >= CURDATE()
          AND u.ClientID = ?
          AND DATE(lr.StartDateTime) <= DATE_ADD(CURDATE(), INTERVAL ? DAY)`; // Include the DateRange condition in the SQL query if DateRange is not '0'
      
        db.query(totalStaffOfClient, values, (err, result) => {
          if (err) {
            return res.send({
              message: "Error",
              error: err,
            });
          } else {
            const response = result.map(item => ({  
              UserID: item.UserID,
              FullName: item.FullName,
              LeaveDuration: item.LeaveDuration,
              HolidayEntitlement: item.HolidayEntitlement,
              StartDateTime : item.StartDateTime,
              EndDateTime : item.EndDateTime,
              LeaveTypeName : item.LeaveTypeName,
              StatusName : item.StatusName
            }));
      
            return res.send(response);
          }
        });
      });


      app.get("/LeaveRequestStatusBreakDown", (req, res) => {
        const { ClientID, LeaveTypeGroupID, LeaveStatusID, LeaveTypeID } = req.query; // Extract query parameters from the URL
      
        // Initialize an array to store the conditions
        const conditions = [];
        const values = [ClientID];
      
        if (LeaveTypeGroupID !== '') {
          conditions.push('lety.LeaveTypeGroupID = ?');
          values.push(LeaveTypeGroupID);
        }
      
        if (LeaveTypeID !== '') {
          conditions.push('lr.LeaveTypeID = ?');
          values.push(LeaveTypeID);
        }
      
        // Build the SQL query dynamically based on the conditions
        const conditionString = conditions.length > 0 ? `AND ${conditions.join(' AND ')}` : '';
      
        const LeaveRequestStatusBreakDown = `
          SELECT u.UserID,
            CONCAT(FirstName, ' ', LastName) as 'FullName',
            CONCAT(
              WorkingDays,
              IF(WorkingDays > 1 OR WorkingDays = 0, ' days, ', ' day, '),
              WorkingHours,
              IF(WorkingHours > 1 OR WorkingHours = 0, ' hours', ' hour')
            ) as LeaveDuration,
            CONCAT(
              HolidayEntitelementLeftDays,
              IF(HolidayEntitelementLeftDays > 1 OR HolidayEntitelementLeftDays = 0, ' days, ', ' day, '),
              HolidayEntitelementLeftDays,
              IF(HolidayEntitelementLeftHours > 1 OR HolidayEntitelementLeftHours = 0, ' hours', ' hour')
            ) as HolidayEntitlement,
            DATE_FORMAT(lr.StartDateTime, '%d/%m/%Y') as StartDateTime,
            DATE_FORMAT(lr.EndDateTime, '%d/%m/%Y') as EndDateTime,
            lety.LeaveTypeName,
            st.StatusName,
            st.ClosedStatus
          FROM leave_request lr
          LEFT JOIN user u ON u.UserID = lr.UserID
          LEFT JOIN leave_type lety on lety.LeaveTypeID = lr.LeaveTypeID
          LEFT JOIN status st on st.StatusID = lr.StatusID
          WHERE u.ClientID = ?
          ${conditionString}
          AND lr.StatusID = ?;
        `;
      
        values.push(LeaveStatusID);
      
        db.query(LeaveRequestStatusBreakDown, values, (err, result) => {
          if (err) {
            return res.send({
              message: "Error",
              error: err,
            });
          } else {
            const response = result.map((item) => ({
              UserID: item.UserID,
              FullName: item.FullName,
              LeaveDuration: item.LeaveDuration,
              HolidayEntitlement: item.HolidayEntitlement,
              StartDateTime: item.StartDateTime,
              EndDateTime: item.EndDateTime,
              LeaveTypeName: item.LeaveTypeName,
              StatusName: item.StatusName,
              ClosedStatus: item.ClosedStatus,
            }));
      
            return res.send(response);
          }
        });
      });
      
      
      
      
      app.get("/SignInOutMonthlyReport", (req, res) => {
        const SignInOutMonthlyReport = `
        SELECT
  LEFT(MONTHNAME(usshti.DateTime), 3) AS "Month",
  COUNT(DISTINCT usshti.UserID) AS "NumberOfSignInsOuts"
FROM
  user_shift_times usshti
LEFT JOIN
  user us ON usshti.UserID = us.UserID
WHERE
  us.ClientID = ?
  AND usshti.ActionTypeID = ?
GROUP BY
  MONTH(usshti.DateTime);

        `;
      
        const { ClientID, ActionTypeID } = req.query; // Extract query parameters from the URL
      
        const values = [ClientID, ActionTypeID];
      
        db.query(SignInOutMonthlyReport, values, (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
              message: "Error",
              error: err,
            });
          } else {
            return res.send(result);
          }
        });

      });


      app.get("/TimeManagementBreakDown", (req, res) => {
        const { ClientID, ActionTypeID, TimeManagementStatus, DateRangeStart, DateRangeEnd } = req.query;
      
        let dateRangeCondition = "";  // Initialize an empty string for the date range condition
      
        // Check if DateRangeStart is defined, otherwise set it to the current date
const startDate = DateRangeStart ? db.escape(DateRangeStart) : db.escape(new Date().toISOString().split('T')[0]);

// Check if DateRangeEnd is defined, otherwise set it to the current date
const endDate = DateRangeEnd ? db.escape(DateRangeEnd) : db.escape(new Date().toISOString().split('T')[0]);

// Include the date range condition
dateRangeCondition = `
  AND DATE(usshti.DateTime) >= ${startDate}
  AND DATE(usshti.DateTime) <= ${endDate}
`;
      
        let timeManagementBreakDown = `
          SELECT
            us.UserID,
            CONCAT(FirstName, ' ', LastName) AS 'FullName',
            IFNULL(
              DATE_FORMAT(
                (SELECT DateTime FROM user_shift_times usshti 
                  WHERE usshti.UserID = us.UserID AND usshti.ActionTypeID = ${db.escape(ActionTypeID)} 
                    ${dateRangeCondition}  -- Include the date range condition here
                  ORDER BY usshti.UserShiftTimeID DESC LIMIT 1),
                '%d/%m/%Y (%H:%i)'
              ),
              'Pending'
            ) AS 'SignedInOut',  
            CONCAT(IFNULL(us.WorkingShiftHours, 8), ' Hours') AS 'ExpectedShiftDurationHours',
            TIMEDIFF(
              (SELECT DateTime FROM user_shift_times usshti 
                WHERE usshti.UserID = us.UserID AND usshti.ActionTypeID = 2 
                  ${dateRangeCondition}  -- Include the date range condition here
                ORDER BY usshti.UserShiftTimeID DESC LIMIT 1),
              (SELECT DateTime FROM user_shift_times usshti 
                WHERE usshti.UserID = us.UserID AND usshti.ActionTypeID = 1 
                  ${dateRangeCondition}  -- Include the date range condition here
                ORDER BY usshti.UserShiftTimeID DESC LIMIT 1)
            ) AS 'ActualShiftDuration'
          FROM
            user us
          WHERE
            us.ClientID = ${db.escape(ClientID)} AND
            (
              (${db.escape(TimeManagementStatus)} = 'Pending' AND 'Pending' = IFNULL(
                DATE_FORMAT(
                  (SELECT DateTime FROM user_shift_times usshti 
                    WHERE usshti.UserID = us.UserID AND usshti.ActionTypeID = ${db.escape(ActionTypeID)} 
                      ${dateRangeCondition}  -- Include the date range condition here
                    ORDER BY usshti.UserShiftTimeID DESC LIMIT 1),
                  '%d/%m/%Y (%H:%i)'
                ),
                'Pending'
              )) OR
              (${db.escape(TimeManagementStatus)} = 'OnTime' AND 'OnTime' <> IFNULL(
                DATE_FORMAT(
                  (SELECT DateTime FROM user_shift_times usshti 
                    WHERE usshti.UserID = us.UserID AND usshti.ActionTypeID = ${db.escape(ActionTypeID)} 
                      ${dateRangeCondition}  -- Include the date range condition here
                    ORDER BY usshti.UserShiftTimeID DESC LIMIT 1),
                  '%d/%m/%Y (%H:%i)'
                ),
                'OnTime'
              ))
            );
        `;
      
        db.query(timeManagementBreakDown, (err, result) => {
          if (err) {
            return res.send({
              message: "Error",
              error: err,
            });
          } else {
            const response = result.map((item) => ({
              UserID: item.UserID,
              FullName: item.FullName,
              SignedInOut: item.SignedInOut,
              ActualShiftDuration: item.ActualShiftDuration,
              ExpectedShiftDurationHours: item.ExpectedShiftDurationHours,
            }));
      
            return res.send(response);
          }
        });
      });
      
      
      
      

      

app.listen(8800, () => {
    console.log("Connected to backend")
})