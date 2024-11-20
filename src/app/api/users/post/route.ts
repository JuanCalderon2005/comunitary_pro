import { UsersService } from "@/app/infrastructure/services/users.service";
import { NextResponse } from "next/server";

const useRegisterService = new UsersService()
export async function POST(req: Request) {
    try {
        const formData = await req.formData();  
        const newUser = await useRegisterService.register(formData);

        return NextResponse.json(newUser, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}