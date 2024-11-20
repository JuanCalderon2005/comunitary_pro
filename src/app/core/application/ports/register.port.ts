export interface PRegister{
    /**
     * Register user
     * @param {FormData} - Register request
     * @returns {Promise<IRegisterResponse>}Register response
     */

    register(req: FormData): Promise<IRegisterResponse>
    
}