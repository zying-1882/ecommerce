const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const auth =  require('../middleware/auth')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

//NON-ADMIN REQUESTS (VIEW ALL ITEMS, VIEW SINGLE ITEM)
router.get('/', (req, res) => {
    Item.find({}, (err, items) => {
        if(err){
            return res.status(400).json({err})
        }
        return res.json(items)
    })
    .collation({locale: "en"}).sort({name:1})
})

router.get('/:id', async (req, res) => {
    try{
        const item = await Item.findById(req.params.id)
        return res.json(item)
    } catch(e){
        return res.status(400).json(e)
    }
})

//ADMIN-REQUESTS ONLY (ADD, UPDATE, DELETE ITEM)
router.post('/', auth, (req, res) =>{
    // return res.json({details: req.user})
    if(!req.user.isAdmin){
        return res.status(401).json({msg: "You are unauthorized"})
    }

    const form = new formidable.IncomingForm()
    form.parse(req, (e, fields, files) => {
        const item = new Item(fields)
        let oldPath = files.image.path
        let newPath = path.join(__dirname, "../public") + '/' + files.image.name
        let rawData = fs.readFileSync(oldPath)
        fs.writeFileSync(newPath, rawData)
        item.image = files.image.name
        item.save()
        console.log(item)
        return res.json({msg: "Item added successfully", item})
    })
    
})

router.put("/:id", auth, async (req, res) => {
    try {
        if(!req.user.isAdmin) return res.status(401).json({ msg: "You are unauthorized "})
        const item = await Item.findById(req.params.id)
        if(!item) return res.json({msg: "Item Doesn't exist"})

        const form = new formidable.IncomingForm()  
        form.parse(req, async (e, fields, files) => {
            if(files.image.name !== '') { //IF THE ADMIN IS UPDATING THE IMAGE.
                let oldPath = files.image.path
                let newPath = path.join(__dirname, "../public") + "/" + files.image.name
                let rawData = fs.readFileSync(oldPath)
                fs.writeFileSync(newPath, rawData)
                item.image = files.image.name
            }
            await Item.updateOne({_id: req.params.id}, fields)
            await item.save()
            return res.json({ msg: "Item updated successfully"})
        })
    }catch(e) {
        return res.status(400).json({err})
    }
})
router.delete('/:id', auth, (req, res) => {
    if(!req.user.isAdmin) return res.status(401).json({ msg: "You are unauthorized" })

    Item.findOneAndDelete({_id: req.params.id}, (err, item) => {
        if(err) return res.status(400).json({err})
        return res.json({msg: "Item deleted successfully", name: item.name})
    })
})

module.exports = router