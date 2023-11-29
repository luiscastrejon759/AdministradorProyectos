
//'use client' 
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";
//import { useState } from "react";



//Buscar una tarea por id o por nombre completo o parte del nombre
export async function GET(req: Request, { params }: any) {
    //  const [lista,setLista]:any=useState();
    const datoConvertido = parseInt(params.Id);

    try {
        if (!Number.isNaN(datoConvertido)) {
            const tarea = await prisma.tareas.findMany({
                where: { proyectoid: datoConvertido }
            });

            if (!tarea) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Respuesta: ", tarea)
            return NextResponse.json(tarea);
        } else {

            const consulta = `%${params.Id}%`;
            console.log(consulta)
            //const queryResult = await prisma.queryRaw('select * from "public"."Client"');
            const tarea: any = await prisma.$queryRaw`SELECT * FROM "public"."Proyecto" WHERE "ProyectoNombre" like ${consulta}`
            console.log(tarea)
            const listaTareasProyectos = await prisma.tareas.findMany({
                where: { proyectoid: { in: tarea.map((row: any) => row.ProyectoId) } },
            });
            console.log(listaTareasProyectos)
            if (!tarea) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito 1", tarea)
            return NextResponse.json(tarea);
        }
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
}

async function ListaTareas(id: any) {
    const tarea = await prisma.tareas.findMany({
        where: { TareasNombre: { search: id } },
    })
    return tarea;
}

//Eliminar una tarea
export async function DELETE(req: Request, { params }: any) {
    try {
        let tareaEliminada = await prisma.tareas.delete({
            where: { TareasId: parseInt(params.Id) }
        });
        if (!tareaEliminada) {
            return (NextResponse.json({ "Error": "No se encontro la tarea." }))
        }
        return NextResponse.json(tareaEliminada);
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
}

//Actualizar Tarea
export async function PUT(req: Request, { params }: any) {
    const datoConvertido = parseInt(params.Id);
    try {
        if (!Number.isNaN(datoConvertido)) {
            const datos = await req.json();
            const tareaActualizada = await prisma.tareas.update({
                data: datos,
                where: { TareasId: datoConvertido },
            })

            if (!tareaActualizada) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito", tareaActualizada)
            return NextResponse.json(tareaActualizada);
        }
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
}