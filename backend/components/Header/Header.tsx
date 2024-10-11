import Link from "next/link";
import React, { useState } from "react";
import NavItems from "./NavItems";
import { BiUser } from "react-icons/bi";
import { FaSortUp } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";

type Props = {};

const Header = (props: Props) => {
  const [user, setUser] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <>
      <header className='w-full relative'>
        <div className='w-[75%] m-auto relative h-[81px] z-[1000] bg-white'>
          <div className='w-full h-[81px] flex items-center justify-between p-3'>
            <div className='flex items-center gap-[20px]'>
              <Link
                href='/'
                className={`text-[25px] leading-none font-Poppins font-bold drop-shadow-[1px_1px_1px_#000] text-[#007390] pb-[6px]`}
              >
                PTIT Airlines
              </Link>
            </div>

            <div className='flex items-center'>
              <NavItems />

              {user ? (
                <div className='flex items-center gap-3'>
                  <div className='relative ml-4'>
                    <img
                      src={"../../public/defaultAvatar.png"}
                      alt='avatar'
                      className='w-[30px] h-[30px] object-cover rounded-full cursor-pointer'
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
                          <div className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#005a8c] hover:border-l-[3px] hover:border-[#005a8c] p-2 flex items-center gap-2 hover:bg-[#96969633] cursor-pointer'>
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

export default Header;
