import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";


//Buscar una tarea por id o por nombre
export async function GET(req: Request, { params }: any) {
    const datoConvertido = parseInt(params.id);
    
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
            console.log(params.id)
            const tarea = await prisma.tareas.findMany({
                where: {TareasNombre: {search:params.id}},
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


//Actualizar Tarea
export async function PUT(req: Request, { params }: any) {
    const datoConvertido = parseInt(params.id);

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
        } else {
            const datos = await req.json();
            const tareaActualizada = await prisma.tareas.update({
                data: datos,
                where: {
                    TareasNombre: params.id,
                }
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

//Eliminar una tarea
export async function DELETE(req: Request, { params }: any) {
    try {
        const tareaEliminada = await prisma.tareas.delete({
            where: { TareasId: parseInt(params.id) }
        });
        if (!tareaEliminada) {
            return (NextResponse.json({ "Error": "No se encontro la tarea." }))
        }
        return NextResponse.json(tareaEliminada);
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
}
