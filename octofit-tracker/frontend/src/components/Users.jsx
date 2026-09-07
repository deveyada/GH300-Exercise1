import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Community</p><h1>Members</h1></div><span className="record-count">{users.length} members</span></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">
        {users.map((user) => <div className="col-md-6 col-xl-4" key={user._id}><article className="data-card h-100"><div className="avatar">{user.displayName?.charAt(0) ?? '?'}</div><div><h2>{user.displayName}</h2><p className="muted">@{user.username}</p><span className="badge text-bg-light">{user.fitnessLevel}</span></div></article></div>)}
      </div>
    </section>
  )
}

export default Users
