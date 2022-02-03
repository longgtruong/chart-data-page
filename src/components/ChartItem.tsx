import { Share } from "@capacitor/share"
import { useState } from "react"
import { isMobile } from "react-device-detect"
import { Alert } from "./Alert"
import { ChartItemModal } from "./modals/ChartItemModal"

type Props = {
    chartObject: any
    platform: string
    country: any
}


export const ChartItem = ({ chartObject, platform, country }: Props) => {

    const rank = chartObject["Rank"]
    const title = chartObject["Title"]
    const artist = chartObject["Artist"]
    const link = chartObject["Link"]
    const image = chartObject["Image"]
    const streams = chartObject["Streams"]
    const chartItem = { rank, title, artist, link, image, streams }

    const [isChartItemModalOpen, setIsChartItemModalOpen] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)

    var shareText = `${country.emoji} ${platform} ${country.name} \n\n ${rank}. ${artist} — “${title}”`
    if (streams) {
        shareText += `: ${streams} plays`
    }
    shareText += ` ${link}`


    const handleShare = async () => {
        if (isMobile) {
            await Share.share({
                title: "Charts",
                text: shareText
            })
            setIsChartItemModalOpen(false)
        } else {
            navigator.clipboard.writeText(shareText)
            setSuccessAlert(true)
            setIsChartItemModalOpen(false)
            setTimeout(() => setSuccessAlert(false), 1000)
        }

    }



    return (
        <div className="chart-item">
            <ChartItemModal
                isOpen={isChartItemModalOpen}
                handleClose={() => setIsChartItemModalOpen(false)}
                handleShare={handleShare}
                chartObject={chartItem}
                platform={platform}
                country={country}
            />
            <Alert
                message={"Share text copied to clipboard."}
                isOpen={successAlert}
                variant="success"
            />

            <a onClick={() => setIsChartItemModalOpen(true)}>
                <div className="chart-item text-left text-stone-600	 flex mt-2 bg-slate-100 hover:bg-sky-400/50 hover:text-white duration-200 ease-in-out p-2 rounded-md items-center">
                    <div className="w-16 h-16">
                        <img className="rounded-full shadow-sm" src={image} />
                    </div>
                    <div className="text-xl font-bold my-2 mx-4">{rank}</div>
                    {streams ? <div className="title ml-2">
                        <div className="text-l font-bold info">{title}</div>
                        <div className="text-l text-ellipsis overflow-hidden info">{artist}</div>
                        <div className="text-l font-bold info">{streams} streams</div>
                    </div>
                        : <div className="title ml-2 lg:my-3">
                            <div className="text-l font-bold info">{title}</div>
                            <div className="text-l text-ellipsis overflow-hidden info">{artist}</div>
                        </div>
                    }
                </div>
            </a>
        </div>

    )
}