import { bugService } from '../services/bug.service.js'
import { userService } from '../services/user.service.js'
import { utilService } from '../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { BugSorter } from '../cmps/BugSorter.jsx'

const { useState, useEffect, useRef } = React

export function BugIndex() {
  const [bugs, setBugs] = useState(null)
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  const [sortBy, setSortBy] = useState({ type: 'title', dir: 1 })
  const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))
  const user = userService.getLoggedinUser()

  useEffect(() => {
    loadBugs()
  }, [filterBy, sortBy])

  function loadBugs() {
    bugService.query(filterBy, sortBy).then(setBugs)
  }

  function onRemoveBug(bugId) {
    bugService
      .remove(bugId)
      .then(() => {
        console.log('Deleted Successfully!')
        const bugsToUpdate = bugs.filter((bug) => bug._id !== bugId)
        setBugs(bugsToUpdate)
        showSuccessMsg('Bug removed')
      })
      .catch((err) => {
        console.log('Error from onRemoveBug ->', err)
        showErrorMsg('Cannot remove bug')
      })
  }

  function onAddBug() {
    const bug = {
      title: prompt('Bug title?'),
      description: prompt('Bug description?'),
      severity: +prompt('Bug severity?'),
      submittedBy: userService.getLoggedinUser(),
    }
    bugService
      .save(bug)
      .then((savedBug) => {
        console.log('Added Bug', savedBug)
        setBugs([...bugs, savedBug])
        showSuccessMsg('Bug added')
      })
      .catch((err) => {
        console.log('Error from onAddBug ->', err)
        showErrorMsg('Cannot add bug')
      })
  }

  function onEditBug(bug) {
    const severity = +prompt('New severity?')
    const bugToSave = { ...bug, severity }
    bugService
      .save(bugToSave)
      .then((savedBug) => {
        console.log('Updated Bug:', savedBug)
        const bugsToUpdate = bugs.map((currBug) =>
          currBug._id === savedBug._id ? savedBug : currBug
        )
        setBugs(bugsToUpdate)
        showSuccessMsg('Bug updated')
      })
      .catch((err) => {
        console.log('Error from onEditBug ->', err)
        showErrorMsg('Cannot update bug')
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      ...filterBy,
      pageIdx: isUndefined(prevFilter.pageIdx) ? undefined : 0,
    }))
  }

  function onChangePageIdx(diff) {
    if (isUndefined(filterBy.pageIdx)) return
    setFilterBy((prevFilter) => {
      let newPageIdx = prevFilter.pageIdx + diff
      if (newPageIdx < 0) newPageIdx = 0

      //TODO: Get max page idx value from server

      return { ...prevFilter, pageIdx: newPageIdx }
    })
  }

  function onTogglePagination() {
    setFilterBy((prevFilter) => {
      return {
        ...prevFilter,
        pageIdx: isUndefined(prevFilter.pageIdx) ? 0 : undefined,
      }
    })
  }

  function isUndefined(value) {
    return value === undefined
  }

  function onSetSortBy(type) {
    if (sortBy.type === type) return onSetSortDir()
    setSortBy((prevSortBy) => ({ ...prevSortBy, type }))
  }

  function onSetSortDir() {
    setSortBy((prevSortBy) => {
      let newDir = prevSortBy.dir * -1
      return { ...prevSortBy, dir: newDir }
    })
  }

  const { title, severity, pageIdx } = filterBy

  return (
    <section className="bug-index-section main-section">
      <h3>Bugs App</h3>
      <main>
        <BugFilter
          filterBy={{ title, severity }}
          onSetFilter={debounceOnSetFilter.current}
        />
        <BugSorter
          sortBy={sortBy}
          onSetSortBy={onSetSortBy}
          onSetSortDir={onSetSortDir}
        />
        {user && <button onClick={onAddBug}>Add Bug ⛐</button>}
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
      <section className="pagination">
        <button onClick={() => onChangePageIdx(1)}>+</button>
        {pageIdx + 1 || 'No Pagination'}
        <button onClick={() => onChangePageIdx(-1)}>-</button>
        <button onClick={onTogglePagination}>Toggle pagination</button>
      </section>
    </section>
  )
}
