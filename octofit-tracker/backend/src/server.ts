import express, { type Response } from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const port = Number(process.env.PORT || 8000);
const app = express();

const fallbackUsers = [
  {
    id: 'user-1',
    name: 'Ava Martinez',
    email: 'ava@octofit.app',
    username: 'ava',
    team: 'Storm Hawks',
    fitnessLevel: 'Intermediate',
    points: 1450,
  },
  {
    id: 'user-2',
    name: 'Leo Chen',
    email: 'leo@octofit.app',
    username: 'leo',
    team: 'Storm Hawks',
    fitnessLevel: 'Advanced',
    points: 1820,
  },
  {
    id: 'user-3',
    name: 'Nia Johnson',
    email: 'nia@octofit.app',
    username: 'nia',
    team: 'Sunrunners',
    fitnessLevel: 'Beginner',
    points: 980,
  },
];

const fallbackTeams = [
  { id: 'team-1', name: 'Storm Hawks', members: ['user-1', 'user-2'], points: 3270 },
  { id: 'team-2', name: 'Sunrunners', members: ['user-3'], points: 980 },
];

const fallbackActivities = [
  {
    id: 'activity-1',
    userId: 'user-1',
    type: 'run',
    durationMinutes: 28,
    calories: 220,
    date: '2026-09-29',
  },
  {
    id: 'activity-2',
    userId: 'user-2',
    type: 'strength',
    durationMinutes: 40,
    calories: 310,
    date: '2026-09-28',
  },
];

const fallbackLeaderboard = [
  { id: 'leaderboard-1', userId: 'user-2', username: 'leo', score: 1820, rank: 1 },
  { id: 'leaderboard-2', userId: 'user-1', username: 'ava', score: 1450, rank: 2 },
  { id: 'leaderboard-3', userId: 'user-3', username: 'nia', score: 980, rank: 3 },
];

const fallbackWorkouts = [
  {
    id: 'workout-1',
    title: 'Cardio Sprint Circuit',
    category: 'cardio',
    durationMinutes: 25,
    difficulty: 'Moderate',
    focus: 'stamina',
  },
  {
    id: 'workout-2',
    title: 'Core Stability Blast',
    category: 'strength',
    durationMinutes: 20,
    difficulty: 'Beginner',
    focus: 'core',
  },
];

const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
};

const withResponseEnvelope = <T>(response: Response, payload: T[]) => {
  response.json({
    apiUrl: getApiBaseUrl(),
    count: payload.length,
    data: payload,
  });
};

const getCollection = async <T>(model: mongoose.Model<T>, fallback: T[]): Promise<T[]> => {
  if (mongoose.connection.readyState === 1) {
    const docs = await model.find().lean();

    if (docs.length > 0) {
      return docs as T[];
    }
  }

  return fallback;
};

app.use(express.json());
app.use((_request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (_request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl: getApiBaseUrl() });
});

app.get('/api/config', (_request, response) => {
  response.json({
    apiUrl: getApiBaseUrl(),
    port,
    codespace: Boolean(process.env.CODESPACE_NAME),
  });
});

app.get('/api/users', async (_request, response) => {
  const users = await getCollection(User, fallbackUsers as never[]);
  withResponseEnvelope(response, users);
});

app.get('/api/teams', async (_request, response) => {
  const teams = await getCollection(Team, fallbackTeams as never[]);
  withResponseEnvelope(response, teams);
});

app.get('/api/activities', async (_request, response) => {
  const activities = await getCollection(Activity, fallbackActivities as never[]);
  withResponseEnvelope(response, activities);
});

app.get('/api/leaderboard', async (_request, response) => {
  const leaderboard = await getCollection(LeaderboardEntry, fallbackLeaderboard as never[]);
  withResponseEnvelope(response, leaderboard);
});

app.get('/api/workouts', async (_request, response) => {
  const workouts = await getCollection(Workout, fallbackWorkouts as never[]);
  withResponseEnvelope(response, workouts);
});

if (require.main === module) {
  void connectDatabase();

  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
}

export { app };
export default app;