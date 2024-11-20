export interface PProjects{
    /**
     * Get all projects
     * @returns {Promise<IProjectsResponse>}Register response
     */

    getProjects({size, page}: IProjectsRequest): Promise<IProjectsResponse>

    /**
     * Get report
     * @returns {Promise<ArrayBuffer>}Report response
     */
    getReport(): Promise<ArrayBuffer>

    /**
     * create a new project
     * @param {IRegisterProjectsRequest} - project request
     * @returns {Promise<IProjectsResponse>} - project response
     */
    createProject(project: IRegisterProjectsRequest): Promise<IProjectsResponse>

    /**
     * Update a project
     * @param {IEditProjectsRequest} - project request
     * @returns {Promise<IEditProjectsRequest>} - project response
     */

    updateProject(id:number, project: IEditProjectsRequest): Promise<IEditProjectsResponse>

    /**
     * Delete a project
     * @param {number} - project id
     * @returns {Promise<IDeleteProjectResponse>} - void response
     */

    deleteProject(id:number): Promise<IDeleteProjectResponse>

    /**
     * Get a project by id
     * @param {number} - project id
     * @returns {Promise<IProjectResponse>} - project response
     */

    getProject(id: number): Promise<IProjectResponse>
    
}   