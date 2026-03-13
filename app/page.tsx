import { cookies } from 'next/headers'
import { getDictionary } from '@/dictionaries'
import { PageClient } from '@/components/page-client'
import { AB_TEST_COOKIE, applyVariantOverrides, type Variant } from '@/lib/ab-test'

export default async function Page() {
  const cookieStore = await cookies()
  const variant = (cookieStore.get(AB_TEST_COOKIE)?.value || 'control') as Variant

  const baseDict = await getDictionary('en')
  const dict = applyVariantOverrides(baseDict, variant, 'en')

  return <PageClient dict={dict} lang="en" variant={variant} />
}
