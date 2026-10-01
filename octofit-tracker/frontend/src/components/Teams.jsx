import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return (
    <CollectionPage
      resource="teams"
      title="Teams"
      description="Meet the squads building their baseline together."
      columns={columns}
    />
  )
}