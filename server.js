import express from 'express'
import { bugService } from './service/bugs.service.js'
import { loggerService } from './service/logger.service.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())


//Get Bugs
app.get('/api/bug/', (req, res) => {
  bugService
    .query()
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
  console.log(bugToSave);
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
  bugService
    .remove(bugId)
    .then((bug) => res.send(bug))
    .catch((err) => {
      loggerService.error('cannot remove bug', err)
      res.status(404).send('Cannot remove bug')
    })
})

app.listen(3030, () => {
  console.log('server ready at port 3030')
})

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

