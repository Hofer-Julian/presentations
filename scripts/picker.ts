// Adapted from https://github.com/antfu/talks/blob/a4a8fb23aacc316ccdb87ad1934f23ebeeb26d54/scripts/picker.ts
import { listPresentationFolders } from './presentations'
import process from 'node:process'
import prompts from 'prompts'
import { execa } from 'execa'

async function startPicker(args: string[]) {
  const folders = await listPresentationFolders()

  const result = await prompts([
    {
      type: 'select',
      name: 'folder',
      message: 'Pick a folder',
      choices: folders.map(folder => ({ title: folder, value: folder })),
    },
  ])

  if (result.folder) {
    await execa('slidev', args, {
      cwd: new URL(`../${result.folder}`, import.meta.url),
      stdio: 'inherit',
    })
  }
}

await startPicker(process.argv.slice(2))
