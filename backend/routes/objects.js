const express = require('express')
const router = express.Router()
const ObjectItem = require('../models/ObjectItem')
const { verifyToken, isAdmin } = require('../middleware/auth')

router.post('/', verifyToken, async (req, res) => {
  try {
    const newItem = new ObjectItem(req.body)
    await newItem.save()
    res.status(201).json(newItem)
  } catch (err) {
    res.status(500).json({ message: 'error al agregar el objeto' })
  }
})

router.get('/', verifyToken, async (req, res) => {
  try {
    const items = await ObjectItem.find()
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ message: 'error al obtener objetos' })
  }
})

router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await ObjectItem.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'objeto eliminado correctamente' })
  } catch (err) {
    res.status(500).json({ message: 'error al eliminar el objeto' })
  }
})

module.exports = router
