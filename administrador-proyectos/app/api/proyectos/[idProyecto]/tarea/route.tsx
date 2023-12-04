import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";



//Obtiene la tarea correspondiente a un proyecto
export async function GET(req: Request, { params }: any) {
    const datoConvertido = parseInt(params.idProyecto);
    const TareaId = parseInt(params.idTarea);
    try {
        if (!Number.isNaN(datoConvertido)) {
            const proyecto = await prisma.tareas.findMany({
                where: {
                    proyectoid: datoConvertido,
                  
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

//Guardara el nombre del proyecto
//Guardara la tarea
export async function POST(req: Request,{params}:any) {

    const datos=await req.json();
    datos.proyectoid=parseInt(params.idProyecto);
    console.log(datos)
    try {
        const tarea = await prisma.tareas.create({
            data: datos
        });
        return NextResponse.json(tarea);
    } catch (err) {
        return NextResponse.json({ 'error': err });
    }
}
