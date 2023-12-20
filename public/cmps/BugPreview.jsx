

export function BugPreview({bug}) {

    return <article className="bug-preview">
        <h4>{bug.title}</h4>
        <h1>🐛</h1>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Submitted By:{bug.submittedBy.fullname}</p>
    </article>
}