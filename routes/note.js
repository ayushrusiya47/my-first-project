const express=require('express');
const {verifyToken}=require('../middlewares/authMiddleware');
const router=express.Router();
const {addNote, getAllNotes,updateNote,deleteNote}=require('../controllers/note');

router.post("/add",verifyToken,addNote);
router.post("/getAllNotes",verifyToken,getAllNotes);
router.put("/updateNote/:noteID",verifyToken,updateNote);
router.put("/deleteNote/:noteID",verifyToken,deleteNote);
module.exports=router;