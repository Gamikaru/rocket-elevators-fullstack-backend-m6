const Agent = require('../../shared/db/mongodb/schemas/agent.Schema');
const Region = require('../../shared/db/mongodb/schemas/region.Schema');
const asyncWrapper = require('../../shared/util/base');

const createRegion = asyncWrapper(async (req, res) => {
    const region = await Region.create(req.body);
    res.status(201).json({ msg: 'Region created', data: region });
});

const getRegion = asyncWrapper(async (req, res) => {
    const regionSelected = req.query.region.toLowerCase();
    const region = await Region.findOne({ region: regionSelected });
    if (!region) {
        return res.status(404).json({ msg: `No region with name ${regionSelected}` });
    }
    res.status(200).json({ region: regionSelected, data: region });
});

const getAllStars = asyncWrapper(async (req, res) => {
    const regions = ['north', 'south', 'east', 'west'];
    const results = {};

    for (const regionName of regions) {
        const topAgent = await Agent.findOne({ region: regionName }).sort({ rating: -1 });
        if (topAgent) {
            results[regionName] = topAgent;
        }
    }

    res.status(200).json(results);
});

module.exports = {
    createRegion,
    getRegion,
    getAllStars,
};
