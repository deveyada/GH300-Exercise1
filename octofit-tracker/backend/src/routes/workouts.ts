import { Router } from 'express'
import { Workout } from '../models/workout.js'

export const workoutsRouter = Router()

workoutsRouter.get('/', async (_request, response) => {
  response.json(await Workout.find().sort({ createdAt: -1 }))
})

workoutsRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await Workout.create(request.body))
  } catch (error) {
    response.status(400).json({ error: 'Unable to create workout', details: error })
  }
})