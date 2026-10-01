import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'username', label: 'Athlete' },
  { key: 'score', label: 'Points' },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

export default function Leaderboard() {
  return (
    <CollectionPage
      resource="leaderboard"
      endpoint={endpoint}
      title="Leaderboard"
      description="See how members are progressing this season."
      columns={columns}
    />
  )
}