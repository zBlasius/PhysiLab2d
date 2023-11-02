import express from 'express';
import cors from 'cors';
const router = express();
router.use(express.json());
router.use(cors());
import fs from "fs";


router.get('/get_all_info', (req,res)=>{
  try {
    const exerciseData = JSON.parse(fs.readFileSync("./database/exercises.json"))
    const subjectsData = JSON.parse(fs.readFileSync("./database/subjects.json"))
    return res.json({exerciseData, subjectsData});
  } catch (error) {
    return res.status(400).json({error: error, message: ""})
  }
})

router.get('/get_all_subjects', (req,res)=>{
  try {
    
    return res.json(exerciseData);
  } catch (error) {
    return res.status(400).json({error: error, message: ""})
  }
})


router.listen(8000, () => {
  console.log('Server started on port 8000');
});
