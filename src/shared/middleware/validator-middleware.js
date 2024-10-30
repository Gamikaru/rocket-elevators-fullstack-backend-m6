const validator = require('validator');

//validation middleware that checks if all fields are filled out and if the email and phone number are valid.
const validateContactUs = (req, res, next) => {
    const { fullname, email, phone, company_name, project_name, project_desc, department, message, file } = req.body;

    //checks if all fields are filled out
    if (validator.isEmpty(fullname) || validator.isEmpty(email) || validator.isEmpty(phone) || validator.isEmpty(company_name) || validator.isEmpty(project_name) || validator.isEmpty(project_desc) || validator.isEmpty(department) || validator.isEmpty(message) || validator.isEmpty(file)) {
        res.status(400).send('All fields are required');
        return;
    }
    //checks if the email and phone number are valid
    if (!validator.isEmail(email)) {
        res.status(400).send("Invalid email address");
        return;
    }
    //checks if the phone number is a valid US
    if (!validator.isMobilePhone(phone, 'en-US')) {
        res.status(400).send("Invalid phone number");
        return;
    }

    next();
}

//validation middleware that depending on the building type selected carries out different checks on the query parameters.
const validateQuoteCalculation = (req, res, next) => {
    const { buildingType } = req.params;
    const buildingTypeFields = {
        residential: ['floors', 'apts'],
        commercial: ['floors', 'max_occ'],
        industrial: ['elevators'],
    };

    // checks if the building type is valid
    if (!Object.keys(buildingTypeFields).includes(buildingType)) {
        res.status(400).send('Error: invalid building type');
        return;
    }

    //checks if all required fields are filled out
    const fields = buildingTypeFields[buildingType];

    for (const field of fields) {
        if (!req.query[field]) {
            res.status(400).send(`Error: ${field} is required`);
            return;
        }
    }

    //checks if the tier is valid
    if (req.query.tier) {
        const tier = req.query.tier.toLowerCase();
        if (!['standard', 'premium', 'excelium'].includes(tier)) {
            res.status(400).send('Error: invalid tier');
            return;
        }
    }

    //depending on building type, perform relevant checks. 
    if (buildingType === 'residential') {
        const floors = parseFloat(req.query.floors);
        const apts = parseFloat(req.query.apts);

        if (!Number.isInteger(floors) || !Number.isInteger(apts)) {
            res.status(400).send(`Error: apts and floors must be integers`);
            return;
        }

        if (floors < 1 || apts < 1) {
            res.status(400).send(`Error: apts and floors must be greater than zero`);
            return;
        }
    }
    //checks if the floors and max_occ are integers and greater than zero
    else if (buildingType === 'commercial') {
        const floors = parseFloat(req.query.floors);
        const max_occ = parseFloat(req.query.max_occ);

        if (!Number.isInteger(floors) || !Number.isInteger(max_occ)) {
            res.status(400).send(`Error: floors and max_occ must be integers`);
            return;
        }

        if (floors < 1 || max_occ < 1) {
            res.status(400).send(`Error: floors and max_occ must be greater than zero`);
            return;
        }
    }
    //checks if the elevators are integers and greater than zero
    else if (buildingType === 'industrial') {
        const elevators = parseFloat(req.query.elevators);


        if (!Number.isInteger(elevators)) {
            res.status(400).send(`Error: elevators must be an integer`);
            return;
        }

        if (elevators < 1) {
            res.status(400).send(`Error: elevators must be greater than zero`);
            return;
        }
    };



    next();
}

// Validation middleware to check for a valid region
const validateRegion = (req, res, next) => {
    const allowedRegions = ['north', 'south', 'east', 'west', 'all'];
    const { region } = req.query;

    if (!region || allowedRegions.includes(region.toLowerCase())) {
        next();
    } else {
        res.status(400).send({ error: 'Invalid region specified' });
    }
};



module.exports = { validateContactUs, validateQuoteCalculation, validateRegion };

