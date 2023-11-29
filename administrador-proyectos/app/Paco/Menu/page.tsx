'use client'
import React, { useState } from 'react';
import { useEffect } from 'react';
import Tareas from '../tareas/page'


export default function List() { 

const [proyectos, setProyectos] = useState([]); 
  const [tareas, setTareas] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      const consultaGral = await fetch('/api/Proyecto/EndPointProyecto/', {
        method: 'GET',           
      });      
      const respuestaGral = await consultaGral.json()
   //   console.log('RESPUESTA DE LOS PROYECTOS ',respuestaGral)
      setProyectos(respuestaGral)
    }
    
    fetchData();
  }, []);

  const obtenerTareas = (idProyecto) => {
    console.log('id del proyecto' , idProyecto)
    //esto es un experimento
    const fetchDataTareas = async () => {      
       const url = '/api/Proyecto/Tarea/' + idProyecto     
       console.log('url', url)
        const consultaGralTareas = await fetch(url, {
            method: 'GET',               
        });      
      const respuestaGralTareas = await consultaGralTareas.json()
       console.log('respuesta de las tareas ',respuestaGralTareas)
      setTareas(respuestaGralTareas)
    }
    fetchDataTareas();
  }

  const seleccionada = (x) => {   
    console.log('seleccionada', x) 
  }

   const quitarseleccion = (y) => { 
    console.log('quitarseleccion', y) 
    
  }  
  const eliminar = id => {
    console.log('eliminar', id) 
   
   }

  const edicion = i => {        
    console.log('edicion', i) 
  };  
 
  
  return(
    <div>
     <h1>PROYECTOS</h1>
        <div className='item-container'>
        {proyectos && proyectos.map((proyecto) => (
            <li key={proyecto.ProyectoId}>   
            <button onClick={(e) => obtenerTareas(proyecto.ProyectoId)} >{proyecto.ProyectoNombre}</button>
            </li>  
        ))}
        </div>
        <Tareas listaTareas={tareas} edicion={edicion} eliminar={eliminar} seleccionada={seleccionada} quitarseleccion={quitarseleccion} />
  </div>
  );
}