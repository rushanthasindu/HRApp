require("dotenv").config();

const express = require("express");
const CORS = require('cors');
const app = express();
const mongoose = require("mongoose");
const EmployeeRouter = require("./src/routes/EmployeeRouter");
const ProjectRouter = require("./src/routes/ProjectRouter");
const EmployeeLeaveRouter = require("./src/routes/EmployeeLeaveRouter");
const InfoRouter = require("./src/routes/InfoRouter");
const loginRoutes = require('./src/Auth/login/routes');
const logoutRoutes = require('./src/Auth/logout/routes');
const initAuthMiddleware = require('./src/auth/login/init-auth-middleware');
const indexRouter = require('./src/routes/index');

const APP_PORT = process.env.APP_PORT;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database..."));

app.use(CORS());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.enable('trust proxy');

app.use((req, res, next) => {
  console.log('origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});

initAuthMiddleware(app);
app.use('/', indexRouter);

app.listen(APP_PORT, () => console.log("server started on port ", APP_PORT));
