




import React, { useState } from 'react'
import axios from 'axios'

const CreateUser = ({ token }) => {
  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/usuarios/create', form, {
        headers: { Authorization: token }
      })
      alert('Usuario creado correctamente')
    } catch {
      alert('Error al crear usuario')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <h2 className="text-lg font-bold">Crear nuevo usuario</h2>
      <input name="username" onChange={handleChange} placeholder="Nuevo usuario" className="border p-1 w-full" />
      <input name="password" type="password" onChange={handleChange} placeholder="Contraseña" className="border p-1 w-full" />
      <button className="bg-green-500 text-white px-3 py-1 rounded">Crear usuario</button>
    </form>
  )
}

export default CreateUser
