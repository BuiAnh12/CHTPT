"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeftLong } from "react-icons/fa6";
import FindTicketModal from "../../../components/FindTicketModal";

type Props = {};

const page = (props: Props) => {
  const [findFlights, setFindFlights] = useState(false);

  return (
    <div>
      <div className={`relative h-full  ${findFlights && "!pt-[20px] !pb-[35px]"}`}>
        <div
          className={`w-[75%] mx-auto rounded-b-[4px] px-[20px] py-[10px] bg-[#fbf9f2] ${!findFlights && "hidden"}`}
          style={{
            boxShadow: "0 6px 10px rgba(0,0,0,.175)",
          }}
        >
          <FindTicketModal />
        </div>

        <div
          className='absolute bottom-[-28px] right-[50%] w-[50px] h-[50px] rounded-full bg-[#e0e0e0] flex items-start justify-center cursor-pointer z-2'
          style={{
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 4px",
          }}
          onClick={() => setFindFlights(!findFlights)}
        >
          {!findFlights ? (
            <FaAngleDown className='text-[22px] pt-[5px]' />
          ) : (
            <FaAngleUp className='text-[22px] pt-[5px]' />
          )}
        </div>
      </div>

      <div className='relative w-full h-[210px] z-3'>
        <img
          src='https://booking.vietnamairlines.com/statics/applications/booking/dynamicContent/1.0.78/assets/img/background/default-title-background-1280.jpg'
          alt=''
          className='w-full h-full object-cover'
        />

        <div className='absolute top-[30%] right-[35%] bg-white px-[30px] py-[20px] rounded-[10px] text-[#005F6E] text-center'>
          <h1 className='font-bold text-[22px] mb-[5px]'>Nhập thông tin hành khách</h1>
        </div>
      </div>

      <div className='w-[75%] my-[20px] mx-auto'>
        <div className='text-[12px] pt-[20px]'>
          <p>Lưu ý: * Trường bắt buộc nhập thông tin</p>
          <p>
            Quý Khách vui lòng sử dụng tiếng Việt không dấu và không sử dụng các ký tự đặc biệt, nhập đầy đủ tên hành
            khách và những thông tin khác xuất hiện trên (các) giấy tờ tùy thân do chính phủ cấp.
          </p>
          <p>Nếu Tên đầy đủ của Quý khách lớn hơn 41 ký tự, vui lòng viết tắt tên đệm.</p>
          <p>Nếu Tên đầy đủ của Quý khách lớn hơn 41 ký tự, vui lòng viết tắt tên đệm.</p>
          <p>Đệm và tên: V T T K N A DUONG MAI</p>
          <p>Họ: NGUYEN</p>
        </div>
      </div>

      <div className='w-[75%] my-[20px] mx-auto'>
        <div
          className=' rounded-[15px] overflow-hidden mb-[20px]'
          style={{
            boxShadow: "rgba(0, 0, 0, 0.176) 0px 0px 5px",
          }}
        >
          <div className='flex flex-col items-center py-[20px] px-[80px] bg-[#fff]'>
            <h2 className='text-[20px] font-bold text-[#00559e] mb-[30px]'>NGƯỜI LỚN (người lớn)</h2>

            <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px]  mb-[25px]'>
              <select name='' id='' className='w-full h-full outline-none border-none px-[12px] py-[6px]'>
                <option value=''>Ông</option>
                <option value=''>Bà</option>
                <option value=''>Cô/chị</option>
              </select>

              <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>Danh xưng *</div>
            </div>

            <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
              <input type='text' className='w-full h-full outline-none' />

              <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                Tên đệm và tên (như trong CCCD/hộ chiếu) *
              </div>
            </div>

            <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
              <input type='text' className='w-full h-full outline-none' />

              <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                Họ (như trong CCCD/hộ chiếu) *
              </div>
            </div>

            <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
              <input type='date' className='w-full h-full outline-none' />

              <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>Ngày sinh *</div>
            </div>
          </div>
        </div>

        <div
          className=' rounded-[15px] overflow-hidden mb-[20px]'
          style={{
            boxShadow: "rgba(0, 0, 0, 0.176) 0px 0px 5px",
          }}
        >
          <div className='flex flex-col items-center py-[20px] px-[80px] bg-[#fff]'>
            <h2 className='text-[20px] font-bold text-[#00559e] mb-[30px]'>Thông tin liên lạc</h2>

            <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
              <input type='email' className='w-full h-full outline-none' />

              <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                Địa chỉ email bắt buộc *
              </div>
            </div>

            <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
              <input type='text' className='w-full h-full outline-none' />

              <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                Tên đệm và tên (như trong CCCD/hộ chiếu) *
              </div>
            </div>

            <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px]  mb-[25px]'>
              <select name='' id='' className='w-full h-full outline-none border-none px-[12px] py-[6px]'>
                <option value='' className='border-none'>
                  Cá nhân
                </option>
                <option value='' className='border-none'>
                  Doanh nghiệp
                </option>
              </select>

              <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>Loại điện thoại *</div>
            </div>

            <div className='grid grid-cols-12 w-full gap-4'>
              <div className='col-span-5 relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
                <input type='text' className='w-full h-full outline-none' />

                <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>Mã quốc gia *</div>
              </div>

              <div className='col-span-7 relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
                <input type='text' className='w-full h-full outline-none' />

                <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>Số điện thoại *</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className=' rounded-[15px] overflow-hidden'
          style={{
            boxShadow: "rgba(0, 0, 0, 0.176) 0px 0px 5px",
          }}
        >
          <div className='flex gap-2 items-center py-[20px] px-[20px] bg-[#f8f8f8]'>
            <input type='checkbox' name='' id='' className='items-start' />
            <div className='flex flex-col'>
              <span className='text-[13px]'>
                Dữ liệu cá nhân của Quý khách thu thập trên trang này được xử lý và lưu trữ bởi PTIT Airlines cho mục
                đích và theo điều kiện đã được công bố tại Chính sách bảo mật thông tin của PTIT Airlines.
              </span>
              <span className='underline text-[#005f6e] text-[13px] cursor-pointer'>Chi tiết</span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[75%] my-[20px] mx-auto flex justify-end'>
        <Link
          href='/booking/shopping-cart'
          className='mr-[10px] text-[18px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[10px] px-[25px] w-fit font-medium  flex items-center justify-center'
        >
          <FaArrowLeftLong />
        </Link>

        <Link
          href='/booking/seat'
          className='text-[18px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[10px] px-[15px] w-fit font-medium'
        >
          XÁC NHẬN
        </Link>
      </div>
    </div>
  );
};

export default page;
