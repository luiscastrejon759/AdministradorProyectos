'use client'

export default function prueba(props): React.JSX.Element{
    const handleChange = (event) => {                   
        if (event.target.checked) {        
          props.seleccionada(props.listaTareas.TareasId)
        } else {
          props.quitarseleccion(props.listaTareas.TareasId)  
        }        
  }; 
  
    const Editar= (i) =>{   
    //    console.log(i)         
        props.edicion(i)        
    }
  
   const Delete= (id) =>{      
  //  console.log(id)              
    props.eliminar(id)
    }

    return(
        <>
            <h3>TAREAS</h3>             
            <input type='text'></input>  <button style={{color:'black', fontSize:'20px', border:'none', borderRadius:'4px', background:'white'}}>Agregar</button>                              
            <li key={props.listaTareas.TareasId}>   
            {/* <a onClick={() => router.push('/prueba')} > {tarea.nombre} </a> */}
            <input type="checkbox" onChange={handleChange}/> 
            <a >{props.listaTareas.TareasNombre}</a>
                <button style={{color:'black', fontSize:'20px', border:'none', borderRadius:'4px', background:'white'}} onClick={() => Editar(props.listaTareas.TareasId)}>Editar</button>
               <button style={{color:'black', fontSize:'20px', border:'none', borderRadius:'4px', background:'white'}} onClick={() => Delete(props.listaTareas.TareasId)}>Eliminar</button>
            </li>  
         
        
        </>
        
    );
}