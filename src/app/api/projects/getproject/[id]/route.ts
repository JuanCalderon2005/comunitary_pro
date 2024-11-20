import { ProjectsServices } from "@/app/infrastructure/services/projects.service";
import { NextResponse } from "next/server";

// GET
export async function GET(request: Request, { params }: { params: Promise<{ id: number }> }) {
    try {
        const useGetProject = new ProjectsServices;
        const id = (await params).id;
        
        const serviceData = await useGetProject.getProject(id);

        return NextResponse.json(serviceData, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}