import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

//Buscar una tarea por id o por nombre
export async function GET(req: Request, { params }: any) {
    console.log("id: " + params.Id)
    const datoConvertido = parseInt(params.Id);

    try {
        if (!Number.isNaN(datoConvertido)) {
            const proyecto = await prisma.proyecto.findFirst({
                where: { ProyectoId: datoConvertido }
            });
            if (!proyecto) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito", proyecto)
            return NextResponse.json(proyecto);
        } else {
            console.log(params.id)
            const proyecto = await prisma.proyecto.findFirst({
                where: { ProyectoNombre: params.Id },
            });
            if (!proyecto) {
                console.log("8: Error")
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            //Devolvemos lista de Tareasn
            return NextResponse.json(proyecto);
        }
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
}

export async function PUT(req: Request, { params }: any) {
    const actualizacion = await req.json();
    try {
        const datoConvertido = parseInt(params.Id);
        if (!Number.isNaN(datoConvertido)) {
            const tareaActualizada = await prisma.proyecto.update({
                data: actualizacion,
                where: { ProyectoId: datoConvertido },
            })

            if (!tareaActualizada) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito", tareaActualizada)
            return NextResponse.json(tareaActualizada);
        } else {
            const tareaActualizada = await prisma.proyecto.update({
                data: actualizacion,
                where: { ProyectoNombre: params.Id },
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

export async function DELETE(req: Request, { params }: any) {
    // const actualizacion = await req.json();
    try {
        const datoConvertido = parseInt(params.Id);
        if (!Number.isNaN(datoConvertido)) {
            const proyectoEliminado = await prisma.proyecto.delete({
                where: { ProyectoId: datoConvertido },
            })

            if (!proyectoEliminado) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito", proyectoEliminado)
            return NextResponse.json(proyectoEliminado);
        } else {
            const proyectoEliminado = await prisma.proyecto.delete({
                where: { ProyectoNombre: params.Id },
            })

            if (!proyectoEliminado) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito", proyectoEliminado)
            return NextResponse.json(proyectoEliminado);
        }
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
}