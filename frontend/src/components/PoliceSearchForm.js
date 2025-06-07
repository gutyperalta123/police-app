




import React, { useState } from 'react'
import axios from 'axios'

const PoliceSearchForm = ({ token, currentUser }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [criterios, setCriterios] = useState({
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
  const [resultados, setResultados] = useState([])

  const handleChange = e => {
    setCriterios({ ...criterios, [e.target.name]: e.target.value })
  }

  const buscarObjetos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/objetos', {
        headers: { Authorization: token }
      })

      const filtrados = res.data.filter(obj => {
        return Object.entries(criterios).every(([key, value]) => {
          return value === '' || (obj[key] && obj[key].toLowerCase().includes(value.toLowerCase()))
        })
      })

      setResultados(filtrados)
    } catch {
      alert('Error al buscar objetos')
    }
  }

  const eliminarObjeto = async id => {
    if (window.confirm('¿Eliminar este objeto?')) {
      await axios.delete(`http://localhost:5000/api/objetos/${id}`, {
        headers: { Authorization: token }
      })
      setResultados(resultados.filter(obj => obj._id !== id))
    }
  }

  return (
    <div className="mt-8 bg-white p-4 rounded shadow-md max-w-5xl mx-auto">
      <h2 className="text-lg font-bold mb-4">Buscar objeto</h2>

      {!mostrarFormulario ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setMostrarFormulario(true)}
        >
          Buscar objeto
        </button>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
            <input name="descripcion" placeholder="Descripción del hecho" onChange={handleChange} className="border p-2 w-full" />
          </div>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded mb-6"
            onClick={buscarObjetos}
          >
            Buscar
          </button>

          {resultados.length > 0 && (
            <div>
              <h3 className="text-md font-semibold mb-2">Resultados encontrados:</h3>
              <ul className="space-y-2">
                {resultados.map(obj => (
                  <li key={obj._id} className="border p-3 rounded bg-gray-100">
                    <p><strong>Comisaría:</strong> {obj.comisaria}</p>
                    <p><strong>Tipo:</strong> {obj.tipo}</p>
                    <p><strong>Número de serie / IMEI:</strong> {obj.numero_serie}</p>
                    <p><strong>Marca:</strong> {obj.marca}</p>
                    <p><strong>Modelo:</strong> {obj.modelo}</p>
                    <p><strong>Color:</strong> {obj.color}</p>
                    <p><strong>Número de motor:</strong> {obj.numero_motor}</p>
                    <p><strong>Número de cuadro:</strong> {obj.numero_cuadro}</p>
                    <p><strong>Dominio:</strong> {obj.numero_dominio}</p>
                    <p><strong>Características:</strong> {obj.caracteristicas}</p>
                    <p><strong>Denunciante:</strong> {obj.denunciante}</p>
                    <p><strong>DNI denunciante:</strong> {obj.dni_denunciante}</p>
                    <p><strong>Fiscal:</strong> {obj.fiscal}</p>
                    <p><strong>Descripción:</strong> {obj.descripcion}</p>

                    {currentUser === 'GustavoPeralta' && (
                      <button onClick={() => eliminarObjeto(obj._id)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">
                        Eliminar
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PoliceSearchForm
