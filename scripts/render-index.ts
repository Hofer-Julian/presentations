function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function renderIndex(presentations: readonly { slug: string; title: string; date: string; occasion?: string }[]): string {
  const dateFormat = new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const entries = presentations.map(({ slug, title, date, occasion }) => `
        <li>
          <time datetime="${escapeHtml(date)}">${escapeHtml(dateFormat.format(new Date(`${date}-01T00:00:00Z`)))}</time>
          <div class="talk">
            ${occasion ? `<p class="occasion">${escapeHtml(occasion)}</p>` : ''}
            <a href="./${escapeHtml(encodeURIComponent(slug))}/">${escapeHtml(title)}</a>
          </div>
        </li>`).join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Slides from Julian Hofer's talks.">
  <title>Julian's presentations</title>
  <style>
    :root { color-scheme: light; --paper: #f8f6f2; --ink: #001d38; --yellow: #ffd432; --rule: #c8cdd0; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--paper); color: var(--ink); font-family: system-ui, sans-serif; }
    main, footer { width: min(100% - 3rem, 66rem); margin-inline: auto; }
    header { padding-block: clamp(3rem, 9vw, 7rem) 3.5rem; }
    h1 { margin: 0; font-family: 'Trebuchet MS', 'Avenir Next', sans-serif; font-size: clamp(2.5rem, 8vw, 6rem); font-weight: 700; line-height: 1.08; letter-spacing: -.055em; }
    h1 span { display: table; padding: 0 .12em .08em; margin-left: -.12em; background: var(--yellow); }
    header p { max-width: 40rem; margin: 1.75rem 0 0; font-size: 1.125rem; line-height: 1.6; }
    ul { margin: 0; padding: 0; list-style: none; border-top: 2px solid var(--ink); }
    li { display: grid; grid-template-columns: 12rem minmax(0, 1fr); gap: 1.5rem; align-items: start; padding-block: 1.6rem; border-bottom: 1px solid var(--rule); }
    time { padding-top: .3rem; font-family: ui-monospace, 'Cascadia Code', monospace; font-size: .875rem; line-height: 1.6; }
    a { color: inherit; text-decoration-thickness: .06em; text-underline-offset: .2em; }
    .talk { min-width: 0; }
    .occasion { margin: 0 0 .3rem; color: #555f68; font-family: ui-monospace, 'Cascadia Code', monospace; font-size: .8rem; font-weight: 700; letter-spacing: .08em; line-height: 1.5; text-transform: uppercase; }
    li a { display: inline; font-size: clamp(1.25rem, 2.8vw, 1.75rem); line-height: 1.35; font-weight: 600; overflow-wrap: anywhere; }
    a:hover { background: var(--yellow); }
    a:focus-visible { outline: 3px solid var(--ink); outline-offset: 5px; background: var(--yellow); }
    .empty { padding-block: 1.6rem; border-top: 2px solid var(--ink); line-height: 1.6; }
    footer { padding-block: 2.5rem 3rem; font-size: .875rem; line-height: 1.6; }
    @media (max-width: 40rem) {
      li { grid-template-columns: minmax(0, 1fr); gap: .5rem; padding-block: 1.3rem; }
      header { padding-bottom: 2.5rem; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>Julian's <span>presentations</span></h1>
      <p>Talks about package management, scientific software, Python, and Rust, presented at conferences and community events.</p>
    </header>
    <section aria-label="Presentation archive">
      ${presentations.length ? `<ul role="list">${entries}
      </ul>` : '<p class="empty">No presentations are published yet.</p>'}
    </section>
  </main>
  <footer><a href="https://github.com/Hofer-Julian/presentations">Source on GitHub</a></footer>
</body>
</html>
`
}
