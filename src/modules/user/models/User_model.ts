export default class User {


    constructor (private _id: string, ){

    }

    
    public get id() : string {
        return this._id
    }
    
    public set id(id : string) {
        this._id = id;
    }
    
    
}