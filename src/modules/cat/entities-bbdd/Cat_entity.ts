import mongoose, { Model, Schema, Types } from 'mongoose'
import Cat from '../models/Cat_model'

interface ICat {
  name: string
  color: string
  birthDate: Date
  weight: number,
  relatives: Types.Array<Types.ObjectId>
}

interface ICatMethods {
  toCatModel(): Cat
}

type CatModel = Model<ICat, {}, ICatMethods>

var catSchema = new Schema<ICat, CatModel, ICatMethods>({
  name: { type: String },
  color: { type: String },
  birthDate: Date,
  weight: Number,
  relatives: [{ type: Schema.Types.ObjectId, ref: 'CatModel' }]
})

catSchema.method('toCatModel', function toCatModel(): Cat {
  return new Cat(this.name, this.color, this.birthDate, this.weight, this._id)
})

var CatBD = mongoose.model<ICat, CatModel>('cat', catSchema)

export default CatBD
