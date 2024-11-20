import { PProjects } from "@/app/core/application/ports/projects.port";
import { HttpClient } from "../utils/client-http";

export class ProjectsServices implements PProjects {
  private clientHttp: HttpClient;

  constructor() {
    this.clientHttp = new HttpClient();
  }

  async getReport(): Promise<ArrayBuffer> {
    try {
      const response = await this.clientHttp.get<ArrayBuffer>(`projects/report/download`, true);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProjects({ size, page }: IProjectsRequest): Promise<IProjectsResponse> {
    try {
      const response = await this.clientHttp.get<IProjectsResponse>(`projects?page=${page}&size=${size}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProject(id: number): Promise<IProjectResponse> {
    try {
      const response = await this.clientHttp.get<IProjectResponse>(`projects/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createProject(project: IRegisterProjectsRequest): Promise<IProjectsResponse> {
    try {
      const response = await this.clientHttp.post<IProjectsResponse, IRegisterProjectsRequest>("projects", project);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProject(id: number, project: IEditProjectsRequest): Promise<IEditProjectsResponse> {
    try {
      const response = await this.clientHttp.put<IEditProjectsResponse, IEditProjectsRequest>(`projects/${id}`, project);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProject(id: number): Promise<IDeleteProjectResponse> {
    try {
      const response = await this.clientHttp.delete<IDeleteProjectResponse>(`projects/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}