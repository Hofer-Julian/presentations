import fs from 'node:fs/promises'

export async function listPresentationFolders(): Promise<string[]> {
  const root = new URL('..', import.meta.url)
  const entries = await fs.readdir(root, { withFileTypes: true })
  const folders: string[] = []

  for (const entry of entries) {
    if (!entry.isDirectory() || !/^[0-9]{4}-/.test(entry.name))
      continue

    const files = await fs.readdir(new URL(`${entry.name}/`, root), { withFileTypes: true })
    if (files.some(file => file.isFile() && file.name === 'slides.md'))
      folders.push(entry.name)
  }

  return folders.sort((a, b) => b.localeCompare(a))
}
