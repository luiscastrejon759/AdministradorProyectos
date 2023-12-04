import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { prisma } from "../../../prisma";

//Buscar un proyecto por id o por nombre
export async function GET(req: Request, { params }: any) {
    console.log("id: " + params.idProyecto)
    const datoConvertido = parseInt(params.idProyecto);

    try {
        if (!Number.isNaN(datoConvertido)) {
            const proyecto = await prisma.proyecto.findFirst({
                where: { ProyectoId: datoConvertido },
                orderBy: {
                    ProyectoId: 'asc',
                },
            });
            if (!proyecto) {
                return NextResponse.json({ "Error": "No se encontro la tarea" });
            }
            console.log("Exito", proyecto)
            return NextResponse.json(proyecto);
        } else {
            const consulta = `%${params.idProyecto}%`;
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

export async function PUT(req: Request, { params }: any) {
    const actualizacion = await req.json();
    try {
        const datoConvertido = parseInt(params.idProyecto);
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
                where: { ProyectoNombre: params.idProyecto },
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
        const datoConvertido = parseInt(params.idProyecto);
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
                where: { ProyectoNombre: params.idProyecto },
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