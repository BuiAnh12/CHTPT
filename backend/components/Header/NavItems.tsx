import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const NavItems = (props: Props) => {
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);

  return (
    <div className='hidden md:block'>
      <div className='flex items-center gap-[15px]'>
        <div
          className={`flex items-center cursor-pointer text-[17px] font-Poppins font-medium text-[#000] p-[10px] h-[40px] rounded-t-md ${
            openModal1 ? "bg-[#166986]" : "bg-[#fff]"
          }`}
          onClick={() => {
            setOpenModal2(false);
            setOpenModal3(false);
            setOpenModal1(!openModal1);
          }}
        >
          <span className={`${openModal1 ? "text-[#fff]" : "text-[#000]"}`}>Lên kế hoạch</span>

          {openModal1 && (
            <>
              <ul
                className='absolute top-[61px] left-[0px] w-[1000px] pt-[20px] pb-[50px] px-[25px] bg-[#fff] grid grid-cols-4 justify-items-center z-[1000]'
                style={{
                  borderTopColor: "#166986",
                  borderTopWidth: "5px",
                  boxShadow: "0 6px 12px rgba(0,0,0,.175)",
                }}
              >
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
              </ul>
            </>
          )}
        </div>

        <div
          className={`flex items-center cursor-pointer text-[17px] font-Poppins font-medium text-[#000] p-[10px] h-[40px] rounded-t-md ${
            openModal2 ? "bg-[#166986]" : "bg-[#fff]"
          }`}
          onClick={() => {
            setOpenModal1(false);
            setOpenModal3(false);
            setOpenModal2(!openModal2);
          }}
        >
          <span className={`${openModal2 ? "text-[#fff]" : "text-[#000]"}`}>Lên kế hoạch</span>

          {openModal2 && (
            <>
              <ul
                className='absolute top-[61px] left-[0px] w-[1000px] pt-[20px] pb-[50px] px-[25px] bg-[#fff] grid grid-cols-4 justify-items-center z-[1000]'
                style={{
                  borderTopColor: "#166986",
                  borderTopWidth: "5px",
                  boxShadow: "0 6px 12px rgba(0,0,0,.175)",
                }}
              >
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
              </ul>
            </>
          )}
        </div>

        <div
          className={`flex items-center cursor-pointer text-[17px] font-Poppins font-medium text-[#000] p-[10px] h-[40px] rounded-t-md ${
            openModal3 ? "bg-[#166986]" : "bg-[#fff]"
          }`}
          onClick={() => {
            setOpenModal1(false);
            setOpenModal2(false);
            setOpenModal3(!openModal3);
          }}
        >
          <span className={`${openModal3 ? "text-[#fff]" : "text-[#000]"}`}>Lên kế hoạch</span>

          {openModal3 && (
            <>
              <ul
                className='absolute top-[61px] left-[0px] w-[1000px] pt-[20px] pb-[50px] px-[25px] bg-[#fff] grid grid-cols-4 justify-items-center z-[1000]'
                style={{
                  borderTopColor: "#166986",
                  borderTopWidth: "5px",
                  boxShadow: "0 6px 12px rgba(0,0,0,.175)",
                }}
              >
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Ưu đãi
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavItems;
