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
                className='absolute top-[61px] left-[0px] w-[1000px] pt-[20px] pb-[30px] !px-[25px] bg-[#fff] grid grid-cols-4 justify-items-center z-[1000]'
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
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Giá vé đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Ưu đãi tháng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Vé máy bay từ Hà Nội đi Tp. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Vé máy bay từ Tp. Hồ Chí Minh đi Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Vé máy bay từ Đà Nẵng đi TP. Hồ Chí Minh
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Điểm đến
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Hà Nội
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        TP. Hồ Chí Minh
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Đà Nẵng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Phú Quốc
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Nha Trang
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Tất cả điểm đến
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Lịch bay & Mạng đường bay
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Mạng đường bay
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Trải nghiệm bay
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Hạng Thương gia
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Hạng Phổ thông đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Hạng Phổ thông
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Giải trí trên chuyến bay
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
          <span className={`${openModal2 ? "text-[#fff]" : "text-[#000]"}`}>Thông tin hành trình</span>

          {openModal2 && (
            <>
              <ul
                className='absolute top-[61px] left-[0px] w-[1000px] pt-[20px] pb-[30px] !px-[25px] bg-[#fff] grid grid-cols-4 justify-items-center z-[1000]'
                style={{
                  borderTopColor: "#166986",
                  borderTopWidth: "5px",
                  boxShadow: "0 6px 12px rgba(0,0,0,.175)",
                }}
              >
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Hành lý
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Tra cứu thông tin hành lý
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Hành lý xách tay
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Hành lý ký gửi miễn cước
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Mua thêm hành lý ký gửi
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Hành lý đặc biệt
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Hành lý hạn chế vận chuyển
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Gặp vấn đề với hành lý
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Làm thủ tục
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Làm thủ tục trực tuyến
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Làm thủ tục tại kiosk
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Làm thủ tục tại sân bay
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Thông tin sân bay
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Thông tin sân bay
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Phòng khách Thương gia
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Dịch vụ ưu tiên tại sân bay SkyPriority
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Bản đồ sân bay
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Chuẩn bị cho chuyến bay
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Giấy tờ tùy thân
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Thị thực
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Thông tin xuất nhập cảnh/quá cảnh
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
          <span className={`${openModal3 ? "text-[#fff]" : "text-[#000]"}`}>Mua vé & Sản phẩm khác</span>

          {openModal3 && (
            <>
              <ul
                className='absolute top-[61px] left-[0px] w-[1000px] pt-[20px] pb-[30px] !px-[25px] bg-[#fff] grid grid-cols-4 justify-items-center z-[1000]'
                style={{
                  borderTopColor: "#166986",
                  borderTopWidth: "5px",
                  boxShadow: "0 6px 12px rgba(0,0,0,.175)",
                }}
              >
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Hướng dẫn mua vé & thanh toán
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Hướng dẫn đặt vé máy bay online
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Các hình thức thanh toán
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Xuất hóa đơn VAT điện tử
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Mua vé & Quản lý đặt chỗ
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Mua vé
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Quản lý đặt chỗ
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Làm thủ tục
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Tự nguyện hoàn/đổi vé & hủy đặt chỗ
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Đổi chuyến bay không tự nguyện
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Điều kiện giá
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Điều kiện giá vé
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Thuế, phí, lệ phí & phụ thu
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full pr-[15px]'>
                  <h3 className='px-[5px] pb-[15px] border-b-[1px] border-[#ccc] text-[13px] font-medium hover:underline'>
                    Dịch vụ bổ trợ
                  </h3>
                  <ul>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Sản phẩm kết hợp máy bay và tàu
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Mua thêm hành lý ký gửi
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Chọn trước chỗ ngồi
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='text-[#000] cursor-pointer hover:underline'>
                        Nâng hạng
                      </Link>
                    </li>
                    <li className='px-[5px] py-[10px] border-b-[1px] border-[#ccc] text-[13px] font-normal'>
                      <Link href='/' className='cursor-pointer hover:underline'>
                        Tất cả dịch vụ bổ trợ
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
