import { ChartItem } from "./ChartItem"

type Props = {
    data: []
}

export const Chart = ({data}: Props) => {
    return (
        <div>
            {data.map((el, i)=>(
                <ChartItem chartObject={el} key={i}/>
            ))}
        </div>
    )
}