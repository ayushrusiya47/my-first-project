
const client= require('../configs/db');

exports.addNote=(req,res) => {

    const{heading ,content} =req.body;
    client.query(`INSERT INTO notes (email, heading, content) VALUES('${req.email}', '${heading}', '${content}') ;`)
    .then(() =>{
        res.status(200).json({
            message:"Note added to database successfully",
        });
    })
    .catch(() =>{
        res.status(500).json({
            error:"internal server error"
        })
    })
    // console.log(req.email);
    // res.send(req.email);
}

exports.getAllNotes=(req,res) => {
    client.query(`SELECT * FROM notes WHERE email = '${req.email}' ;`)
    .then(data => {
        const noteData = data.rows;
        const filteredData= noteData.map((note) =>{
          return{
              noteID:note.noteid,
              heading:note.heading,
              content:note.content,
          }
        }) 
        // console.log(filteredData);
        res.status(200).json({
            message:"success",
            data:filteredData,
        });
    })
}

exports.updateNote=(req,res) => {
    const noteId=req.params.noteID;
    const {heading, content}=req.body;

    client.query(`UPDATE notes SET heading='${heading}', content='${content}' WHERE noteid='${noteId}'`)
    .then(()=>{
         res.status(200).json({
             message:"success",
         })
    })
    .catch((err)=>{
        res.status(400).json({
            message:"DB server error"
        })
    })
}

exports.deleteNote=(req,res) => {
    const noteId=req.params.noteID;
    client.query(`DELETE FROM notes WHERE noteid='${noteId}'`)
    .then(()=>{
         res.status(200).json({
             msg:"success",
         })
    })
    .catch((err)=>{
        res.status(400).json({
            message:"DB server error"
        })
    })
}

