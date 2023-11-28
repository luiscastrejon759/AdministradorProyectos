import { NextResponse } from "next/server";
import { prisma } from "../../../prisma";

//Obtiene todas las tareas de la bd
export async function GET() {
   // const id = parseInt(params.id);
    try {
        const tareas = await prisma.tareas.findMany({
            orderBy: {
                TareasId: 'asc',
              }
            });
        if (!tareas) {
            console.log("8: Error")
            return NextResponse.json({ "Error": "No se encontraron tareas" });
        }
        console.log(JSON.stringify(tareas))
        return NextResponse.json(tareas);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ 'error': err });

    }
}



//Guardara la tarea
export async function POST(req: Request) {
    const datosTarea = await req.json();
    console.log(datosTarea)
    try {
        const tarea = await prisma.tareas.create({
            data: datosTarea
        });
        return NextResponse.json(tarea);
    } catch (err) {
        return NextResponse.json({ 'error': err });
    }
}

/*
//Actualizar Tarea
export async function PUT(req: Request, { params }: any) {
    const actualizacion = await req.json();
    try {
        const tareaActualizada = await prisma.tareas.update({
            data: actualizacion,
            where: { TareasId: parseInt(params.id) },
        })

        if (!tareaActualizada) {
            return NextResponse.json({ "Error": "No se encontro la tarea" });
        }
        console.log("Exito", tareaActualizada)
        return NextResponse.json(tareaActualizada);
    } catch (err: any) {
        return NextResponse.json({ 'error': err.message });
    }
}*/


