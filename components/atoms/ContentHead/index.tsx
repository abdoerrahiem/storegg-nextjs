import Head from 'next/head'

interface ContentHeadTypes {
  title?: string
  description?: string
}

export default function ContentHead({ title, description }: ContentHeadTypes) {
  return (
    <Head>
      <title>{title ?? 'StoreGG - Get a New Experience in Gaming'}</title>
      <meta
        name='description'
        content={
          description ??
          'Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati'
        }
      />
      <meta
        property='og:title'
        content='StoreGG - Get a New Experience in Gaming'
      />
      <meta
        property='og:description'
        content='Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati'
      />
      <meta property='og:image' content='https://imageurlkalian' />
      <meta property='og:url' content='https://storegg.com' />
    </Head>
  )
}
