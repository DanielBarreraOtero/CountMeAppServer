import Cat from '../models/Cat_model'
import CatBD from '../entities-bbdd/Cat_entity'

export default class SaveCat {
  async execute(cat: Cat): Promise<Cat> {
    const catBD = new CatBD({
      name: cat.getName(),
      color: cat.getColor(),
      birthDate: cat.getBrithDate(),
      weight: cat.getWeight(),
      _id: cat.getId() ? cat.getId() : undefined,
    })

    catBD.isNew = cat.getId() ? false : true

    var cat = (await catBD.save()).toCatModel()

    console.log(cat)

    return cat
  }
}
