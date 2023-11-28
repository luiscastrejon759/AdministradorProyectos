import { NextResponse } from "next/server";
import { prisma } from "../../../prisma";
import { NextApiRequest } from "next";

//Obtiene todas los proyectos de la bd
export async function GET() {
    try {

        const proyectos = await prisma.proyecto.findMany();
        if (!proyectos) {
            console.log("8: Error")
            return NextResponse.json({ "Error": "No se encontro la tarea" });
        }
        console.log("Lista proyectos:"+JSON.stringify(proyectos))
        return NextResponse.json(proyectos);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ 'error': err });
    }
}

//Guardara el nombre del proyecto
export async function POST(req: Request) {
    const nombreProyecto = await req.json();
    console.log(nombreProyecto)
    try {
        const proyectos = await prisma.proyecto.create({
            data: nombreProyecto
        });
        return NextResponse.json(proyectos);
    } catch (err) {
        return NextResponse.json({ 'error': err });
    }
}


/* const proyectos = await prisma.proyecto.findMany({
            where: {
                ProyectoNombre: { search: params.nombre_proyecto, },
            },
        });
        if (!proyectos) {
            console.log("8: Error")
            return NextResponse.json({ "Error": "No se encontro la tarea" });
        }
        return NextResponse.json(proyectos);
    } catch (err) {
        console.log(err)
        return NextResponse.json({ 'error': err });
    } */

