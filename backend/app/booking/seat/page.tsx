"use client";
import Link from "next/link";
import React from "react";
import { FaAngleDown, FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoAirplaneSharp } from "react-icons/io5";

type Props = {};

const page = (props: Props) => {
  return (
    <div className='w-[75%] my-[20px] mx-auto grid grid-cols-12'>
      <div className='col-span-8 aircraft'>
        <div className='aircraft-body'>
          <div className='top-left-exists'>
            <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
          </div>
          <div className='top-right-exists'>
            <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
          </div>

          <div className='seats'>
            <div className='seats-triple first-line'>
              <div data-letter='A' className='active seat'></div>
              <div data-letter='B' className='active seat'></div>
              <div data-letter='C' className='active seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='active seat'></div>
              <div className='active seat'></div>
              <div className='active seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='active seat'></div>
              <div className='active seat'></div>
              <div className='active seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='active seat'></div>
              <div className='active seat'></div>
              <div className='active seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='empty seat'></div>
              <div className='empty seat'></div>
              <div className='empty seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='empty seat'></div>
              <div className='empty seat'></div>
              <div className='empty seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple last-line'>
              <div data-letter='A' className='seat empty'></div>
              <div data-letter='B' className='seat empty'></div>
              <div data-letter='C' className='seat empty'></div>
            </div>
          </div>
          <div className='seats'>
            <div className='seats-triple first-line' data-line='1'>
              <div data-letter='D' className='active seat'></div>
              <div data-letter='E' className='active seat'></div>
              <div data-letter='F' className='active seat'></div>
            </div>
            <div className='seats-triple' data-line='2'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='3'>
              <div className='empty seat'></div>
              <div className='empty seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='4'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='5'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='6'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='7'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='8'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='9'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='10'>
              <div className='empty seat'></div>
              <div className='empty seat'></div>
              <div className='empty seat'></div>
            </div>
            <div className='seats-triple' data-line='11'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='12'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='13'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='14'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='15'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='16'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='17'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='18'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='19'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='20'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='21'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='22'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='23'>
              <div className='empty seat'></div>
              <div className='empty seat'></div>
              <div className='empty seat'></div>
            </div>
            <div className='seats-triple' data-line='24'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='25'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='26'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='27'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='28'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='29'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='30'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple' data-line='31'>
              <div className='seat'></div>
              <div className='seat'></div>
              <div className='seat'></div>
            </div>
            <div className='seats-triple last-line' data-line='32'>
              <div data-letter='D' className='seat empty'></div>
              <div data-letter='E' className='seat empty'></div>
              <div data-letter='F' className='seat empty'></div>
            </div>
          </div>

          <div className='bottom-left-exists'>
            <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
          </div>
          <div className='bottom-right-exists'>
            <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
          </div>
          <div className='aircraft-top-wing'>
            <div className='exists'>
              <div>
                <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
              </div>
              <div>
                <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
              </div>
            </div>
          </div>
          <div className='aircraft-bottom-wing'>
            <div className='exists'>
              <div>
                <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
              </div>
              <div>
                <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
              </div>
            </div>
          </div>
          <div className='aircraft-head'>
            <div className='aircraft-head-body'>
              <div className='windows'>
                <img alt='' src='https://i.ibb.co/F5hp29L/windows.png' />
              </div>
              {/* <div className='front-lavatory'>
              <img alt='' src='https://i.ibb.co/NVT4SZ1/lavatory.png' />
            </div> */}
            </div>
          </div>
          <div className='aircraft-tail'>
            <div className='aircraft-tail-body'>
              <div className='back-lavatory'>
                <img alt='' src='https://i.ibb.co/NVT4SZ1/lavatory.png' />

                <img alt='' src='https://i.ibb.co/NVT4SZ1/lavatory.png' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-4'>
        <div
          className=' bg-white rounded-md overflow-hidden mb-[20px]'
          style={{
            boxShadow: "0 4px 8px rgba(0,0,0,.175)",
          }}
        >
          <h3 className='font-semibold text-[20px] text-[#007390] border-b-[2px] border-[#0980A0] px-[10px] py-[15px]'>
            Chi tiết chuyến bay
          </h3>

          <div className=''>
            <div className='flex items-center justify-between px-[10px] py-[6px] bg-[#cce3e0] cursor-pointer'>
              <div className='flex items-center gap-2'>
                <IoAirplaneSharp className='text-[#007390]' />
                <div className='flex items-center gap-1'>
                  <span className='text-[13px]'>HAN</span>
                  <FaArrowRightLong className='text-[#007390]' />
                  <span className='text-[13px]'>SGN</span>
                </div>
              </div>

              <div className='flex gap-1'>
                <span className='font-bold text-[17px] text-[#007390]'>469,000</span>
                <span className='text-[13px] text-[#007390]'>VND</span>

                <FaAngleDown className='ml-[8px] mt-[4px] text-[#007390]' />
              </div>
            </div>

            <div className=''>
              <div className='px-[10px] py-[6px] bg-[#fdfae9] flex gap-1'>
                <span className='font-bold text-[#007390]'>Khởi hành</span>
                <span>22:30, 21 tháng 10 2024</span>
              </div>

              <div className='p-[10px] flex flex-col'>
                <div className='flex items-center gap-1'>
                  <span className='font-bold text-[14px]'>Hà Nội (HAN)</span>
                  <FaArrowRightLong className='font-bold text-[14px]' />
                  <span className='font-bold text-[14px]'>Tp. Hồ Chí Minh (SGN)</span>
                </div>
                <p className='text-[13px] my-[2px]'>Thời gian: 2 tiếng 15 phút / Bay thẳng</p>
                <p className='text-[13px] my-[2px]'>VN 269 Airbus A321</p>
                <p className='text-[13px] my-[2px] text-[#007390]'>Hãng khai thác PTIT Airlines</p>
              </div>

              <div className='px-[10px] py-[6px] bg-[#fdfae9] flex flex-col'>
                <div className='flex justify-between items-center'>
                  <span className='font-bold text-[13px] text-[#007390]'>Người lớn x 1</span>
                  <span className=''>
                    <span className='font-bold text-[17px] text-[#007390] mr-[4px]'>469,000</span>
                    <span className='text-[13px] text-[#007390]'>VND</span>
                  </span>
                </div>
                <span className='text-[13px]'>NGUYEN NGOC DAT</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className='bg-white rounded-md overflow-hidden'
          style={{
            boxShadow: "0 4px 8px rgba(0,0,0,.175)",
          }}
        >
          <h3 className='font-semibold text-[20px] text-[#007390] border-b-[2px] border-[#0980A0] px-[10px] py-[15px]'>
            Xem chú giải
          </h3>

          <div className='flex gap-2 px-[10px] py-[15px]'>
            <div className='flex flex-col items-center'>
              <div className='h-[40px] flex items-center justify-center mb-[4px]'>
                <div className='seat active'></div>
              </div>
              <p className='text-[13px]'>Chỗ ngồi đã </p>
              <p className='text-[13px]'>chọn</p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='h-[40px] flex items-center justify-center mb-[4px]'>
                <div className='seat'></div>
              </div>
              <p className='text-[13px]'>Không còn</p>
              <p className='text-[13px]'>trống</p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='h-[40px] flex items-center justify-center mb-[4px]'>
                <div className='seat empty'></div>
              </div>
              <p className='text-[13px]'>Chỗ ngồi còn</p>
              <p className='text-[13px]'>trống</p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='h-[40px] flex items-center justify-center mb-[4px]'>
                <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
              </div>
              <p className='text-[13px]'>Lối thoát</p>
              <p className='text-[13px]'>hiểm</p>
            </div>
          </div>
        </div>

        <div className='my-[20px] flex justify-end'>
          <Link
            href='/booking/traveler'
            className='mr-[10px] text-[18px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[10px] px-[25px] w-fit font-medium flex items-center justify-center'
          >
            <FaArrowLeftLong />
          </Link>

          <Link
            href='/booking/payment'
            className='text-[18px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[10px] px-[15px] w-fit font-medium '
          >
            TIẾP TỤC
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
