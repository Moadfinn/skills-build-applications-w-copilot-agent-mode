import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'date', label: 'Date' },
  { key: 'userId', label: 'Member' },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'calories', label: 'Calories' },
]

export default function Activities() {
  return (
    <CollectionPage
      resource="activities"
      title="Activities"
      description="Training logged across your community."
      columns={columns}
    />
  )
}