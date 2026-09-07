import { Router } from 'express'
import { Team } from '../models/team.js'

export const teamsRouter = Router()

teamsRouter.get('/', async (_request, response) => {
  response.json(await Team.find().populate('owner members').sort({ createdAt: -1 }))
})

teamsRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await Team.create(request.body))
  } catch (error) {
    response.status(400).json({ error: 'Unable to create team', details: error })
  }
})