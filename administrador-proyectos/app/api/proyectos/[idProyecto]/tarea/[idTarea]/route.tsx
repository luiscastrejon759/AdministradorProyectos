import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import { NextApiRequest } from "next";



//Obtiene la tarea correspondiente a un proyecto
export async function GET(req: Request, { params }: any) {
    const datoConvertido = parseInt(params.idProyecto);
    const TareaId = parseInt(params.idTarea);
    try {
        if (!Number.isNaN(datoConvertido)) {
            const proyecto = await prisma.tareas.findMany({
                where: {
                    proyectoid: datoConvertido,
                    TareasId: TareaId,
                },
                orderBy: {
                    proyectoid: 'asc',
                },
            });
            if (!proyecto) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito", proyecto)
            return NextResponse.json(proyecto);
        } else {
            const consulta = `%${params.Id}%`;
            console.log(consulta)
            const proyectos: any = await prisma.$queryRaw`SELECT * FROM "public"."Proyecto" WHERE "ProyectoNombre" like ${consulta}`
            if (!proyectos) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito 1", proyectos)
            return NextResponse.json(proyectos);
        }
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
}



//Actualizar Tarea correspondiente a un proyecto
export async function PUT(req: Request, { params }: any) {

    const datoConvertido = parseInt(params.idProyecto);
    const TareaId = parseInt(params.idTarea);
    try {
        if (!Number.isNaN(datoConvertido)) {
            const datos = await req.json();
            const tareaActualizada = await prisma.tareas.update({
                data: datos,
                where: {
                    proyectoid: datoConvertido,
                    TareasId: TareaId,
                },
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

//Eliminar tarea especifica de algun proyecto
export async function DELETE(req: Request, { params }: any) {
    
    const datoConvertido = parseInt(params.idProyecto);
    const TareaId = parseInt(params.idTarea);
    try {
        let tareaEliminada = await prisma.tareas.delete({
            where: {
                proyectoid: datoConvertido,
                TareasId: TareaId,
            },
        });
        if (!tareaEliminada) {
            return (NextResponse.json({ "Error": "No se encontro la tarea." }))
        }
        return NextResponse.json(tareaEliminada);
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
}