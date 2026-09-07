import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { execa } from 'execa'
import { parse } from 'yaml'
import { listPresentationFolders } from './presentations'
import { renderIndex } from './render-index'

const { values } = parseArgs({
  options: { base: { type: 'string', default: '/' } },
})
const base = values.base!
if (!base.startsWith('/') || !base.endsWith('/') || /[?#\\]/.test(base))
  throw new Error('base must be an absolute URL path with a trailing slash')

const root = fileURLToPath(new URL('..', import.meta.url))
const output = path.join(root, 'dist')
const folders = await listPresentationFolders()
if (folders.length === 0)
  throw new Error('no presentations found')

await fs.rm(output, { recursive: true, force: true })
await fs.mkdir(output, { recursive: true })
const presentations: { slug: string; title: string; date: string }[] = []

for (const slug of folders) {
  const directory = path.join(root, slug)
  const source = await fs.readFile(path.join(directory, 'slides.md'), 'utf8')
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  const metadata = frontmatter ? parse(frontmatter[1]) : undefined
  const body = frontmatter ? source.slice(frontmatter[0].length) : source
  const title = metadata?.title ?? body.match(/^#\s+(.+)$/m)?.[1] ?? slug
  if (typeof title !== 'string')
    throw new Error(`presentation title must be a string: ${slug}`)

  console.log(`\nBuilding ${slug}`)
  await execa('slidev', [
    'build', 'slides.md',
    '--base', `${base}${encodeURIComponent(slug)}/`,
    '--out', path.join(output, slug),
    '--router-mode', 'hash',
  ], { cwd: directory, stdio: 'inherit' })

  presentations.push({ slug, title, date: slug.slice(0, 7) })
}

await fs.writeFile(path.join(output, 'index.html'), renderIndex(presentations))
await fs.writeFile(path.join(output, '.nojekyll'), '')
console.log(`\nBuilt ${presentations.length} presentations in ${output}`)
