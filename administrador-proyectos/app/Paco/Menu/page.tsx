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

  const obtenerTareas = (idProyecto: any) => {
    console.log('id del proyecto' , idProyecto)
    //esto es un experimento
    const fetchDataTareas = async () => {      
        //let url = '/api/Proyecto/Tarea/' + idProyecto
       let url = 'http://localhost:3000/api/Proyecto/Tarea/' + idProyecto
       console.log('url', url)
        const consultaGral = await fetch(url, {
            method: 'GET',               
        });      
      const respuestaGral = await consultaGral.json()
       console.log('respuesta de las tareas ',respuestaGral)
      setTareas(respuestaGral)
    }
    fetchDataTareas();
  }
 
  return(
    <div>
     <h1>PROYECTOS</h1>
        <div className='item-container'>
        {proyectos.map((proyecto) => (
            <li key={proyecto.ProyectoId}>   
            <button onClick={(e) => obtenerTareas(proyecto.ProyectoId)} >{proyecto.ProyectoNombre}</button>
            </li>  
        ))}
        </div>
        <Tareas listaTareas={tareas}/>
  </div>
  );
}