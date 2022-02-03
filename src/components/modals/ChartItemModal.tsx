import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { Share } from '@capacitor/share';
import { isMobile } from 'react-device-detect'
import { Alert } from "@chakra-ui/alert";

type Props = {
    country: any
    platform: string
    chartObject: any
    isOpen: boolean
    handleClose: () => void
    handleShare: () => void
}



export const ChartItemModal = ({ country, platform, chartObject, isOpen, handleClose, handleShare }: Props) => {




    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={handleClose}
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
              </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {platform} {country.name} {country.emoji}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="chart-item text-left text-stone-600	 flex mt-2 bg-slate-100 hover:bg-sky-400/50 hover:text-white duration-200 ease-in-out p-2 rounded-md items-center">
                                        <div className="text-xl font-bold my-2 mx-4">{chartObject.rank}</div>
                                        {chartObject.streams ? <div className="title ml-2">
                                            <div className="text-l font-bold info">{chartObject.title}</div>
                                            <div className="text-l text-ellipsis overflow-hidden info">{chartObject.artist}</div>
                                            <div className="text-l font-bold info">{chartObject.streams} streams</div>
                                        </div>
                                            : <div className="title ml-2 lg:my-3">
                                                <div className="text-l font-bold info">{chartObject.title}</div>
                                                <div className="text-l text-ellipsis overflow-hidden info">{chartObject.artist}</div>
                                            </div>
                                        }
                                    </div>
                                </div>

                                <div className="mt-4 flex">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={handleShare}
                                    >
                                        Share
                                </button>
                                    <a
                                        type="button"
                                        className="ml-5 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        href={chartObject.link}
                                    >
                                        Play / Buy
                                </a>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}