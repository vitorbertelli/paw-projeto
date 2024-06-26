import express from 'express';
import routes from './routes/index.js';
// import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
// app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

routes(app);

export default app;