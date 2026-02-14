const express = require("express");
const {
  getAllFromDatabase,
  createMinion,
  createIdea,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
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

// Middleware //
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

// Idea ID
ideasRouter.param('ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const findIdeaId = getFromDatabaseById('ideas', ideaId);
    if (findIdeaId) {
        req.idea = findIdeaId;
        next();
    } else {
        res.status(404).send('No idea for that ID');
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

minionsRouter.get("/:minionId", (req, res, next) => {
  res.status(200).send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updatedData = {...req.minion, ...req.body};
  const updatedMinion = updateInstanceInDatabase("minions", updatedData);
  if (!updatedMinion) {
    res.status(400).send("Data is invalid");
  } else {
    res.status(200).send(updatedMinion);
  }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionToDelete = deleteFromDatabasebyId('minions', req.minion.id);
    if (!minionToDelete) {
        res.status(404).send('Minion is invalid');
    } else {
        res.status(204).send();
    }
})

// IDEAS ROUTES
ideasRouter.get('/', (req, res) => {
    const ideasDb = getAllFromDatabase('ideas');
    res.send(ideasDb);
});

ideasRouter.post('/', (req, res) => {
    const newIdea = createIdea();
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res) => {
    res.status(200).send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res) => {
    const updatedData = {...req.idea, ...req.body};
    const updatedIdea = updateInstanceInDatabase('ideas', updatedData);
    if (!updatedIdea) {
        res.status(400).send('Idea is invalid');
    } else {
        res.status(200).send(updatedIdea);
    }
});

ideasRouter.delete('/:ideaId', (req, res) => {
    const ideaToDelete = deleteFromDatabasebyId('ideas', req.idea.id);
    if (!ideaToDelete) {
        res.status(404).send('Idea is invalid');
    } else {
        res.status(204).send();
    }
});

module.exports = apiRouter;
