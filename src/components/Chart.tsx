import { ChartItem } from "./ChartItem"

type Props = {
    data: [],
    platform: string
    country: any
}

export const Chart = ({ data, platform, country }: Props) => {
    return (
        <div>
            {data.map((el, i) => (
                <ChartItem chartObject={el} key={i} platform={platform} country={country} />
            ))}
        </div>
    )
}