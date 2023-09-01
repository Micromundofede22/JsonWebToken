export default class UserRepositorie{
    constructor(dao){
        this.dao= dao
    }
    getUser= async()=> await this.dao.getUser()
}