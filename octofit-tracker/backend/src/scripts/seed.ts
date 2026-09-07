import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Runner',
        fitnessLevel: 'intermediate',
      },
      {
        username: 'jordan.lifts',
        email: 'jordan.lifts@example.com',
        displayName: 'Jordan Lifts',
        fitnessLevel: 'advanced',
      },
      {
        username: 'sam.getsfit',
        email: 'sam.getsfit@example.com',
        displayName: 'Sam Getsfit',
        fitnessLevel: 'beginner',
      },
    ]);

    await Team.create([
      {
        name: 'Trail Blazers',
        owner: users[0]._id,
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Strength Squad',
        owner: users[1]._id,
        members: [users[1]._id, users[0]._id],
      },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 35,
        distanceKilometers: 5.2,
        points: 52,
        completedAt: new Date('2026-09-01T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'strength',
        durationMinutes: 45,
        points: 60,
        completedAt: new Date('2026-09-02T17:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'walking',
        durationMinutes: 30,
        distanceKilometers: 2.4,
        points: 24,
        completedAt: new Date('2026-09-03T08:15:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { user: users[1]._id, points: 60, rank: 1 },
      { user: users[0]._id, points: 52, rank: 2 },
      { user: users[2]._id, points: 24, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Steady 5K Builder',
        description: 'Build running endurance with an easy, consistent pace.',
        activityType: 'running',
        difficulty: 'intermediate',
        durationMinutes: 35,
      },
      {
        title: 'Full-Body Foundation',
        description: 'Practice foundational strength movements with controlled form.',
        activityType: 'strength',
        difficulty: 'beginner',
        durationMinutes: 30,
      },
      {
        title: 'Brisk Recovery Walk',
        description: 'Improve daily movement with a comfortable, purposeful walk.',
        activityType: 'walking',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
