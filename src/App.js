import './App.css';
import FormularioCita from './componentes/FormularioCita';
function App() {
/*Agregar fetch para leer las citas existentes*/
  return (
    <div className="App">
      <div className='contenedor-principal'>
        <header>
          <h1 className='titulo'>Formulario de citas médicas</h1>
        </header>
        <FormularioCita />
      </div>
    </div>

  );
}

export default App;
