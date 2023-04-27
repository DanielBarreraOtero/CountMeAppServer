import { Request, Response } from 'express'
import GetCats from '../../modules/cat/application/get-all'
import MongoConnector from '../../utils/mongo-connector'
import Cat from '../../modules/cat/models/Cat_model'
import SaveCat from '../../modules/cat/application/save'
import DeleteCat from '../../modules/cat/application/delete'
import GetCat from '../../modules/cat/application/get-one'

export const getCats = async (req: Request, res: Response) => {
  // Validate request
  const mongo = new MongoConnector()
  await mongo.init()

  // Get cats
  const cats = await new GetCats().execute()

  await mongo.close()

  // Send response
  res.status(200).json(cats)
}

export const getCat = async (req: Request, res: Response) => {
  // Validate request
  const mongo = new MongoConnector()
  await mongo.init()

  // Get cat

  const cat = await new GetCat().execute(req.params.id)

  await mongo.close()

  // Send response
  if (cat instanceof Cat) {
    res.status(200).json(cat)
  } else {
    res.status(400).json(cat)
  }
}

export const saveNewCat = async (req: Request, res: Response) => {
  const mongo = new MongoConnector()
  await mongo.init()

  const catReq = req.body.cat
  const cat = new Cat(
    catReq.name,
    catReq.color,
    catReq.birthDate,
    catReq.weight,
  )

  const catBD = await new SaveCat().execute(cat)

  await mongo.close()

  res.status(201).json(catBD)
}

export const saveExistingCat = async (req: Request, res: Response) => {
  const mongo = new MongoConnector()
  await mongo.init()

  const catReq = req.body.cat
  const cat = new Cat(
    catReq.name,
    catReq.color,
    catReq.birthDate,
    catReq.weight,
    catReq._id,
  )

  const catBD = await new SaveCat().execute(cat)

  await mongo.close()

  res.status(201).json(catBD)
}

export const deleteCat = async (req: Request, res: Response) => {
  const mongo = new MongoConnector()
  await mongo.init()

  const result = await new DeleteCat().execute(req.body.id)

  await mongo.close()

  if (result.deletedCount > 0) {
    res.status(200).send()
  } else {
    res
      .status(400)
      .send({ error: `Couldn't find any Cat by the id: ${req.body.id}` })
  }
}
