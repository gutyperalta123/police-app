const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// 🔒 PERMITIR CORS SOLO DESDE TU FRONTEND EN RENDER
app.use(cors({
  origin: 'https://police-app-frontend.onrender.com',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

const objectRoutes = require('./routes/objects')
const userRoutes = require('./routes/user')

app.use('/api/objetos', objectRoutes)
app.use('/api/usuarios', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚓 Servidor iniciado en puerto ${PORT}`)
})

    crearAdminSiNoExiste()
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos:', err)
  })

const User = require('./models/User')

const crearAdminSiNoExiste = async () => {
  try {
    const admin = await User.findOne({ username: 'GustavoPeralta' })
    if (!admin) {
      const nuevoAdmin = new User({
        username: 'GustavoPeralta',
        password: 'admin123',
        role: 'admin'
      })
      await nuevoAdmin.save()
      console.log('✅ Usuario administrador "GustavoPeralta" creado automáticamente.')
    } else {
      console.log('🔒 El usuario "GustavoPeralta" ya existe.')
    }
  } catch (error) {
    console.error('❌ Error al verificar o crear el administrador:', error)
  }
}
