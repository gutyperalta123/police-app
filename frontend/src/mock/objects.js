



const express = require('express')
const router = express.Router()
const { verifyToken, isAdmin } = require('../middleware/auth')
const ObjectItem = require('../models/ObjectItem')

// ejemplo de ruta GET si ya la tenés
router.get('/', verifyToken, async (req, res) => {
  try {
    const objects = await ObjectItem.find()
    res.status(200).json(objects)
  } catch (err) {
    res.status(500).json({ message: 'error al obtener los objetos' })
  }
})

// esta es la que tenías que agregar en el paso 3
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await ObjectItem.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'objeto eliminado correctamente' })
  } catch (err) {
    res.status(500).json({ message: 'error al eliminar el objeto' })
  }
})

module.exports = router
