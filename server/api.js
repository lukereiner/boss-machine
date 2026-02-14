const express = require('express');
const apiRouter = express.Router();

// Minions router
const minionsRouter = express.Router();
apiRouter.use('/minions', minionsRouter)

// Ideas router
const ideasRouter = express.Router();
apiRouter.use('/ideas', ideasRouter);

// Meetings router
const meetingsRouter = express.Router();
apiRouter.use('/meetings', meetingsRouter);

apiRouter.get('/', (req, res, next) => {
    res.send('Hello from the api!')
    next()
})

apiRouter.get('/bold', (req, res, next) => {
    res.send('This is another text response')
})

module.exports = apiRouter;
