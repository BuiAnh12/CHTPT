import Link from "next/link";
import React, { useState } from "react";
import { FaSort } from "react-icons/fa";
import { IoSwapHorizontal } from "react-icons/io5";

type Props = {};

const FindTicketModal = (props: Props) => {
  const [fromCity, setFromCity] = useState("Hà Nội (HAN), Việt Nam");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengerCount, setPassengerCount] = useState("");

  return (
    <>
      <div className='flex gap-2'>
        <button className='bg-[#0980A0] text-[#fff] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
          Khứ hồi
        </button>
        <button className='bg-[#f0eee9] text-[#333] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
          Một chiều
        </button>
        <button className='bg-[#f0eee9] text-[#333] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
          Nhiều chặng
        </button>
      </div>

      <div className='mb-[5px] flex gap-2'>
        <div className='w-[59%] flex items-center gap-2'>
          <div className='relative w-[47%]'>
            <input
              id='city-from'
              type='text'
              className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            />
            <label htmlFor='city-from' className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'>
              Từ
            </label>
            <FaSort className='absolute top-[35%] right-[10px] text-[13px] text-[#bbb] cursor-pointer' />
          </div>

          <IoSwapHorizontal className='font-semibold text-[#166987]' />

          <div className='relative w-[47%]'>
            <input
              id='city-to'
              type='text'
              className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            />
            <label htmlFor='city-to' className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'>
              Đến
            </label>
            <FaSort className='absolute top-[35%] right-[10px] text-[13px] text-[#bbb] cursor-pointer' />
          </div>
        </div>

        <div className='w-[40%] flex items-center gap-2'>
          <div className='relative w-[48%]'>
            <input
              type='date'
              className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[10px] pt-[15px] pb-[6px] outline-none w-full'
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>

          <div className='relative w-[48%] mr-[10px]'>
            <input
              type='date'
              className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[10px] pt-[15px] pb-[6px] outline-none w-full'
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='flex justify-between mt-[20px] mb-[15px]'>
        <div className='relative w-[28%]'>
          <input
            id='passenger-count'
            type='number'
            className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[10px] pt-[15px] pb-[6px] outline-none w-full'
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
            min={1}
          />
          <label htmlFor='passenger-count' className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'>
            Hành khách
          </label>
        </div>

        <Link
          href='/booking/flight'
          className='w-[160px] h-[40px] rounded-[4px] text-[#000] bg-[#e6b441] hover:bg-[#fff] border-[2px] border-[#e6b441] flex items-center justify-center font-semibold'
        >
          TÌM CHUYẾN BAY
        </Link>
      </div>
    </>
  );
};

export default FindTicketModal;
