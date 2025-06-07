


import React, { useState } from 'react'
import axios from 'axios'

const Login = ({ setToken, setUsername }) => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [showRegister, setShowRegister] = useState(false)
  const [newUser, setNewUser] = useState({ nombre: '', username: '', password: '' })

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/usuarios/login', formData)
      const token = res.data.token
      const payload = JSON.parse(atob(token.split('.')[1]))
      localStorage.setItem('token', token)
      localStorage.setItem('username', payload.username)
      setToken(token)
      setUsername(payload.username)
      alert('Inicio de sesión exitoso')
    } catch (err) {
      alert('Error al iniciar sesión')
    }
  }

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/usuarios/create', {
        username: newUser.username,
        password: newUser.password
      })
      alert('Usuario registrado correctamente')
      setShowRegister(false)
    } catch (err) {
      alert('Error al registrar usuario')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        {!showRegister ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl font-bold text-center">Iniciar sesión</h2>
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="border p-2 w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="border p-2 w-full"
            />
            <button
              type="submit"
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              Ingresar
            </button>
            <button
              type="button"
              className="text-sm text-blue-600 underline block text-center"
              onClick={() => setShowRegister(true)}
            >
              ¿No tenés cuenta? Registrate
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Crear cuenta</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre y apellido"
              value={newUser.nombre}
              onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="border p-2 w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border p-2 w-full"
            />
            <button
              className="bg-green-600 text-white w-full py-2 rounded"
              onClick={handleRegister}
            >
              Registrarme
            </button>
            <button
              type="button"
              className="text-sm text-gray-600 underline block text-center"
              onClick={() => setShowRegister(false)}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
