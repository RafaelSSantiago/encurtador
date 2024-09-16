import express from "express";
import { urlRoutes } from "./interfaces/routes/urlRoutes";
import { userRoutes } from "./interfaces/routes/userRoutes";
import { loginRoutes } from "./interfaces/routes/loginRoutes";
import { errorReq } from "./infrastructure/middlewares/ErrorReq";

const app = express();
app.use(express.json());

app.use("/url", urlRoutes);
app.use("/user", userRoutes);
app.use("/login", loginRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  next(error);
});

app.use(errorReq);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
