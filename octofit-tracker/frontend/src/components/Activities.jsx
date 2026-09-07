import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Recent activity</h1></div><span className="record-count">{activities.length} sessions</span></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="table-responsive data-card p-0"><table className="table align-middle mb-0"><thead><tr><th>Athlete</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th></tr></thead><tbody>
        {activities.map((activity) => <tr key={activity._id}><td>{activity.user?.displayName ?? activity.user?.username ?? 'Member'}</td><td><span className="activity-dot" />{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.distanceKilometers ? `${activity.distanceKilometers} km` : 'Strength'}</td><td className="points">+{activity.points ?? 0}</td></tr>)}
      </tbody></table></div>
    </section>
  )
}

export default Activities
