const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { UserIndex } from './pages/UserIndex.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

export function App() {
  return (
    <Router>
      <section className='app-section'>
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bug" element={<BugIndex />} />
            <Route path="/bug/:bugId" element={<BugDetails />} />
            <Route path="/user" element={<UserIndex />} />
            <Route path="/admin" element={<AdminIndex />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router>
  )
}
