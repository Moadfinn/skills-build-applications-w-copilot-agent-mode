import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'date', label: 'Date' },
  { key: 'userId', label: 'Member' },
  { key: 'type', label: 'Activity' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'calories', label: 'Calories' },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

export default function Activities() {
  return (
    <CollectionPage
      resource="activities"
      endpoint={endpoint}
      title="Activities"
      description="Training logged across your community."
      columns={columns}
    />
  )
}