// Importing
const express = require("express");
const router = express.Router();
const ShortUrl = require("./models");

// Shortening function
const generateShortUrl = () => {
    return Math.random().toString(36).substring(2, 8); 
};

// Shortening url POST method 
router.post("/shorten", async(req,res) => {
    const {url} = req.body;
    if (!url) {
        return res.status(400).json({ error : "URK is required. "})
    }
    try {
        const shortUrl = generateShortUrl();
        const newShortUrl = new ShortUrl({url, shortUrl});
        await newShortUrl.save();
        res.status(201).json({message : "URL shortened!", shortUrl : newShortUrl});
    } catch(error) {
        console.error("Error while shortening URL: ",error)
        res.status(500).json({error : "Failed to shorten URL. "});
    }
});

// Redirecting url GET method 
router.get("/:shortUrl", async(req,res) => {
    try{
        const shortUrlCode = req.params.shortUrl;
        const foundUrl = await ShortUrl.findOne({shortUrl : shortUrlCode});
        if (foundUrl) {
          return res.redirect(foundUrl.url);
        } else {
         return res.status(400).json({error : "Short URL not found. "});
        }
    } catch(error) {
        return res.status(500).json({error : "Failed to redirect. "});
    }
});

module.exports = router;