import { Schema, model } from 'mongoose'

const CountingTypeSchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const CountingTypeEntity = model('timers_counting_types', CountingTypeSchema)

export default CountingTypeEntity
