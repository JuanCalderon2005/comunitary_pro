interface IEditProjectsResponse {
    statusCode: number;
    message: string;
    data: EventData;
}

interface EventData {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    organizer: Organizer;
}

interface Organizer {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    photo: string | null;
}