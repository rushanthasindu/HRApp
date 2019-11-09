const express = require('express');

const router = express.Router();

const EmployeeRouter = require("./EmployeeRouter");
const ProjectRouter = require("./ProjectRouter");
const EmployeeLeaveRouter = require("./EmployeeLeaveRouter");
const InfoRouter = require("./InfoRouter");
const loginRoutes = require('../Auth/login/routes');
const logoutRoutes = require('../Auth/logout/routes');

// function isAuthenticated(req, res, next) {
//   if (req.user && req.isAuthenticated()) {
//     return next();
//   }

//   return res.json({ success: false });
// }

// router.get('/get-session', (req, res) => {
//   const auth = req.headers.authorization;
//   console.log('auth');
//   console.log(Object.values(auth));
//   if (auth.userInfo && auth.isAuthenticated) {
//     return res.json({ success: true, userInfo: auth.userInfo });
//   }

//   return res.json({ success: true });
// });

function isAuthenticated(req, res, next) {
    if (req.user && req.isAuthenticated()) {
      return next();
    }
  
    return res.json({ success: false });
  }
  
  router.get('/get-session', (req, res) => {
    console.log(req.user);  
    if (req.user && req.isAuthenticated()) {
      return res.json({ success: true, userInfo: req.user });
    }
  
    return res.json({ success: false });
  });
  

router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use("/employee", EmployeeRouter);
router.use("/project", ProjectRouter);
router.use("/leave", EmployeeLeaveRouter);
router.use("/info", InfoRouter);

module.exports = router;
