import {useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos, presupuesto}) => {

  const [porcentaje, setPorcentaje] = useState(0)

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)


  useEffect ( () => {
    const totalGastado = gastos.reduce((total, gasto ) => 
        gasto.cantidad + total, 0);

        const totalDisponible = presupuesto - totalGastado

        //calcular porcentaje gastado

        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        
      
      setDisponible(totalDisponible)
      setGastado(totalGastado)
      setTimeout (() => {
        setPorcentaje(nuevoPorcentaje)
      }, 1000);


  }, [gastos])


  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      stlye: 'currency',
      currency: 'USD'
    })
  }



  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: "#3B82F6",
          })}
          text={`${porcentaje}% Gastado`}
          value={porcentaje}
        />
      </div>

      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span> ${formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> ${formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> ${formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
}

export default ControlPresupuesto
