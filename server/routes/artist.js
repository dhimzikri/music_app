const router = require("express").Router();

// our artist shcema
const artist = require("../models/artist")


router.post("/save", async (req, res) => {
    // return res.json("Getting all Artist")
    const newArtist = artist(
        {
            name: req.body.name,
            imageURL: req.body.imageURL,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
        });

    try {
        const savedArtist = await newArtist.save();
        return res.status(200).send({ success: true, artist: savedArtist })
    } catch (error) {
        return res.status(400).send({ success: false, msg: error })
    }
})

router.get("/getOne/:id", async (req, res) => {
    // return res.json(req.params.id);
    const filter = { _id: req.params.id }
    const data = await artist.findOne(filter)
    if (data) {
        return res.status(200).send({ success: true, artist: data })
    } else {
        return res.status(400).send({ success: false, msg: "Data not Found ..." })
    }
})

router.get("/getAll", async (req, res)=> {
    const options = {
        sort : {
            createdAt: 1,
        }
    };

    const data = await artist.find(options);
    if (data) {
        return res.status(200).send({ success: true, artist: data })
    } else {
        return res.status(400).send({ success: false, msg: "Data not Found ..." })
    }
})


module.exports = router