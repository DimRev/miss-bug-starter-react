

export function BugPreview({bug}) {

    return <article className="bug-preview">
        <h4>{bug.title}</h4>
        <img src={`https://api.dicebear.com/7.x/rings/svg?seed=${bug.title}`} alt="bug img" />
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Submitted By:{bug.submittedBy.fullname}</p>
    </article>
}