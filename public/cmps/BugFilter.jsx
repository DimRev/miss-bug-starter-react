const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function onSetFilterBy(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { title, severity } = filterByToEdit
  return (
    <section className="bug-filter main-layout full">
      <h2>Filter Our Bugs</h2>
      <form onSubmit={onSetFilterBy}>
        <label htmlFor="txt">Title: </label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          id="title"
          name="title"
        />

        <label htmlFor="minSpeed">Severity: </label>
        <input
          value={severity || ''}
          onChange={handleChange}
          type="number"
          id="severity"
          name="severity"
        />

        <button>Submit</button>
      </form>
    </section>
  )
}
