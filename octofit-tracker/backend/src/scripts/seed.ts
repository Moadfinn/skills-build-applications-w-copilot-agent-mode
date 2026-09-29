import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        name: 'Ava Martinez',
        email: 'ava@octofit.app',
        username: 'ava',
        fitnessLevel: 'Intermediate',
        team: 'Storm Hawks',
        points: 1450,
      },
      {
        name: 'Leo Chen',
        email: 'leo@octofit.app',
        username: 'leo',
        fitnessLevel: 'Advanced',
        team: 'Storm Hawks',
        points: 1820,
      },
      {
        name: 'Nia Johnson',
        email: 'nia@octofit.app',
        username: 'nia',
        fitnessLevel: 'Beginner',
        team: 'Sunrunners',
        points: 980,
      },
    ]);

    await Team.insertMany([
      { name: 'Storm Hawks', members: [users[0]._id, users[1]._id], points: 3270 },
      { name: 'Sunrunners', members: [users[2]._id], points: 980 },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        durationMinutes: 28,
        calories: 220,
        date: new Date('2026-09-29'),
      },
      {
        userId: users[1]._id,
        type: 'strength',
        durationMinutes: 40,
        calories: 310,
        date: new Date('2026-09-28'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[1]._id, username: 'leo', score: 1820, rank: 1 },
      { userId: users[0]._id, username: 'ava', score: 1450, rank: 2 },
      { userId: users[2]._id, username: 'nia', score: 980, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Cardio Sprint Circuit',
        category: 'cardio',
        durationMinutes: 25,
        difficulty: 'Moderate',
        focus: 'stamina',
      },
      {
        title: 'Core Stability Blast',
        category: 'strength',
        durationMinutes: 20,
        difficulty: 'Beginner',
        focus: 'core',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
