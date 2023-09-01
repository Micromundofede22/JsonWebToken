import Usermodel from "../models/user.model.js"

export default class UserMongoDAO{
    getUser= async()=> await Usermodel.find().lean().exec()
}
