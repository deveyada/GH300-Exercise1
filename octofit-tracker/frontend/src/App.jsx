import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar"><NavLink className="brand" to="/users"><span className="brand-mark">O</span><span>OctoFit <small>TRACKER</small></span></NavLink><nav className="main-nav" aria-label="Primary navigation"><NavLink to="/activities">Activity</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/users">Members</NavLink><NavLink to="/workouts">Workouts</NavLink></nav></header>
      <main className="content-wrap"><Routes><Route path="/" element={<Users />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
      <footer className="footer"><span>OCTOFIT / 2026</span><span>Move with intention.</span></footer>
    </div>
  )
}

export default App
