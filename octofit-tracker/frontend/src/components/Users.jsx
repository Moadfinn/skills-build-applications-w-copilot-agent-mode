import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Member' },
  { key: 'username', label: 'Username' },
  { key: 'team', label: 'Team' },
  { key: 'fitnessLevel', label: 'Fitness level' },
  { key: 'points', label: 'Points' },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : '/api/users/'

export default function Users() {
  return (
    <CollectionPage
      resource="users"
      endpoint={endpoint}
      title="Members"
      description="The people moving OctoFit forward."
      columns={columns}
    />
  )
}