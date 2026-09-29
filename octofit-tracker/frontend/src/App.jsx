import { Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

function Dashboard() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="OctoFit Tracker home">
          <img src={octofitLogo} alt="" />
          <span>OctoFit <strong>Tracker</strong></span>
        </a>
        <span className="workspace-status"><i /> Development workspace</span>
      </header>

      <main className="container dashboard">
        <section className="intro">
          <p className="eyebrow">TRAINING PLATFORM <span> / </span> OVERVIEW</p>
          <h1>Make every<br />move count.</h1>
          <p className="intro-copy">Your OctoFit workspace is ready to take shape.</p>
        </section>

        <section className="service-sheet" aria-labelledby="services-title">
          <div className="sheet-heading">
            <div>
              <p className="eyebrow">SYSTEM STATUS</p>
              <h2 id="services-title">Application services</h2>
            </div>
            <span className="setup-state"><i /> Scaffolded</span>
          </div>
          <div className="service-list">
            <div className="service-row">
              <span className="service-number">01</span>
              <div className="service-name"><strong>Presentation</strong><span>React 19 · Vite</span></div>
              <code>5173</code>
              <span className="service-kind">WEB</span>
            </div>
            <div className="service-row">
              <span className="service-number">02</span>
              <div className="service-name"><strong>Logic and API</strong><span>Express · TypeScript</span></div>
              <code>8000</code>
              <span className="service-kind">API</span>
            </div>
            <div className="service-row">
              <span className="service-number">03</span>
              <div className="service-name"><strong>Data</strong><span>MongoDB · Mongoose</span></div>
              <code>27017</code>
              <span className="service-kind">DB</span>
            </div>
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>OCTOFIT TRACKER</span>
          <span>BUILD YOUR BASELINE</span>
        </footer>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
