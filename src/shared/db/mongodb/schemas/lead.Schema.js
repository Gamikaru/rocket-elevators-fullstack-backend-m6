const mongoose = require('mongoose')

const LeadSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        // unique: true
    },

    phone: {
        type: String,
        trim: true,
        required: true
    },
    company_name: {
        type: String,
        trim: true,
        required: true
    },
    project_name: {
        type: String,
        trim: true,
        required: true
    },
    project_desc: {
        type: String,
        trim: true,
        required: true
    },
    department: {
        type: String,
        trim: true,
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    },
    file: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('Lead', LeadSchema)
