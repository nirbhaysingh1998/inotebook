const express= require('express');
const router= express.Router()
var fetchuser = require('../middleware/fetchuser');
const Note= require('../models/Note');
const { body, validationResult } = require('express-validator');
// route 1 get all the notes of the logged in user /// loggin required

router.get('/fetchallnotes',fetchuser,async(req, res)=>{
    try {
        const notes  = await Note.find({user:req.user.id});
    res.json(notes)
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Inter server Error ");
}
    

})
//  route 2 add a new note of the user using post
router.post('/addnotes',fetchuser,[
    body('title', 'enter a valid title').isLength({min:3}),
    body('description', 'Description should be atleast 5').isLength({min:5}),],async(req, res)=>{
        try{
    const {title,description,tag,}=req.body;
        
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
             const note = new Note({
                title,description,tag,user:req.user.id
             })   
        const savednote= await note.save();
        
        res.json(savednote)
    }

    catch(error){
        console.error(error.message);
    res.status(500).send("Inter server Error ");

    }
    })
// route number 3 to update note loggin required also need note id
// fetch user authenciate the user with the token
// nownote a note object create karega jo baad me ja update kar denge

router.put('/updatenote/:id',fetchuser,async(req, res)=>{
const {title,description,tag}= req.body;
try{
// create a new note on=bject
const newNote ={};
if(title){newNote.title=title};
if(description){newNote.description=description};
if(tag){newNote.tag=tag};

// find the note to be update and update it

let note=await Note.findById(req.params.id);
if(!note){return res.status(404).send("note found")
}
// will check if the user id match with notes id
if(note.user.toString()!== req.user.id){
return res.status(401).send("not allowed");
}
note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
res.json({note});
}
catch(error){
    console.error(error.message);
res.status(500).send("Inter server Error ");

}
})

//route 4 to delete notes from db need loggin also id of the note  using delete request  /api/notes/deletenote


router.delete('/deletenote/:id',fetchuser,async(req, res)=>{
    // create a new note on=bject
   try{ 
    // find the note to be deleted and delete it
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("not found")
    }
    // allow usser to delete if the user is authencicated
    if(note.user.toString()!== req.user.id){
    return res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id)
   
    res.json({"success":" note has been deleted", note :note});
}
catch(error){
    console.error(error.message);
res.status(500).send("Inter server Error ");

}
    })

module.exports= router