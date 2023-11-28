import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

//Buscar una tarea por id o por nombre completo o parte del nombre
export async function GET(req: Request, { params }: any) {
    const datoConvertido = parseInt(params.Id);
    console.log(params.Id)
    try {
        if (!Number.isNaN(datoConvertido)) {
            const tarea = await prisma.tareas.findFirst({
                where: { TareasId: datoConvertido }
            });
            if (!tarea) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito", tarea)
            return NextResponse.json(tarea);
        } else {
            //Busca subcadena en columna
            const tarea = await prisma.tareas.findMany({
                where: { TareasNombre: { search: params.Id } },
            });
            if (!tarea) {
                console.log("8: Error")
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            //Devolvemos lista de Tareasn
            return NextResponse.json(tarea);
        }
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
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