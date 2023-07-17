const mongoose = require('mongoose');

const companyAuthSchema = mongoose.Schema({
    company_pw: {
        type: String,
    }
})

const CompanyAuth = mongoose.model('CompanyAuth', companyAuthSchema);
module.exports = { CompanyAuth }