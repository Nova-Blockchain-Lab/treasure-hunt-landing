// Flat config (ESLint 9+). `pnpm lint` previously failed outright: the script
// existed but neither eslint nor any config was installed. eslint-config-next
// 16 ships a native flat config, so no FlatCompat wrapper is needed (going
// through FlatCompat throws "Converting circular structure to JSON" here).
import coreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**'] },
  ...(Array.isArray(coreWebVitals) ? coreWebVitals : [coreWebVitals]),
]

export default config
