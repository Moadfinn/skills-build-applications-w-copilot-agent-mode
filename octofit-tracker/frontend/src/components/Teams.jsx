import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

export default function Teams() {
  return (
    <CollectionPage
      resource="teams"
      endpoint={endpoint}
      title="Teams"
      description="Meet the squads building their baseline together."
      columns={columns}
    />
  )
}