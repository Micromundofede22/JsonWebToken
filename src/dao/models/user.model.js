import mongoose, { Mongoose } from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
    first_name:  {type: String, required: true},
    last_name:  {type: String, required: true},
    email: {type:String, required:true, unique:true},
    age: {type: Number, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "user"},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "carts"},
    servicio: {type: String, required: false},
    file: {type: String, required: false}
})

mongoose.set("strictQuery", false)
const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel