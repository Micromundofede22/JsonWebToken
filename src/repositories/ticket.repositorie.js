export default class TicketRepositorie{
    constructor(dao){
        this.dao= dao
    }
    create= async(data)=> await this.dao.create(data)
    getAll= async()=> await this.dao.getAll()
}