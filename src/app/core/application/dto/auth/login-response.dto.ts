interface ILoginResponse {
    statusCode: number;
    message: string;
    data: LoginData;
}

interface LoginData {
    access_token: string;
    user: User;
}

interface User {
    email: string;
    sub: number;
    role: string;
    photo: string;
}
