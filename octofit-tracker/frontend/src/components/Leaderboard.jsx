import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard').then(setEntries).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="view-section narrow-view">
      <div className="section-heading"><div><p className="eyebrow">The weekly climb</p><h1>Leaderboard</h1></div><span className="record-count">{entries.length} ranked</span></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="data-card leaderboard-list">{entries.map((entry, index) => <div className="leaderboard-row" key={entry._id}><strong className={`rank rank-${index + 1}`}>{entry.rank ?? index + 1}</strong><div className="avatar small-avatar">{entry.user?.displayName?.charAt(0) ?? '?'}</div><div className="flex-grow-1"><h2>{entry.user?.displayName ?? entry.user?.username ?? 'Member'}</h2><p className="muted">{entry.user?.fitnessLevel ?? 'active'}</p></div><strong className="points">{entry.points} pts</strong></div>)}</div>
    </section>
  )
}

export default Leaderboard
