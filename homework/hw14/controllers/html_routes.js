/****************************************************************************
 ****************************************************************************

    Initialize

*****************************************************************************
*****************************************************************************/
// Import packages
const express = require("express");
const path    = require("path");

// Create an instance of Router
const router = express.Router();

// Talk to the models
const Thread  = require(path.join(__dirname, "..", "models", "Thread.js"));
const Comment = require(path.join(__dirname, "..", "models", "Comment.js"));



/****************************************************************************
 ****************************************************************************

    Set up routes

*****************************************************************************
*****************************************************************************/
router.get("/", (req, res) => {
    res.send("index");
});


router.get("/saved", (req, res) => {
    res.send("saved");
});


module.exports = router;