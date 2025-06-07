

import React, { useState } from 'react';
import axios from 'axios';

const DenunciaForm = () => {
  const [item, setItem] = useState({
    station: '',
    serial: '',
    imei: '',
    engineNumber: '',
    frameNumber: '',
    plateNumber: '',
    color: '',
    features: '',
    dni: '',
    complainant: '',
    description: '',
    prosecutor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/denuncias', item);
      console.log(response.data);
      // Puedes agregar una notificación de éxito aquí
    } catch (error) {
      console.error('Error al enviar la denuncia:', error);
      // Puedes agregar una notificación de error aquí
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="station" placeholder="Comisaría" onChange={handleChange} required />
      <input name="serial" placeholder="Número de serie" onChange={handleChange} />
      <input name="imei" placeholder="IMEI" onChange={handleChange} />
      <input name="engineNumber" placeholder="Número de motor" onChange={handleChange} />
      <input name="frameNumber" placeholder="Número de cuadro" onChange={handleChange} />
      <input name="plateNumber" placeholder="Número de patente" onChange={handleChange} />
      <input name="color" placeholder="Color" onChange={handleChange} />
      <input name="features" placeholder="Características" onChange={handleChange} />
      <input name="dni" placeholder="DNI del denunciante" onChange={handleChange} required />
      <input name="complainant" placeholder="Denunciante" onChange={handleChange} required />
      <textarea name="description" placeholder="Descripción" onChange={handleChange} />
      <input name="prosecutor" placeholder="Fiscal" onChange={handleChange} />

      <button type="submit">Enviar Denuncia</button>
    </form>
  );
};

export default DenunciaForm;