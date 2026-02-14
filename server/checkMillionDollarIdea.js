const checkMillionDollarIdea = (req, res, next) => {
    const ideaWeeks = Number(req.body.numWeeks);
    const ideaWeeklyRevenue = Number(req.body.weeklyRevenue);
    const ideaRevenue = ideaWeeklyRevenue * ideaWeeks;

    if (!ideaRevenue || ideaRevenue < 1000000) {
        res.status(400).send('Not a profitable idea request');
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
