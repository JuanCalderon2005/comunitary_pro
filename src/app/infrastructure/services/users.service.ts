import { PRegister } from "@/app/core/application/ports/register.port";
import { HttpClient } from "../utils/client-http";

export class UsersService implements PRegister{
    private clientHttp: HttpClient;

    constructor(){
        this.clientHttp = new HttpClient();
    }

    async getUsers(): Promise<IGetUsersResponse>{
        return this.clientHttp.get<IGetUsersResponse>("users");
    }

    async register(req: FormData): Promise<IRegisterResponse>{
        const formData = true;
        return this.clientHttp.post<IRegisterResponse, FormData>(
            `users`,
            req,
            formData
        );
    }
}