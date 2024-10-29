"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaSortUp } from "react-icons/fa";
import {
  FaArrowRightFromBracket,
  FaArrowRightLong,
  FaCheck,
  FaPersonWalkingLuggage,
  FaRegCreditCard,
} from "react-icons/fa6";
import { IoAirplaneSharp } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { RiUserLine } from "react-icons/ri";
import { useUser } from "../../contexts/UserContext";
import avatar from "../../public/defaultAvatar.png";
import Image from "next/image";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";

type Props = {};

const BookingHeader = ({ step }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <header className='w-full relative'>
        <div className='m-auto relative h-[50px] z-[1000] bg-white'>
          <div className='w-[95%] h-[50px] flex items-center justify-between p-3'>
            <div className='flex items-center gap-[20px]'>
              <Link
                href='/home'
                className={`text-[25px] leading-none font-Poppins font-bold drop-shadow-[1px_1px_1px_#000] text-[#007390] pb-[6px]`}
              >
                PTIT Airlines
              </Link>
            </div>

            {user ? (
              <div className='flex items-center gap-3'>
                <div className='relative ml-4'>
                  <Image
                    src={avatar}
                    alt='avatar'
                    width={30}
                    height={30}
                    className='object-cover rounded-full cursor-pointer'
                    onClick={() => setOpenModal(!openModal)}
                  />

                  {openModal && (
                    <>
                      <FaSortUp className='absolute top-[32px] left-[8px]' fill='#005a8c' />
                      <ul
                        className='absolute top-[39px] right-[-50px] w-[220px] sm:w-[250px] py-1 bg-[#1a191f] flex flex-col'
                        style={{
                          borderTopColor: "#005a8c",
                          borderTopWidth: "3px",
                          boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
                        }}
                      >
                        <Link
                          href={`/trang-ca-nhan`}
                          className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#005a8c] hover:border-l-[3px] hover:border-[#005a8c] p-2 flex items-center gap-2 hover:bg-[#96969633]'
                        >
                          <RiUserLine />
                          <span> Tài khoản của tôi</span>
                        </Link>
                        <div
                          className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#005a8c] hover:border-l-[3px] hover:border-[#005a8c] p-2 flex items-center gap-2 hover:bg-[#96969633] cursor-pointer'
                          onClick={() => handleLogout()}
                        >
                          <FaArrowRightFromBracket />
                          <span>Đăng xuất</span>
                        </div>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className='flex items-center gap-1'>
                <BiUser
                  className='mx-4 text-black hover:text-[#005a8c] cursor-pointer'
                  size={30}
                  onClick={() => {
                    setOpenSignUp(false);
                    setOpenLogin(!openLogin);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className='z-[1000] text-[#222] bg-[#f5edd0] border-y-[1px] border-[#d0dad2]'>
          <div className='w-[75%]  m-auto relative'>
            <div className='flex'>
              <div
                className={`relative flex items-center gap-2 mr-[30px] py-[10px] pl-[10px] z-1 ${
                  step === 1 && "bg-[#e5b54d]"
                }`}
              >
                <div
                  className={`w-[30px] h-[30px] rounded-full border-[#766235] border-[1px] flex items-center justify-center z-1 ${
                    (step === 1 || step === 2 || step === 3 || step === 4) && "bg-[#fff]"
                  }`}
                >
                  {step === 2 || step === 3 || step === 4 ? (
                    <FaCheck className='text-[#007390]' />
                  ) : (
                    <IoAirplaneSharp className='text-[#766235]' />
                  )}
                </div>

                <div className='flex flex-col z-1'>
                  <div
                    className={`flex flex-row items-center gap-[4px] ${
                      (step === 2 || step === 3 || step === 4) && "text-[#007390]"
                    }`}
                  >
                    <span className='text-[18px] font-bold'>HAN</span>
                    <FaArrowRightLong className='text-[14px]' />
                    <span className='text-[18px] font-bold'>SGN</span>
                  </div>

                  <div className='flex flex-row justify-between'>
                    <span className='text-[14px]'>Chọn chuyến bay</span>
                  </div>
                </div>

                {step === 1 && (
                  <div
                    className='absolute top-[0px] right-[-35px] z-0'
                    style={{
                      width: "0",
                      height: "0",
                      borderTop: "35px solid transparent",
                      borderBottom: "35px solid transparent",
                      borderLeft: "35px solid #e5b54d",
                    }}
                  ></div>
                )}
              </div>

              <div
                className={`relative flex items-center gap-2 mr-[30px] py-[10px] pl-[10px] z-1 ${
                  step === 2 && "bg-[#e5b54d]"
                }`}
              >
                <div
                  className={`w-[30px] h-[30px] rounded-full border-[#766235] border-[1px] flex items-center justify-center z-1 ${
                    (step === 2 || step === 3 || step === 4) && "bg-[#fff]"
                  }`}
                >
                  {step === 3 || step === 4 ? (
                    <FaCheck className='text-[#007390]' />
                  ) : (
                    <FaPersonWalkingLuggage className='text-[#766235]' />
                  )}
                </div>

                <div className='flex flex-col'>
                  <span className={`text-[18px] ${step === 3 || step === 4 ? "text-[#007390]" : "text-[#383838]"}`}>
                    Thông tin khách
                  </span>
                  <span className='text-[14px] text-[#383838]'>1 hành khách</span>
                </div>

                {step === 2 && (
                  <div
                    className='absolute top-[0px] right-[-35px] z-0'
                    style={{
                      width: "0",
                      height: "0",
                      borderTop: "35px solid transparent",
                      borderBottom: "35px solid transparent",
                      borderLeft: "35px solid #e5b54d",
                    }}
                  ></div>
                )}
              </div>

              <div
                className={`relative flex items-center gap-2 mr-[30px] py-[10px] pl-[10px] z-1 ${
                  step === 3 && "bg-[#e5b54d]"
                }`}
              >
                <div
                  className={`w-[30px] h-[30px] rounded-full border-[#766235] border-[1px] flex items-center justify-center z-1 ${
                    (step === 3 || step === 4) && "bg-[#fff]"
                  }`}
                >
                  {step === 4 ? (
                    <FaCheck className='text-[#007390]' />
                  ) : (
                    <MdAirlineSeatReclineExtra className='text-[#766235]' />
                  )}
                </div>

                <div className='flex flex-col'>
                  <span className={`text-[18px] ${step === 4 ? "text-[#007390]" : "text-[#383838]"}`}>
                    Chọn chỗ ngồi
                  </span>
                </div>

                {step === 3 && (
                  <div
                    className='absolute top-[0px] right-[-35px] z-0'
                    style={{
                      width: "0",
                      height: "0",
                      borderTop: "35px solid transparent",
                      borderBottom: "35px solid transparent",
                      borderLeft: "35px solid #e5b54d",
                    }}
                  ></div>
                )}
              </div>

              <div
                className={`relative flex items-center gap-2 mr-[30px] py-[10px] pl-[10px] z-1 ${
                  step === 4 && "bg-[#e5b54d]"
                }`}
              >
                <div
                  className={`w-[30px] h-[30px] rounded-full border-[#766235] border-[1px] flex items-center justify-center z-1 ${
                    step === 4 && "bg-[#fff]"
                  }`}
                >
                  <FaRegCreditCard className='border-[#766235]' />
                </div>

                <div className='flex flex-col'>
                  <span className='text-[18px] text-[#383838]'>Thanh toán</span>
                </div>

                {step === 4 && (
                  <div
                    className='absolute top-[0px] right-[-35px] z-0'
                    style={{
                      width: "0",
                      height: "0",
                      borderTop: "35px solid transparent",
                      borderBottom: "35px solid transparent",
                      borderLeft: "35px solid #e5b54d",
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {openLogin && (
        <div className='fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[500px] bg-[#f8f8f8] rounded-[8px] shadow p-4 outline-none z-[2000]'>
          <Login setOpenLogin={setOpenLogin} setOpenSignUp={setOpenSignUp} />
        </div>
      )}
      {openSignUp && (
        <div className='fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[500px] bg-[#f8f8f8] rounded-[8px] shadow p-4 outline-none z-[2000]'>
          <SignUp setOpenLogin={setOpenLogin} setOpenSignUp={setOpenSignUp} />
        </div>
      )}
    </>
  );
};

export default BookingHeader;
