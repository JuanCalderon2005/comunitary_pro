import { ProjectsServices } from "@/app/infrastructure/services/projects.service";
import { UsersService } from "@/app/infrastructure/services/users.service";
import DashboardTemplate from "@/ui/template/dashboard/dashboardTemplate";

interface IProps{
    searchParams: IProjectsRequest;
  }

const useProjectService = new ProjectsServices();
const UseUserService = new UsersService();

export default async function DashboardPage({ searchParams }: IProps) {
    const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;
    const data = await useProjectService.getProjects({page, size: 7});
    const users = await UseUserService.getUsers();
    
    const totalProjects = data.metadata.totalItems;

    const activeProjects = data.data.filter(project => project.isActive).length;

    const organizers = users.data.filter(user => user.role === 'organizer').length;

    return (
        <>
            <DashboardTemplate 
                data={data} 
                totalProjects={totalProjects} 
                activeProjects={activeProjects} 
                organizers={organizers} 
            />
        </>
    );
}
