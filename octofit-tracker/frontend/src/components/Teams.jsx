import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams').then(setTeams).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Train together</p><h1>Teams</h1></div><span className="record-count">{teams.length} teams</span></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">{teams.map((team) => <div className="col-md-6" key={team._id}><article className="data-card team-card h-100"><div className="team-mark">{team.name?.slice(0, 2).toUpperCase()}</div><h2>{team.name}</h2><p className="muted">Led by {team.owner?.displayName ?? team.owner?.username ?? 'member'}</p><div className="member-stack">{(team.members ?? []).map((member) => <span key={member._id} title={member.displayName}>{member.displayName?.charAt(0) ?? '?'}</span>)}</div></article></div>)}</div>
    </section>
  )
}

export default Teams
