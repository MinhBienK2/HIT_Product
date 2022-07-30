const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { protect, restrict } = require("../../middlewares/auth.middleware");

//CRUD
router.use(protect);

router 
    .route('/')
    .get((req,res,next) => {
        res.status(200).json({
            uuid : uuidv4()
        })
    })

module.exports = router;
