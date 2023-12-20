export function BugSorter({ sortBy, onSetSortBy, onSetSortDir }) {
  return (
    <section className="bug-sorter main-layout full">
      <h4>Sorter</h4>
      <button
        className={sortBy === 'title' ? 'active' : ''}
        onClick={() => onSetSortBy('title')}>
        Title
      </button>
      <button
        className={sortBy === 'severity' ? 'active' : ''}
        onClick={() => onSetSortBy('severity')}>
        Severity
      </button>
      <button
        className={sortBy === 'date' ? 'active' : ''}
        onClick={() => onSetSortBy('date')}>
        Date
      </button>
      <button className="direction-btn" onClick={() => onSetSortDir()}>
        Direction
      </button>
    </section>
  )
}
