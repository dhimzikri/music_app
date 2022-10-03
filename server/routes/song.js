const router = require("express").Router();
const song = require("../models/song")

router.post("/save", async (req, res)=> {
    const newSong = song(
        {
            tittle: req.body.tittle,
            imageURL: req.body.imageURL,
            songURL: req.body.songURL,
            artist: req.body.artist,
            album: req.body.album,
            category: req.body.category,
        });

        try {
            const savedSong = await newSong.save();
            return res.status(200).send({success: true, song: savedSong})
        } catch (error) {
            return res.status(400).send({success: false, msg: error})
        }
})

router.get("/getAll", async (req, res) => {
    // return res.json("Getting all Songs")
    const options = {
        sort: {
            createdAt :1,
        }
    }

    const data = await song.find(options);
    if (data) {
        return res.status(200).send({success : true, song: data})
    }else{
        return res.status(400).send({success: false, msg:"Data not found ..."})
    }
})

router.get("/getOne/:id", async(req, res)=> {
    const filter = {_id: req.params.id}
    const data = await song.findOne(filter)
    if (data) {
        return res.status(200).send({success: true, song: data})
    }else {
        return res.status(400).send({success: false, msg: "Song not Found ..."})
    }
})

router.put("/update/:id", async (req, res)=> {
    const filter = {_id: req.params.id};
    const option = {
        upsert : true,
        new: true,
    }
    try {
        const result = await song.findOneAndUpdate(filter, {
            tittle: req.body.tittle,
            imageURL: req.body.imageURL,
            songURL: req.body.songURL,
            artist: req.body.artist,
            album: req.body.album,
            category: req.body.category,
        }, option)
        return res.status(200).send({success: true, data: result})
    } catch (error) {
        return res.status(400).send({success: false, msg: error})
    }
})

router.delete("/delete/:id", async (req, res)=> {
    const filter = {_id:req.params.id}
    const result = await song.deleteOne(filter);
    if (result) {
        return res.status(200).send({success: true, msg :"Song Deleted ..."})
    } else {
        return res.status(400).send({success: false, msg: "Songs data not Found ..."})
    }
})

module.exports = router