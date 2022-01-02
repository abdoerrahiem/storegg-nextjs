import { useEffect } from 'react'
import Head from 'next/head'
import AOS from 'aos'

import Navbar from '../components/organisms/Navbar'
import MainBanner from '../components/organisms/MainBanner'
import TransactionStep from '../components/organisms/TransactionStep'
import FeaturedGame from '../components/organisms/FeaturedGame'
import Reached from '../components/organisms/Reached'
import Story from '../components/organisms/Story'
import Footer from '../components/organisms/Footer'
import store from '../store'
import { getFeaturedGame } from '../store/actions'
import ContentHead from '../components/atoms/ContentHead'

export default function HomePage() {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <>
      <ContentHead />
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame />
      <Reached />
      <Story />
      <Footer />
    </>
  )
}

export const getServerSideProps = store.getServerSideProps(
  ({ dispatch }) => async (): Promise<any> => {
    await dispatch(getFeaturedGame())
  }
)
