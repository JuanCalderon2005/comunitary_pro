import { ProjectsServices } from "@/app/infrastructure/services/projects.service";
import { NextResponse } from "next/server";


// EDIT
export async function PUT(request: Request,
    { params }: { params: Promise<{ id: number }> }) {
    try {
        const body: IEditProjectsRequest = await request.json();
        const useEditProject = new ProjectsServices();
        const id = (await params).id
        const editProject = await useEditProject.updateProject(id, body);

        return NextResponse.json(editProject, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}