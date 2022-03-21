const express = require("express");
const { count } = require("../model/userScheme");
const router = express.Router();

require("../db/db");

const User = require("../model/userScheme");

var limit = 8;
var skip = limit;
// console.log('====================================');
// console.log(skip);
// console.log('====================================');

router.get("/", function (req, res) {
    res.send("HEYY THERE")
})

router.post('/upload', async (req, res) => {
    const { title, description, thumbnail, video } = req.body;
    const like = 0;

    if (!title || !thumbnail || !video || !description) {
        return res.status(422).json({ errors: "Plz fill the input..." });
    }

    try {
        const titleExist = await User.findOne({ title: title });

        if (titleExist) {
            return res.status(422).json({ error: "Title Already Exist" });
        } else {
            const createdAt = new Date().toISOString();
            const user = new User({ title, description, thumbnail, video, like, createdAt });
            await user.save();
            res.status(201).json({ message: "Video Added..." });
            limit = skip;
        }
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
})

router.get('/video', async (req, res) => {
    limit = 8;
    console.log("Limit is: " + limit);
    try {
        const videoData = await User.find().limit(limit);
        res.status(200).send({ data: videoData });
        skip = 8;
    } catch (error) {
        console.log(error);
    }
})

router.get('/more', async (req, res) => {
    try {
        const videoData = await User.find().skip(skip).limit(limit);
        res.status(200).send({ data: videoData });
        skip = skip + 8;
        // console.log(skip);
    } catch (error) {
        console.log(error);
    }
})

router.post('/watch', async (req, res) => {
    try {
        const { id } = req.body

        if (!id) {
            return res.status(422).json({ error: "Id not get!!!!" });
        } else {
            const userResult = await User.findOne({ _id: id });
            res.status(200).json({ userResult })
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/update', async (req, res) => {
    try {
        const { id, count, status } = req.body;
        var operation;

        if (!status) {
            operation = count + 1;
        }else{
            operation = count - 1;
        }

        if (count < 0) {
            return res.status(422).json({ error: "Count not get!!!!" });
        } else {
            await User.findByIdAndUpdate(id, { like: (operation) } , {new: true}, function async (err, doc) {
                if (err) {
                    console.log("Something wrong when updating data!");
                }else{
                    res.status(200).json({ doc });
                }                
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
