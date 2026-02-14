const express = require("express");
const {
  getAllFromDatabase,
  createMinion,
  getFromDatabaseById,
} = require("./db");
const apiRouter = express.Router();

// Minions router
const minionsRouter = express.Router();
apiRouter.use("/minions", minionsRouter);

// Ideas router
const ideasRouter = express.Router();
apiRouter.use("/ideas", ideasRouter);

// Meetings router
const meetingsRouter = express.Router();
apiRouter.use("/meetings", meetingsRouter);

// Middleware
// Minion ID
minionsRouter.param("minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const findMinionId = getFromDatabaseById("minions", minionId);
  if (findMinionId) {
    req.minion = findMinionId;
    next();
  } else {
    res.status(404).send("No minion for that ID");
  }
});

// MINIONS ROUTES
minionsRouter.get("/", (req, res, next) => {
  const minionsDb = getAllFromDatabase("minions");
  res.send(minionsDb);
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = createMinion();
  res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.status(200).send(req.minion);
});



module.exports = apiRouter;
