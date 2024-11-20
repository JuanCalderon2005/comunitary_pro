interface Organizer {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    photo: string | null;
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


interface Metadata {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}


interface IProjectsResponse {
    statusCode: number;
    message: string;
    data: EventData[];
    metadata: Metadata;
}

interface IProjectsRequest{
    page: number;
    size: number;
}

interface IProjectResponse {
    statusCode: number;
    message: string;
    data: EventData[];
}
