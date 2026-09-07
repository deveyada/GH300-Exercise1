import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchCollection } from '../api.js'

const workoutsEndpoint = `${apiBaseUrl}/api/workouts/` // https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts', workoutsEndpoint).then(setWorkouts).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Your next session</p><h1>Workouts</h1></div><span className="record-count">{workouts.length} plans</span></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">{workouts.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id}><article className="data-card workout-card h-100"><div className="workout-top"><span className="badge text-bg-light">{workout.activityType}</span><span className="muted">{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p className="muted">{workout.description}</p><div className="workout-footer"><span>{workout.difficulty}</span><span className="arrow">&#8594;</span></div></article></div>)}</div>
    </section>
  )
}

export default Workouts
