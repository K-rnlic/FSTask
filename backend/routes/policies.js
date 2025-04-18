const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy.js');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser.js');

//Fetching Policies Route
router.get('/fetchallpolicies', fetchUser, async (req, res)=>{
    try {
        const policies = await Policy.find({user: req.user.id});
        res.json(policies);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Adding a Policy Route
router.post('/addpolicy', fetchUser, [
    body('insuranceType').isIn(['Auto Insurance', 'Home Insurance', 'Life Insurance', 'Health Insurance', 'Other']).withMessage('Choose a valid insurance type'),
    body('firstName', 'Enter a valid First Name').isLength({ min: 3 }),
    body('lastName', 'Enter a valid Last Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('dateOfBirth', 'Enter a valid Date of Birth').isISO8601(),
    body('zipCode', 'Enter a valid 6-digit Zip Code').isLength({ min: 6, max: 6 }),
    body('coverageAmount', 'Enter a valid Coverage Amount').isNumeric(),
    body('deductiblePreferance', 'Enter a valid Deductible Amount').isNumeric(),
 ], async (req, res) => {
    const errors = validationResult(req);
    let customErrors = [];
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        insuranceType,
        carMake,
        carModel,
        carYear,
        drivingHistory,
        propertyType,
        propertyValue,
        yearBuilt,
        smokerStatus,
        anyHealthConditions,
        healthConditions,
        otherInsuranceType,
        otherCarMake,
        otherPropertyType
    } = req.body;
    // Conditional validations
    if (insuranceType === 'Auto Insurance') {
        if (!carMake) customErrors.push({ msg: 'Car make is required', param: 'carMake' });
        if (carMake === 'Other' && (!otherCarMake || otherCarMake === "")) customErrors.push({ msg: 'Specify other car make', param: 'otherCarMake' });
        if (!carModel) customErrors.push({ msg: 'Car model is required', param: 'carModel' });
        if (!carYear) customErrors.push({ msg: 'Car year is required', param: 'carYear' });
        if (!drivingHistory) customErrors.push({ msg: 'Driving history is required', param: 'drivingHistory' });
    }
    if (insuranceType === 'Home Insurance') {
        if (!propertyType) customErrors.push({ msg: 'Property type is required', param: 'propertyType' });
        if (propertyType === 'Other' && (!otherPropertyType || otherPropertyType === "")) customErrors.push({ msg: 'Specify other property type', param: 'otherPropertyType' });
        if (!propertyValue || propertyValue === 0) customErrors.push({ msg: 'Property value is required', param: 'propertyValue' });
        if (!yearBuilt) customErrors.push({ msg: 'Year built is required', param: 'yearBuilt' });
    }
    if (insuranceType === 'Life Insurance' || insuranceType === 'Health Insurance') {
        if (!anyHealthConditions) customErrors.push({ msg: 'Specify if there are any health conditions', param: 'anyHealthConditions' });
        if (anyHealthConditions === 'Yes' && (!healthConditions || healthConditions === "")) {
            customErrors.push({ msg: 'Health conditions details required', param: 'healthConditions' });
        }
    }
    if (insuranceType === 'Life Insurance' && !smokerStatus) {
        customErrors.push({ msg: 'Smoker status is required', param: 'smokerStatus' });
    }
    if (insuranceType === 'Other' && (!otherInsuranceType || otherInsuranceType === "")) {
        customErrors.push({ msg: 'Specify other insurance type', param: 'otherInsuranceType' });
    }
    if (customErrors.length > 0) {
        return res.status(400).json({ errors: customErrors });
    }
    try {
        const policy = new Policy({
            user: req.user.id,
            ...req.body
        });
        const savedPolicy = await policy.save();
        res.json(savedPolicy);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
 });

module.exports = router;