import { ProjectsServices } from "@/app/infrastructure/services/projects.service";
import { NextResponse } from "next/server";


// DELETE
export async function DELETE(request: Request,
    { params }: { params: Promise<{ id: number }> }) {
    try {
        const useDeleteProject = new ProjectsServices();
        const id = (await params).id
         await useDeleteProject.deleteProject(id);
        return NextResponse.json({message: 'Eliminado correctamente'}, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}