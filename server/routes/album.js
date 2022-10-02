const router = require("express").Router();
const album = require("../models/album")

router.post("/save", async (req, res) => {
    // return res.json("Getting all Album")
    const newAlbum = album(
        {
            name: req.body.name,
            imageURL: req.body.imageURL,
            year : req.body.year,
        });

    try {
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({ success: true, album: savedAlbum })
    } catch (error) {
        return res.status(400).send({ success: false, msg: error })
    }
})

router.get("/getAll", async (req, res) => {
    const options = {
        sort: {
            createdAt: 1,
        }
    };

    const data = await album.find(options);
    if (data) {
        return res.status(200).send({ success: true, album: data })
    } else {
        return res.status(400).send({ success: false, msg: "Data not Found ..." })
    }
})

router.get("/getOne/:id", async (req, res)=> {
    const filter = {_id: req.params.id}
    const data = await album.findOne(filter)
    if (data) {
        return res.status(200).send({success : true, album: data})
    }else{
        return res.status(400).send({success: false, msg : "Album Not Found ..."})
    }
})

router.put("/update/:id", async(req,res) => {
    const filter = {_id: req.params.id};
    const option = {
        upsert: true,
        new: true,
    }
    
    try {
        const result = await album.findOneAndUpdate(filter,{

        })
    } catch (error) {
        
    }
})

router.delete("/delete/:id", async (req, res) =>{
    const filter = {_id: req.params.id}
    const result = await album.deleteOne(filter);
    if (result) {
        return res.status(200).send({success: true, msg:"Album Deleted ..."})
    }else{
        return res.status(400).send({success: false, msg: "Data Not Found"})
    }
})


module.exports = router