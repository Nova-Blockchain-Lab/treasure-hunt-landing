import { cookies } from 'next/headers'
import { getDictionary } from '@/dictionaries'
import type { Locale } from '@/i18n/config'
import { PageClient } from '@/components/page-client'
import { AB_TEST_COOKIE, applyVariantOverrides, type Variant } from '@/lib/ab-test'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const cookieStore = await cookies()
  const variant = (cookieStore.get(AB_TEST_COOKIE)?.value || 'control') as Variant

  const baseDict = await getDictionary(lang as Locale)
  const dict = applyVariantOverrides(baseDict, variant, lang as Locale)

  return <PageClient dict={dict} lang={lang} variant={variant} />
}
