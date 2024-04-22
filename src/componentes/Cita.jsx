import React, { useState } from "react";
import "../estilos/cita.css"
export default function Cita({ id,nombrePaciente, dni, fechaCita, horaCita, sintomas, generoselected, eliminarCita }) {
  function formatearFecha(fecha) {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    // Separar la cadena de fecha en día, mes y año
    const partes = fecha.split('-');
    const anio = partes[0];
    const mes = parseInt(partes[1], 10); // Convertir mes a número entero
    const dia = partes[2];
  
    // Obtener el nombre del mes en español
    const nombreMes = meses[mes - 1]; // Restar 1 porque los meses en JavaScript van de 0 a 11
  
    // Formatear la fecha como "dd de nombreDelMes de aaaa"
    return `${dia} de ${nombreMes} de ${anio}`;
  }

  return (
    <div className="contenedor-cita">
      <div className="contenedor-formulario-cita">
        <div className="contenedor-campos-cita">
          <div className="campo">
            Código: {id}
          </div>
          <div className="campo">
            Paciente: {nombrePaciente}
          </div>
          <div className="campo">
            DNI: {dni}
          </div>
          <div className="campo">
            <label htmlFor="">Síntomas</label>
            <textarea name="sintomas" rows="2" value={sintomas} readOnly></textarea>
          </div>
          <div className="campo">
            <label htmlFor="">Género</label>
            {/* <input type="text" /> */}
            <input className="" value={generoselected} readOnly/>
          </div>
          <div className="campo">
            <label htmlFor="">Fecha</label>
            <input type="text" value={formatearFecha(fechaCita)}  readOnly />
          </div>
          <div className="campo">
            <label htmlFor="">Hora</label>
            <input type="time" value={horaCita}/>
          </div>
        </div>
        <div className="enviar">
          <button class="boton-enviar" type="submit" onClick={()=>{eliminarCita(id)}}>Borrar</button>
        </div>

      </div>
    </div>

  )
};