import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'focus', label: 'Focus' },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

export default function Workouts() {
  return (
    <CollectionPage
      resource="workouts"
      endpoint={endpoint}
      title="Workouts"
      description="Find a focused session for your next training day."
      columns={columns}
    />
  )
}