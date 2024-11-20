interface IRegisterResponse {
    statusCode: number;
    message: string;
    data: UserData;
}

interface UserData {
    email: string;
    name: string;
    role: string;
    photo: string | null;
    id: number;
}
