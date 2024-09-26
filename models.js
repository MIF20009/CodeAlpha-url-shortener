// Import mongoose 
const mongoose = require("mongoose");

// Create schema 
const shortUrlSchema = new mongoose.Schema({
    url : { type: String, required: true},
    shortUrl : { type: String, required : true, unique: true}
});

// Create mongoose model, equivalent to a collection in MongoDB
const ShortUrl = mongoose.model("ShortUrl",shortUrlSchema);

// Export to import in other files 
module.exports = ShortUrl ;