//1

const express = require('express');
const router = express.Router();
const docModel = require('../models/Doctor');

//Add doctor
router.post('/', async(req,res)=>{
  try{
    await docModel(req.body).save()
    res.send({message: "Data added successfully"})
  } catch (error) {
    console.log(error)
  }
})

//get all doctor
router.get('/', async (req, res) => {
  try {
    const doctors = await docModel.find();
    res.send(doctors);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
})


//Delete
router.delete('/:id', async (req, res) => {
  try {
    await docModel.findByIdAndDelete(req.params.id);
    res.send({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
})

//update
router.put('/:id', async (req, res) => {
  try {
    await docModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Doctor updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating doctor', error: err.message });
  }
})




module.exports = router;
