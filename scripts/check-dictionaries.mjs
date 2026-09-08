// Asserts every dictionaries/<locale>.json has the exact same key shape as
// en.json. A missing key renders `undefined` in the UI; an extra key is dead
// weight. The locale list is read straight out of i18n/config.ts so adding a
// locale there without adding its dictionary fails here.
// Run: node scripts/check-dictionaries.mjs
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const config = readFileSync(join(root, 'i18n/config.ts'), 'utf8')
const locales = [...config.match(/export const locales = \[(.*?)\]/s)[1].matchAll(/'([a-z-]+)'/g)].map(
  (m) => m[1]
)
const load = (l) => JSON.parse(readFileSync(join(root, 'dictionaries', `${l}.json`), 'utf8'))

function paths(node, prefix = '', out = []) {
  if (Array.isArray(node)) node.forEach((v, i) => paths(v, `${prefix}[${i}]`, out))
  else if (node && typeof node === 'object')
    for (const [k, v] of Object.entries(node)) paths(v, `${prefix}.${k}`, out)
  else out.push(prefix)
  return out
}

const en = new Set(paths(load('en')))
let failed = false
for (const l of locales.filter((l) => l !== 'en')) {
  const got = new Set(paths(load(l)))
  const missing = [...en].filter((p) => !got.has(p))
  const extra = [...got].filter((p) => !en.has(p))
  if (missing.length || extra.length) {
    failed = true
    console.error(`x ${l}: ${missing.length} missing, ${extra.length} extra`)
    if (missing.length) console.error(`   missing: ${missing.slice(0, 8).join(', ')}`)
    if (extra.length) console.error(`   extra:   ${extra.slice(0, 8).join(', ')}`)
  } else {
    console.log(`ok ${l}: ${got.size} keys match en`)
  }
}
if (failed) process.exit(1)
console.log(`All ${locales.length} dictionaries match en.json (${en.size} keys).`)
