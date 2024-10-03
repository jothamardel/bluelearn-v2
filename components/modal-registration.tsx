"use client";

import { useState, useRef, Fragment, useEffect } from "react";
import type { StaticImageData } from "next/image";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

interface ModalVideoProps {
  thumb: StaticImageData;
  thumbWidth: number;
  thumbHeight: number;
  thumbAlt: string;
  video: string;
  videoWidth: number;
  videoHeight: number;
}

interface ModalRegistrationProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setSelected: (value: {
    type: string;
    target: string;
    email: string;
    amount: number;
  }) => void;
  selected: {
    type: string;
    target: string;
    email: string;
    amount: number;
  };
  httpInitiateTransaction: () => void;
  loading: boolean;
}

export default function ModalRegistration({
  showModal,
  selected,
  setSelected,
  setShowModal,
  httpInitiateTransaction,
  loading,
}: ModalRegistrationProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showModal) {
      setModalOpen(true);
    }
  }, [showModal]);

  return (
    <div>
      <Transition
        show={modalOpen}
        as={Fragment}
        afterEnter={() => videoRef.current?.play()}
      >
        <Dialog
          initialFocus={videoRef}
          onClose={() => {
            setModalOpen(false);
            setShowModal(false);
          }}
        >
          {/* Modal backdrop */}
          <TransitionChild
            as="div"
            className="fixed inset-0 z-[99999] bg-black bg-opacity-75 transition-opacity"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />
          {/* End: Modal backdrop */}

          {/* Modal dialog */}
          <TransitionChild
            as="div"
            className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ttransition ease-out duration-200"
            leaveFrom="oopacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="w-1/2 mx-auto h-full flex items-center ">
              <DialogPanel className="w-full h-fit aspect-video bg-white overflow-hidden p-4 rounded-md">
                <div className="flex justify-center">
                  <Image
                    src="/images/africa.png"
                    alt="africa"
                    width={200}
                    height={200}
                  />
                </div>
                <h1 className="h3 font-bold text-center">
                  Your Journey Begins Here
                </h1>
                <p className="text-gray-500 text-center max-w-3xl mx-auto my-2">
                  Thank you for your interest in applying to Bluelearn Africa .
                  To continue your application process, please note that you
                  will be charged ₦{selected.amount} fee. Please, check the
                  payment section for tuition information and payment plan
                </p>
                <div className=" p-2 flex justify-center w-full">
                  <input
                    className="w-1/2 rounded-md py-2 outline-none"
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setSelected({ ...selected, email: e.target.value })
                    }
                  />
                </div>
                <div className=" p-2 flex justify-center w-full mb-4">
                  {loading ? (
                    <button
                      className="btn w-1/2  inline-flex items-center text-white bg-gray-900 hover:bg-gray-800 group"
                      disabled={loading}
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      className="btn w-1/2  inline-flex items-center text-white bg-gray-900 hover:bg-gray-800 group"
                      onClick={() => {
                        console.log({ selected });
                        httpInitiateTransaction();
                      }}
                      disabled={loading}
                    >
                      Proceed
                      <span className="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                        <svg
                          className="fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="8"
                        >
                          <path d="m10.865.013.747.148c.243.065.481.143.716.235.495.18.97.42 1.415.716.265.192.571.343.858.55.096.064.192.135.288.209l.196.154.192.178c.09.08.175.168.254.262.189.21.33.466.414.747.076.275.073.568-.008.84-.09.27-.236.513-.427.708-.096.1-.198.191-.306.274l-.152.117-.116.074c-.369.252-.75.482-1.14.69-.577.315-1.153.585-1.701.932-.408.262-.803.549-1.182.86-.083.064-.16.136-.247.193a.918.918 0 0 1-.113.072.644.644 0 0 1-.118.016.708.708 0 0 1-.191.01.559.559 0 0 1-.246-.088l-.072-.054a1.481 1.481 0 0 1-.141-.107c-.128-.122-.1-.377.05-.726.036-.08.079-.156.128-.226l.316-.401c.164-.188.336-.372.514-.543.178-.17.356-.342.546-.493.19-.152.394-.265.59-.39.53-.329 1.05-.626 1.552-.93-.159.018-.32.034-.48.04-.511.036-1.026.044-1.546.048a43.432 43.432 0 0 1-2.31-.058l-.005-.02a78.728 78.728 0 0 0-2.292-.148c-.279-.016-.558.01-.837-.006L4.543 3.81l-.977-.046a19.357 19.357 0 0 1-.49-.029 12.6 12.6 0 0 0-1.303.013l-.828.055-.406.021H.335l-.18.008c-.145 0-.208-.15-.102-.356.16-.268.422-.46.723-.531.57-.117 1.144-.205 1.72-.264.287-.026.576-.048.865-.053.29-.004.578.01.865.042.69.065 1.408-.015 2.113-.015.776.003 1.549.02 2.324.04l1.428.039 1.087.039c.359.012.716.02 1.075.013.442-.008.879-.065 1.318-.112a3.672 3.672 0 0 0-.186-.166 9.045 9.045 0 0 0-1.06-.762 9.82 9.82 0 0 0-1.034-.537 5.9 5.9 0 0 1-1.284-.854c-.12-.115-.053-.199.12-.26a1.55 1.55 0 0 1 .738-.083Z" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
          {/* End: Modal dialog */}
        </Dialog>
      </Transition>
    </div>
  );
}
