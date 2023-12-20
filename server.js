import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'

import { bugService } from './service/bugs.service.js'
import { userService } from './service/user.service.js'
import { loggerService } from './service/logger.service.js'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

//Get Bugs
app.get('/api/bug/', (req, res) => {
  const filterBy = {
    title: req.query.title,
    severity: +req.query.severity,
    pageIdx: req.query.pageIdx,
  }
  const sortBy = {
    type: req.query.type,
    dir: +req.query.dir,
  }
  bugService
    .query(filterBy, sortBy)
    .then((bugs) => {
      res.send(bugs)
    })
    .catch((err) => {
      loggerService.error('Cannot get bugs', err)
      res.status(404).send('cannot get bugs')
    })
})

//Add Bug
app.post('/api/bug/', (req, res) => {
  const { title, description, severity } = req.body
  const bugToSave = { title, description, severity }
  console.log(bugToSave)
  bugService
    .save(bugToSave)
    .then((bug) => res.send(bug))
    .catch((err) => {
      loggerService.error('Cannot save bug', err)
      res.status(404).send('Cannot save bug')
    })
})

//Edit Bug
app.put('/api/bug/', (req, res) => {
  const { title, description, severity, _id } = req.body
  const bugToSave = { title, description, severity, _id }
  bugService
    .save(bugToSave)
    .then((bug) => res.send(bug))
    .catch((err) => {
      loggerService.error('Cannot save bug', err)
      res.status(404).send('Cannot save bug')
    })
})

//Get Bug
app.get('/api/bug/:bugId', (req, res) => {
  const bugId = req.params.bugId
  bugService
    .getById(bugId)
    .then((bug) => {
      handleCookies(req, res, bug)
    })
    .catch((err) => {
      loggerService.error('Cannot get bug', err)
      res.status(404).send('Cannot get bug')
    })
})

//Remove Bug
app.delete('/api/bug/:bugId', (req, res) => {
  const bugId = req.params.bugId
  console.log(req.params)
  bugService
    .remove(bugId)
    .then((bug) => res.send(bug))
    .catch((err) => {
      loggerService.error('cannot remove bug', err)
      res.status(404).send('Cannot remove bug')
    })
})

// AUTH API
app.get('/api/user', (req, res) => {
  userService.query()
    .then((users) => {
      res.send(users)
    })
    .catch((err) => {
      console.log('Cannot load users', err)
      res.status(400).send('Cannot load users')
    })
})

app.post('/api/auth/login', (req, res) => {
  const credentials = req.body
  userService.checkLogin(credentials)
    .then(user => {
      if (user) {
        const loginToken = userService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.send(user)
      } else {
        res.status(401).send('Invalid Credentials')
      }
    })
})

app.post('/api/auth/signup', (req, res) => {
  const credentials = req.body
  userService.save(credentials)
    .then(user => {
      if (user) {
        const loginToken = userService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.send(user)
      } else {
        res.status(400).send('Cannot signup')
      }
    })
})

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('loginToken')
  res.send('logged-out!')
})



app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

const PORT = 3030
app.listen(PORT, () =>
  loggerService.info(`Server listening on port http://127.0.0.1:${PORT}/`)
)

function handleCookies(req, res, bug) {
  let visitedBugs = req.cookies.visitedBugs
    ? JSON.parse(req.cookies.visitedBugs)
    : []

  const idIdx = visitedBugs.indexOf(bug._id)

  if (visitedBugs.length > 3) return res.status(401).send('Wait for a bit')

  if (idIdx === -1) {
    visitedBugs.push(bug._id)
    visitedBugs = JSON.stringify(visitedBugs)
    res.cookie('visitedBugs', visitedBugs, { maxAge: 7000 })
  }

  res.send(bug)
}
