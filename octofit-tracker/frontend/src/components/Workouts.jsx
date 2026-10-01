import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'focus', label: 'Focus' },
]

export default function Workouts() {
  return (
    <CollectionPage
      resource="workouts"
      title="Workouts"
      description="Find a focused session for your next training day."
      columns={columns}
    />
  )
}