import {Schema, model, models} from "mongoose";

export interface ICustomer{
    name: string,
    surname: string,
    address: string,
    phone: string;
    creator:string,
    createDate: string,
}
export interface ICreateCustomerPostBody {
    name: string,
    surname: string,
    address: string,
    phone: string;
    creator:string,
}
const CustomerSchema: Schema<ICustomer>= new Schema<ICustomer>({
    name: {
        type: Schema.Types.String,
    },
    surname: {
        type: Schema.Types.String,
    },
    address: {
        type: Schema.Types.String,
    },
    phone: {
        type: Schema.Types.String,
    },
    creator: {
        type: Schema.Types.String, //ObjectId,
        ref: 'User'
    },
    createDate: {
        type: Schema.Types.String,
        required: [true, "create date is required"]
    },
})
const Customer = models.Customer || model("Customer", CustomerSchema)

export default Customer;
