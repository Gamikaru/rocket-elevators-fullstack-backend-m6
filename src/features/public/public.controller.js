const Lead = require('../../shared/db/mongodb/schemas/lead.Schema');
const Data = require('../../shared/resources/data');
const asyncWrapper = require('../../shared/util/base');

const contactUs = asyncWrapper(async (req, res) => {
    const lead = new Lead({
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        company_name: req.body.company_name,
        project_name: req.body.project_name,
        project_desc: req.body.project_desc,
        department: req.body.department,
        message: req.body.message,
        file: req.body.file
    });

    try {
        await lead.save();
        const responseMessage = `Message received from ${lead.fullname}`;
        console.log(responseMessage);
        res.status(200).send('Thank you for contacting us!');
    } catch (err) {
        console.log(err);
        res.status(500).send(`Error: ${err.message}`);
    }
});

const calculateQuote = asyncWrapper(async (req, res) => {
    const buildingType = req.params.buildingType.toLowerCase();
    const tier = req.query.tier.toLowerCase();

    let numElevators;
    let totalCost;

    if (buildingType === 'residential') {
        const numFloors = parseInt(req.query.floors, 10);
        const numApts = parseInt(req.query.apts, 10);
        numElevators = calcResidentialElev(numFloors, numApts);
    } else if (buildingType === 'commercial') {
        const numFloors = parseInt(req.query.floors, 10);
        const maxOccupancy = parseInt(req.query.max_occ, 10);
        numElevators = calcCommercialElev(numFloors, maxOccupancy);
    } else if (buildingType === 'industrial') {
        numElevators = parseInt(req.query.elevators, 10);
    } else {
        return res.status(400).send('Invalid building type');
    }

    totalCost = calcInstallFee(numElevators, tier);

    res.send({
        elevators_required: numElevators,
        cost: totalCost.toFixed(2)
    });
});

const calcResidentialElev = (numFloors, numApts) => {
    const avgAptsPerFloor = numApts / numFloors;
    const elevatorsPerColumn = Math.ceil(avgAptsPerFloor / 6);
    const numColumns = Math.ceil(numFloors / 20);
    const elevatorsRequired = elevatorsPerColumn * numColumns;
    return elevatorsRequired;
};

const calcCommercialElev = (numFloors, maxOccupancy) => {
    const totalOccupants = maxOccupancy * numFloors;
    const elevatorsRequired = Math.ceil(totalOccupants / 200);
    const numColumns = Math.ceil(numFloors / 10);
    const elevatorsPerColumn = Math.ceil(elevatorsRequired / numColumns);
    const totalElevators = elevatorsPerColumn * numColumns;
    return totalElevators;
};

const calcInstallFee = (numElvs, tier) => {
    const unitPrice = Data.unitPrices[tier];
    const installPercentFees = Data.installPercentFees[tier] / 100;
    const elevatorTotalPrice = numElvs * unitPrice;
    const installationFees = elevatorTotalPrice * installPercentFees;
    const total = elevatorTotalPrice + installationFees;
    return total;
};

module.exports = { contactUs, calculateQuote };
