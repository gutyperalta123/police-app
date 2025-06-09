const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const objectRoutes = require('./routes/objects')
const userRoutes = require('./routes/user')

app.use('/api/objetos', objectRoutes)
app.use('/api/usuarios', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('🚓 Servidor iniciado en puerto 5000')
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
