const mongoose = require('mongoose');
const { Schema } = mongoose;

const InsuranceSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    insuranceType:{
        type: String,
        enum: { values: ['Auto Insurance', 'Home Insurance', 'Life Insurance', 'Health Insurance', 'Other'] },
        required: true
    },

    otherInsuranceType:{
        type: String,
        required: function () { return this.insuranceType === 'Other' }
    },

    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    dateOfBirth:{
        type: Date,
        required: true
    },

    zipCode:{
        type: String,
        required: true
    },

    carMake:{
        type: String,
        enum: { values: ['Toyota', 'Honda', 'Ford', 'Maruti', 'Audi', 'Mercedes', 'BMW', 'Mahindra', 'Other'] },
        required: function () { return this.insuranceType === 'Auto Insurance' }
    },

    otherCarMake:{
        type: String,
        required: function () { return (this.carMake === 'Other' && this.insuranceType === 'Auto Insurance') }
    },

    carModel:{
        type: String,
        required: function () { return this.insuranceType === 'Auto Insurance' }
    },

    carYear:{
        type: Number,
        required: function () { return this.insuranceType === 'Auto Insurance' }
    },

    drivingHistory:{
        type: String,
        enum: { values: ['Clean driving record', 'One minor accident in the past 3 years', 'Multiple accidents or violations in the past 3 years'] },
        required: function () { return this.insuranceType === 'Auto Insurance' }
    },

    propertyType:{
        type: String,
        enum: { values: ['Single Family Home', 'Condo', 'Apartment', 'Townhouse', 'Mobile Home', 'Other'] },
        required: function () { return this.insuranceType === 'Home Insurance' }
    },

    otherPropertyType:{
        type: String,
        required: function () { return (this.propertyType === 'Other' && this.insuranceType === 'Home Insurance') }
    },

    propertyValue:{
        type: Number,
        required: function () { return this.insuranceType === 'Home Insurance' },
        min: 0
    },

    yearBuilt:{
        type: Number,
        required: function () { return this.insuranceType === 'Home Insurance' }
    },

    smokerStatus:{
        type: String,
        enum: { values: ['Yes', 'No'] },
        required: function () { return this.insuranceType === 'Life Insurance' }
    },

    anyHealthConditions:{
        type: String,
        enum: { values: ['Yes', 'No'] },
        required: function () { return (this.insuranceType === 'Health Insurance' || this.insuranceType === 'Life Insurance') }
    },

    healthConditions:{
        type: String,
        required: function () { return (this.anyHealthConditions === 'Yes' && (this.insuranceType === 'Health Insurance' || this.insuranceType === 'Life Insurance')) }
    },

    coverageType:{
        type: String,
        enum: { values: ['Basic Coverage', 'Standard Coverage', 'Full Coverage'] },
        required: true,
    },

    coverageAmount:{
        type: Number,
        required: true,
        min:0
    },

    deductiblePreferance:{
        type: Number,
        enum: { values: [500, 1000, 1500, 2000] },
        required: true,
        min:500
    },

    additionalCoverageOptions:{
        type: Map,
        of: String
    },

    TimeStamp:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('web_user_policies', InsuranceSchema);