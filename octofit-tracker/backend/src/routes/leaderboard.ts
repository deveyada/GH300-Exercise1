import { Router } from 'express'
import { LeaderboardEntry } from '../models/leaderboard.js'

export const leaderboardRouter = Router()

leaderboardRouter.get('/', async (_request, response) => {
  response.json(await LeaderboardEntry.find().populate('user').sort({ points: -1 }))
})

leaderboardRouter.post('/', async (request, response) => {
  try {
    response.status(201).json(await LeaderboardEntry.create(request.body))
  } catch (error) {
    response.status(400).json({ error: 'Unable to create leaderboard entry', details: error })
  }
})