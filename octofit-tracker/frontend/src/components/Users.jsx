import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Member' },
  { key: 'username', label: 'Username' },
  { key: 'team', label: 'Team' },
  { key: 'fitnessLevel', label: 'Fitness level' },
  { key: 'points', label: 'Points' },
]

export default function Users() {
  return (
    <CollectionPage
      resource="users"
      title="Members"
      description="The people moving OctoFit forward."
      columns={columns}
    />
  )
}