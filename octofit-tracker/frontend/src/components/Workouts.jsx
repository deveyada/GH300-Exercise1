import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((requestError) => setError(requestError.message))
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
