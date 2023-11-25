'use client'

export default function prueba(props): React.JSX.Element{
    //console.log('tareas',props.listaTareas)

    return(
        <>
            <h3>TAREAS</h3>            
            {props.listaTareas && props.listaTareas.map((tareas) => (
            <li key={tareas.TareasId}>   
            {/* <a onClick={() => router.push('/prueba')} > {tarea.nombre} </a> */}
            <a >{tareas.TareasNombre}</a>
            </li>  
        ))}
        </>
        
    );
}