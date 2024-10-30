const Agent = require('../../shared/db/mongodb/schemas/agent.Schema');
const asyncWrapper = require('../../shared/util/base');

const emailList = asyncWrapper(async (req, res) => {
    const agents = await Agent.find({});
    const emails = agents.map(agent => agent.email);
    res.send(emails.join(', '));
});

const regionAverage = asyncWrapper(async (req, res) => {
    const region = req.query.region.toLowerCase();
    const agents = await Agent.find({ region });

    if (!agents.length) {
        res.send(`No agents in region: ${region}`);
        return;
    }

    const avgRating = agents.reduce((total, current) => total + current.rating, 0) / agents.length;
    const avgFee = agents.reduce((total, current) => total + current.fee, 0) / agents.length;

    res.send({
        region,
        average_rating: avgRating.toFixed(2),
        average_fee: avgFee.toFixed(2)
    });
});

module.exports = { emailList, regionAverage };
