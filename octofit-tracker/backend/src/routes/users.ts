import { Router } from 'express'
import { User } from '../models/user.js'

export const usersRouter = Router()

usersRouter.get('/', async (_request, response) => {
  response.json(await User.find().sort({ createdAt: -1 }))
})

usersRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await User.create(request.body))
  } catch (error) {
    response.status(400).json({ error: 'Unable to create user', details: error })
  }
})