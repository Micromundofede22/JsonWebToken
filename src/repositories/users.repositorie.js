export default class UserRepositorie{
    constructor(dao){
        this.dao= dao
    }
    getUser= async()=> await this.dao.getUser()
    getUserEmail= async (data)=> await this.dao.getUserEmail(data)
    getUserById= async (id) => await this.dao.getUserById(id)
    create= async(data) => await this.dao.create(data)
    updateUser= async(id,data)=> await this.dao.updateUser(id,data)
}