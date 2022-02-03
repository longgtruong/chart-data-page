type Props = {
    chartObject: any
}

export const ChartItem = ({ chartObject }: Props) => {

    const rank = chartObject["Rank"]
    const title = chartObject["Title"]
    const artist = chartObject["Artist"]
    const link = chartObject["Link"]
    const image = chartObject["Image"]

    return (
        <a href={link}>
        <div className="chart-item text-left text-sky-500 flex mt-2 bg-slate-100 hover:bg-sky-400/50 hover:text-white duration-200 ease-in-out p-2 rounded-md items-center">
            <div className="w-16 h-16">
                <img className="rounded-full shadow-sm" src={image} />
            </div>
            <div className="text-l  font-bold m-2">{rank}</div>
            <div className="title ml-2">
                <div className="text-l font-bold info">{title}</div>
                <div className="text-l text-ellipsis overflow-hidden info">{artist}</div>
            </div>
        </div>
        </a>
    )
}