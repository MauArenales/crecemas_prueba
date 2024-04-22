import React from "react";
import { useState } from 'react';
import "../estilos/formularioCita.css"
import Cita from "./Cita.jsx"
import { Toaster, toast } from "sonner";
import { BiTrash } from "react-icons/bi";

// Configurar el Toaster con opciones personalizadas

export default function FormularioCita() {
  const fechaActual = new Date().toISOString().split('T')[0];
  const [generoselected, setGeneroSelected] = useState('Ninguno');
  const [dni, setDni] = useState('');
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [numeroCitas, setNumeroCitas] = useState(1);


  const [citas, setCitas] = useState([]);

  const handleGenderChange = (event) => {
    setGeneroSelected(event.target.value);
  };

  const handleKeyDown = (event) => {
    const keyCode = event.keyCode || event.which;
    const isNumber = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    const isBackspace = keyCode === 8;
    if (!isNumber && !isBackspace) {
      event.preventDefault(); // Prevenir la entrada del caracter si no es un número ni la tecla de borrado
    }
  };

  const onChangeDni = (event) => {
    const nuevoDni = event.target.value;
    // Verificar si el nuevo DNI tiene más de 8 dígitos
    if (nuevoDni.length <= 8) {
      // Si el nuevo DNI tiene 8 dígitos o menos, guardar el valor
      setDni(nuevoDni);
    } else {
      // Si el nuevo DNI tiene más de 8 dígitos, no hacer ningún cambio
      // o puedes mostrar un mensaje de error al usuario
      // o truncar el DNI a los primeros 8 dígitos
      // setDni(nuevoDni.slice(0, 8));
    }
  }

  // nombrePaciente, dni, fechaCita, horaCita, sintomas, generoselected
  const handleSubmit = async (e) => {
    e.preventDefault();
    //  console.log(dni + " " +nombrePaciente + " " + sintomas + " " + fechaCita + " " + horaCita + " " + generoselected);

    // Validar que todos los campos estén llenados
    if (!nombrePaciente || !dni || !fechaCita || !horaCita || generoselected === "Ninguno" || !sintomas) {
      // Mostrar un toast para cada campo que esté vacío
      if (!nombrePaciente) {
        toast.error("El campo nombre del paciente es obligatorio", { duration: 3000, });
      }
      if (!dni) {
        toast.error("El campo DNI es obligatorio", { duration: 3000, });
      }
      if (!fechaCita) {
        toast.error("El campo fecha de la cita es obligatorio", { duration: 3000, });
      }
      if (!horaCita) {
        toast.error("El campo hora de la cita es obligatorio", { duration: 3000, });
      }
      if (generoselected === "Ninguno") {
        toast.error("El campo género seleccionado es obligatorio", { duration: 3000, });
      }
      if (!sintomas) {
        toast.error("El campo síntomas es obligatorio", { duration: 3000, });
      }
      return; // Detener el envío del formulario si hay campos vacíos
    }

    const nuevaCita = {
      id: numeroCitas,
      nombrePaciente: nombrePaciente,
      dni: dni,
      fechaCita: fechaCita,
      horaCita: horaCita,
      sintomas: sintomas,
      generoselected: generoselected
    }
    const citasActualizadas = [nuevaCita, ...citas];
    setCitas(citasActualizadas);
    //Simularemos la generación de IDs para las citas
    setNumeroCitas(numeroCitas + 1);


    toast.success("Guardado correctamente");
  };

  const eliminarCita = id => {
    const citasActualizadas = citas.filter(cita => cita.id !== id);
    setCitas(citasActualizadas);
    toast.warning("Borrado correctamente", { duration: 3000, icon: <BiTrash style={{ fontSize: "2rem" }} /> });
  }

  return (
    <>

      <div className="contenedor">
        <main>
          <form onSubmit={handleSubmit}>
            <div className="contenedor-formulario">

              <h2 className="titulo-formulario">Hacer una cita</h2>
              <div className="contenedor-campos">
                <div className="campo">
                  <label htmlFor="">Nombre del paciente</label>
                  <input type="text" value={nombrePaciente} onChange={(event) => { setNombrePaciente(event.target.value) }} />
                </div>
                <div className="campo">
                  <label htmlFor="">Seleccionar fecha</label>
                  <input type="date" min={fechaActual} value={fechaCita} onChange={(event) => { setFechaCita(event.target.value) }} />
                </div>
                <div className="campo">
                  <label htmlFor="">DNI</label>
                  <input type="tel" value={dni} onKeyDown={handleKeyDown} onChange={onChangeDni} />
                </div>
                <div className="campo">
                  <label htmlFor="">Hora</label>
                  <input type="time" value={horaCita} onChange={(event) => { setHoraCita(event.target.value) }} />
                </div>
                <div className="campo">
                  <label htmlFor="">Síntomas</label>
                  <textarea name="sintomas" rows="2" value={sintomas} onChange={(event) => { setSintomas(event.target.value) }}></textarea>
                </div>
                <div className="campo">
                  <label htmlFor="">Género</label>
                  {/* <input type="text" /> */}
                  <select className="" value={generoselected} onChange={handleGenderChange}>
                    <option value="Ninguno">Ninguno</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro / Prefiero no decirlo">Otro / Prefiero no decirlo</option>
                  </select>
                </div>
              </div>

              <div className="enviar">
                <button class="boton-enviar" type="submit">Agendar cita</button>
              </div>
            </div>

          </form>

        </main>

      </div>
      <h2 className='titulo'>Próximas citas</h2>
      <section className="contenedor-citas">
        {numeroCitas > 1 ? (
            <div className="contenedor-citas-grilla">
              {citas.map((cita, index) => (
                <Cita
                  key={index}
                  id={cita.id}
                  nombrePaciente={cita.nombrePaciente}
                  dni={cita.dni}
                  fechaCita={cita.fechaCita}
                  horaCita={cita.horaCita}
                  generoselected={cita.generoselected}
                  sintomas={cita.sintomas}
                  eliminarCita={eliminarCita}
                />
              ))}
            </div>
        ) : (
          <h3>Aún no hay citas reservadas</h3>
        )}
      </section>
      <Toaster richColors visibleToasts={12} autoHideDuration={3000} />

    </>
  )
}