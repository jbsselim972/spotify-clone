import Head from 'next/head'
import Image from 'next/image'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'
import {getSession} from "next-auth/react"
import Player from '../components/Player'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        {/**Sidebar */}
        <Sidebar />
        {/**Center */}
        <Center />
      </main>

      <div className='sticky bottom-0'>
        {/**Player */}
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);

  return {
    props:{
      session
    }
  }
}