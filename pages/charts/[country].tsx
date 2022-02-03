import axios from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Chart } from '../../src/components/Chart'
import { countryCodeEmoji } from 'country-code-emoji'
import { COUNTRIES } from '../../src/constant/country'

const HOST = "https://chart-data-tools.vercel.app"
// const HOST = "http://localhost:8080"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data: apple } = await axios.get(`${HOST}/apple-music/songs/${ctx.params?.country}`)
    const { data: itunes } = await axios.get(`${HOST}/itunes/songs/${ctx.params?.country}`)
    const { data: spotify } = await axios.get(`${HOST}/spotify/${ctx.params?.country}`)
    return {
        props: {
            apple,
            itunes,
            spotify
        }
    }
}

function Charts({ apple, itunes, spotify }: any) {

    const { query } = useRouter();
    const country: string | string[] = query.country!
    const emoji = countryCodeEmoji(country.toString())
    const countryName = COUNTRIES.filter((el) => el.code == country)[0].name

    return (
        <div className="content mt-5">
            <Head>
                <title>{emoji} {query.country?.toString().toUpperCase()} Charts</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
            </Head>
            <Link href="/">
                <a className="text-blue-400	py-2 px-14 text-white flex items-center" >
                    <svg className="svg-icon mr-2" viewBox="0 0 20 20">
                        <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
                    </svg>
                Go back
                </a>
            </Link>
            <div className="charts flex flex-wrap lg:m-10 sm:m-5">
                {apple.length ? <div className="mt-6 w-92 flex-1 m-5">
                    <h1 className="text-xl text-white font-bold">Apple Music {countryName} {emoji}</h1>
                    <Chart data={apple} platform="Apple Music" country={{
                        name: countryName,
                        emoji: emoji
                    }} />
                </div> : null}
                {spotify.length ?
                    <div className="mt-6 w-92 flex-1 m-5">
                        <h1 className="text-xl text-white font-bold">Spotify {countryName} {emoji}</h1>
                        <Chart data={spotify} platform="Spotify" country={{
                            name: countryName,
                            emoji: emoji
                        }} />
                    </div> : null
                }
                {itunes.length ? <div className="mt-6 w-92 flex-1 m-5">
                    <h1 className="text-xl text-white font-bold">iTunes {countryName} {emoji}</h1>
                    <Chart data={itunes} platform="iTunes" country={{
                        name: countryName,
                        emoji: emoji
                    }} />
                </div> : null
                }
            </div>

        </div>
    )
}

export default Charts