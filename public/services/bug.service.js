import { utilService } from './util.service.js'

const BASE_URL = '/api/bug/'

// _createBugs()

export const bugService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
}

function query(filterBy, sortBy) {
  return axios
    .get(BASE_URL, { params: { ...filterBy, ...sortBy } })
    .then((res) => res.data)
}

function getById(bugId) {
  return axios.get(BASE_URL + bugId).then((res) => res.data)
}

function remove(bugId) {
  return axios.delete(BASE_URL + bugId).then(() => bugId)
}

function save(bug) {
  if (bug._id) {
    return axios.put(BASE_URL, bug).then((res) => res.data)
  } else {
    return axios.post(BASE_URL, bug).then((res) => res.data)
  }
}

function getDefaultFilter() {
  return { title: '', severity: 0, pageIdx: 0 }
}
