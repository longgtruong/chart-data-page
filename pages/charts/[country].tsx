import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Chart } from '../../src/components/Chart'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data: apple } = await axios.get(`https://chart-data-tools.vercel.app/apple-music/songs/${ctx.params?.country}`)
    const { data: itunes } = await axios.get(`https://chart-data-tools.vercel.app/itunes/songs/${ctx.params?.country}`)
    return {
        props: {
            apple,
            itunes
        }
    }
}

function Charts({ apple, itunes }: any) {

    const { query } = useRouter();
    console.log(query.country)
    console.log(apple)

    return (
        <div className="mt-6 flex max-w-8xl flex-wrap justify-around sm:w-full">
            <div className="mt-6 w-98">
                <h1 className="text-xl text-white font-bold">Apple Music {query.country?.toString().toUpperCase()}</h1>
                <Chart data={apple}/>
            </div>
            <div className="mt-6 w-98">
                <h1 className="text-xl text-white font-bold">iTunes {query.country?.toString().toUpperCase()}</h1>
                <Chart data={itunes}/>
            </div>
        </div>
    )
}

export default Charts