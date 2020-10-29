require("dotenv").config();
const Express = require("express");
const db = require("./db");

const app = Express();

const middlewares = require("./middleware");

const controllers = require("./controllers");

app.use(middlewares.CORS);
app.use(Express.json());

app.use("/user", controllers.User);

app.use("/character", middlewares.ValidateJWT, controllers.Character); 

app.get("/", (req, res) => {
    res.json({
      message: "Welcome to the Personary app!",
    });
  });

  db.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(8080, () => {
      console.log(`[server]: App is listening on localhost:8080`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
