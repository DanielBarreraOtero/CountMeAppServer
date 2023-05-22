import User from "../../user/models/User_model"

export default class Activity{
    readonly id : string
    readonly name: string
    readonly color: string
    readonly order?: string
    readonly user: User
    readonly folder: any

    constructor(init?: Partial<Activity>){
        Object.assign(this, init)
    }
}