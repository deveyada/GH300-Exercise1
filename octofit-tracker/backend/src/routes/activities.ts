import { Router } from 'express'
import { Activity } from '../models/activity.js'

export const activitiesRouter = Router()

activitiesRouter.get('/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ completedAt: -1 }))
})

activitiesRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await Activity.create(request.body))
  } catch (error) {
    response.status(400).json({ error: 'Unable to create activity', details: error })
  }
})