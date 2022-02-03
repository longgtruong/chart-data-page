import type { NextPage } from 'next'
import Head from 'next/head'
import { COUNTRIES } from '../src/constant/country'
import { useState } from 'react'
import Link from 'next/link'


const Home: NextPage = (data) => {
  const getInitialState = () => {
    const value = "us"
    return value;
  };

  const [value, setValue] = useState(getInitialState)

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Charts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold text-white mb-5">
          Charts around the world
        </h1>
        <select value={value} onChange={handleChange}>
          {COUNTRIES.map((el, i) => (
            <option value={el.code} key={i}>{el.name}</option>
          ))}
        </select>
          <a className="bg-sky-500 mt-5 py-2 px-5 rounded-full text-white" href={`/charts/${value}`}>
            <h1 className="text-m font-bold text-white">
              Get charts
            </h1>
          </a>
      </main>

    </div>
  )
}

export default Home
