import { ProjectsServices } from "@/app/infrastructure/services/projects.service";
import { NextResponse } from "next/server";


const useRegisterProjects = new ProjectsServices();

// POST
export async function POST(req: Request) {
    try {
        const body: IRegisterProjectsRequest = await req.json();
        const newService = await useRegisterProjects.createProject(body);
        
        return NextResponse.json(newService, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}