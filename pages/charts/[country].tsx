import axios from 'axios'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Chart } from '../../src/components/Chart'
import { COUNTRIES } from '../../src/constant/country'

const HOST = "https://chart-data-tools.vercel.app/"
// const HOST = "http://localhost:8080/"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data: apple } = await axios.get(`${HOST}${ctx.params?.country}`)
    const { data: itunes } = await axios.get(`${HOST}${ctx.params?.country}`)
    const { data: spotify } = await axios.get(`${HOST}${ctx.params?.country}`)
    return {
        props: {
            apple,
            itunes,
            spotify
        }
    }
}

function Charts({ apple, itunes, spotify }: any) {

    const getInitialState = () => {
        const value = "us"
        return value;
      };
    
      const [value, setValue] = useState(getInitialState)
    
      const handleChange = (e: any) => {
        setValue(e.target.value)
      }
    

    const { query } = useRouter();
    console.log(spotify)
    return (
        <div className="content">
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
                <h1 className="text-6xl font-bold text-white mb-5">
                    Charts around the world
        </h1>
                <select value={value} onChange={handleChange}>
                    {COUNTRIES.map((el, i) => (
                        <option value={el.code} key={i}>{el.name}</option>
                    ))}
                </select>
                <Link href={`/charts/${value}`}>
                    <a className="bg-sky-500 mt-5 py-2 px-5 rounded-full text-white">
                        <h1 className="text-m font-bold text-white">
                            Get charts
            </h1>
                    </a>
                </Link>
            </main>
            <div className="charts flex flex-wrap lg:m-10 sm:m-5">
                <div className="mt-6 w-92 flex-1 m-5">
                    <h1 className="text-xl text-white font-bold">Apple Music {query.country?.toString().toUpperCase()}</h1>
                    <Chart data={apple} />
                </div>
                <div className="mt-6 w-92 flex-1 m-5">
                    <h1 className="text-xl text-white font-bold">Spotify {query.country?.toString().toUpperCase()}</h1>
                    <Chart data={spotify} />
                </div>
                <div className="mt-6 w-92 flex-1 m-5">
                    <h1 className="text-xl text-white font-bold">iTunes {query.country?.toString().toUpperCase()}</h1>
                    <Chart data={itunes} />
                </div>
            </div>


        </div>
    )
}

export default Charts