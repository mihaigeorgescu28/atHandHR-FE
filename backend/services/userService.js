// services/userService.js
import db from '../db.js';

const UserService = {
  getUserDataById: (userID) => {
    const userDataQuery = `
      SELECT 
        us.UserID,
        us.FirstName,
        us.LastName,
        CONCAT(us.FirstName, ' ', us.LastName) as 'FullName',
        us.EmailAddress,
        us.CompanyEmailAddress,
        us.PhoneNumber,
        us.CompanyPhoneNumber,
        DATE_FORMAT(us.DOB, '%d/%m/%Y') as DateOfBirth,
        us.WorkingShiftHours,
        CONCAT(
          us.HolidayEntitelementLeftDays,
          IF(us.HolidayEntitelementLeftDays > 1 OR us.HolidayEntitelementLeftDays = 0, ' days, ', ' day, '),
          us.HolidayEntitelementLeftDays,
          IF(us.HolidayEntitelementLeftDays > 1 OR us.HolidayEntitelementLeftDays = 0, ' hours', ' hour')
        ) as HolidayEntitlement,
        us.PositionID,
        p.PositionName,
        us.EmployeeNumber,
        us.ExEmployee,
        us.NINO,
        us.LineManagerID,
        CONCAT(us1.FirstName, ' ', us1.LastName) as 'LineManager',
        DATE_FORMAT(us.JoinedDate, '%d/%m/%Y') as JoinedDate,
        us.Salary,
        us.BuildingNameNumber,
        us.StreetName,
        us.TownCity,
        us.Country,
        us.PostalCode,
        us.ProfilePicture
      FROM user us
      LEFT JOIN position p on us.PositionID = p.PositionID
      LEFT JOIN user us1 on us1.LineManagerID = us.LineManagerID
      WHERE us.UserID = ?
    `;
    
    return new Promise((resolve, reject) => {
      db.query(userDataQuery, [userID], (error, result) => {
        if (error) {
          reject(error);
        } else {
          const userData = result.map((item) => ({
            UserID: item.UserID,
              FirstName: item.FirstName,
              LastName: item.LastName,
              FullName: item.FullName,
              EmailAddress: item.EmailAddress,
              CompanyEmailAddress: item.CompanyEmailAddress,
              PhoneNumber: item.PhoneNumber,
              CompanyPhoneNumber: item.CompanyPhoneNumber,
              DOB: item.DateOfBirth,
              WorkingShiftHours: item.WorkingShiftHours,
              HolidayEntitlement: item.HolidayEntitlement,
              PositionID : item.PositionID,
              Position : item.PositionName,
              EmployeeNumber : item.EmployeeNumber,
              ExEmployee: item.ExEmployee,
              NINO: item.NINO,
              LineManagerID: item.LineManagerID,
              LineManager: item.LineManager,
              JoinedDate: item.JoinedDate,
              Salary: item.Salary,
              BuildingNameNumber: item.BuildingNameNumber,
              StreetName: item.StreetName,
              TownCity: item.TownCity,
              Country: item.Country,
              PostalCode: item.PostalCode,
              ProfilePicture: item.ProfilePicture
          }));
          resolve(userData);
        }
      });
    });
  },
  
  // register new user
  registerUser: (userData) => {
    const checkExistingEmailAddress = 'SELECT COUNT(*) AS NumberOfUsersFound FROM user WHERE EmailAddress = ?';
    const insertUserQuery = 'INSERT INTO user (`ClientID`, `EmailAddress`, `Password`, `FirstName`, `LastName`, `DOB`, `Status`) VALUES (?)';
  
    return new Promise(async (resolve, reject) => {
      try {
        // Check if the email address already exists
        const [existingUsers] = await db.query(checkExistingEmailAddress, [userData.email]);
  
        if (existingUsers[0].NumberOfUsersFound > 0) {
          throw new Error('The selected email address already exists on our system. Please try a different one or contact your administrator!');
        }
  
        // Insert new user
        db.query(insertUserQuery, [[
          1, // ClientID (you may adjust this value based on your requirements)
          userData.email,
          userData.password,
          userData.firstName,
          userData.lastName,
          userData.DOB,
          'Active',
        ]]);
  
        resolve({ message: 'Your registration was successful! Please check your email to activate your account.' });
      } catch (error) {
        console.error('Error registering user:', error);
        reject(new Error('Failed to register user. Please try again later.'));
      }
    });
  },
  
  
};

export default UserService;
