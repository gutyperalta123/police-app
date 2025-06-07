








import React, { useState } from 'react'
import axios from 'axios'

const FormularioAgregarObjeto = () => {
  const [formulario, setFormulario] = useState({
    comisaria: '',
    tipo: '',
    numero_serie: '',
    marca: '',
    modelo: '',
    color: '',
    numero_motor: '',
    numero_cuadro: '',
    numero_dominio: '',
    caracteristicas: '',
    denunciante: '',
    dni_denunciante: '',
    fiscal: '',
    descripcion: ''
  })

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5000/api/objetos', formulario, {
        headers: { Authorization: token }
      })
      alert('Objeto registrado correctamente')
    } catch {
      alert('Error al registrar el objeto')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md max-w-lg mx-auto mt-6">
      <h2 className="text-lg font-bold mb-4">Agregar objeto</h2>

      <input name="comisaria" placeholder="Comisaría interviniente" onChange={handleChange} className="border p-2 w-full" />
      <input name="tipo" placeholder="Tipo" onChange={handleChange} className="border p-2 w-full" />
      <input name="numero_serie" placeholder="Número de serie / IMEI" onChange={handleChange} className="border p-2 w-full" />
      <input name="marca" placeholder="Marca" onChange={handleChange} className="border p-2 w-full" />
      <input name="modelo" placeholder="Modelo" onChange={handleChange} className="border p-2 w-full" />
      <input name="color" placeholder="Color" onChange={handleChange} className="border p-2 w-full" />
      <input name="numero_motor" placeholder="Número de motor" onChange={handleChange} className="border p-2 w-full" />
      <input name="numero_cuadro" placeholder="Número de cuadro" onChange={handleChange} className="border p-2 w-full" />
      <input name="numero_dominio" placeholder="Número de dominio / patente" onChange={handleChange} className="border p-2 w-full" />
      <input name="caracteristicas" placeholder="Características particulares" onChange={handleChange} className="border p-2 w-full" />
      <input name="denunciante" placeholder="Denunciante" onChange={handleChange} className="border p-2 w-full" />
      <input name="dni_denunciante" placeholder="DNI del denunciante" onChange={handleChange} className="border p-2 w-full" />
      <input name="fiscal" placeholder="Fiscal interviniente" onChange={handleChange} className="border p-2 w-full" />
      <textarea name="descripcion" placeholder="Descripción del hecho" onChange={handleChange} className="border p-2 w-full" rows="3" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Registrar objeto
      </button>
    </form>
  )
}

export default FormularioAgregarObjeto
