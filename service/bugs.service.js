import fs from 'fs'
import { utilService } from './utils.service.js'

export const bugService = {
  query,
  getById,
  remove,
  save,
}

const bugs = utilService.readJsonFile('data/bugs.json')

function query() {
  return Promise.resolve(bugs)
}

function getById(bugId) {
  const bug = bugs.find((bug) => {
    return bug._id === bugId
  })
  if (!bug) return Promise.reject('Bug does not exist!')

  return Promise.resolve(bug)
}

function remove(bugId) {
  const bugIdx = bugs.findIndex((bug) => bug._id === bugId)
  if (bugIdx === -1) return Promise.reject('bug does not exist')
  bugs.splice(bugIdx, 1)
  return _saveBugsToFile()
}

function save(bug) {
  bug.createdAt = Date.now()
  if (bug._id) {
    const bugIdx = bugs.findIndex((currBug) => currBug._id === bug._id)
    bugs[bugIdx] = bug
  } else {
    bug._id = utilService.makeId()
    bugs.unshift(bug)
  }

  return _saveBugsToFile()
    .then(() => bug)
    .catch(err => reject(err))
}

function _saveBugsToFile() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bugs, null, 2)
    fs.writeFile('data/bugs.json', data, (err) => {
      if (err) {
        console.error('Could not save bug changes',err)
        return reject(err)
      }
      resolve()
    })
  })
}
