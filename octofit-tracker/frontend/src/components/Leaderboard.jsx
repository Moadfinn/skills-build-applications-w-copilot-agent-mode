import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'username', label: 'Athlete' },
  { key: 'score', label: 'Points' },
]

export default function Leaderboard() {
  return (
    <CollectionPage
      resource="leaderboard"
      title="Leaderboard"
      description="See how members are progressing this season."
      columns={columns}
    />
  )
}