"use client";
import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { IoAirplane } from "react-icons/io5";
import { VscNotebook } from "react-icons/vsc";
import { MdAirplaneTicket, MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import FindTicketModal from "../../components/FindTicketModal";
import Slider from "../../components/NewsSlider";
import toast from "react-hot-toast";
import axios from "axios";
import { FaChevronDown, FaChevronUp, FaRegClock } from "react-icons/fa6";
import { TiTicket } from "react-icons/ti";
import { HiOutlineTicket } from "react-icons/hi2";
import { RiLuggageDepositFill } from "react-icons/ri";
import { PiFlowerLotusBold } from "react-icons/pi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FlightDetails } from "../../util/interface";

const popularFlights = [
  {
    img: "https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx",
    from: "TP. Hồ Chí Minh",
    to: "Hà Nội",
    date: "20/12/2024",
    price: "1.540.000",
    type: "Một chiều / Phổ thông",
  },
  {
    img: "https://assets.airtrfx.com/cdn-cgi/image/height=500,width=500,quality=80,fit=crop,format=auto,opt=true/https://media.jtdwjcwq6f4wp4ce.com/vn/cities/Ho-Chi-Minh-City-SGN.jpg",
    from: "Hà Nội",
    to: "TP. Hồ Chí Minh",
    date: "29/10/2024",
    price: "1.540.000",
    type: "Một chiều / Phổ thông",
    amount: "2/8",
  },
  {
    img: "https://assets.airtrfx.com/media-em/vn/62fa641d28f87_Da_Nang.jpg?height=500&width=500&quality=80&fit=crop&format=auto&opt=true",
    from: "TP. Hồ Chí Minh",
    to: "Đà Nẵng",
    date: "16/12/2024",
    price: "828.000",
    type: "Một chiều / Phổ thông",
    amount: "2/8",
  },
  {
    img: "https://assets.airtrfx.com/media-em/vn/62fa641d28f87_Da_Nang.jpg?height=500&width=500&quality=80&fit=crop&format=auto&opt=true",
    from: "Hà Nội",
    to: "Đà Nẵng",
    date: "11/12/2024",
    price: "860.000",
    type: "Một chiều / Phổ thông",
    amount: "4/8",
  },
  {
    img: "https://assets.airtrfx.com/cdn-cgi/image/height=500,width=500,quality=80,fit=crop,format=auto,opt=true/https://media.jtdwjcwq6f4wp4ce.com/vn/cities/Ho-Chi-Minh-City-SGN.jpg",
    from: "Đà Nẵng",
    to: "TP. Hồ Chí Minh",
    date: "20/12/2024",
    price: "1.162.000",
    type: "Một chiều / Phổ thông",
  },
  {
    img: "https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx",
    from: "Đà Nẵng",
    to: "Hà Nội",
    date: "09/12/2024",
    price: "860.000",
    type: "Một chiều / Phổ thông",
  },
  {
    img: "https://assets.airtrfx.com/cdn-cgi/image/height=500,width=500,quality=80,fit=crop,format=auto,opt=true/https://media.jtdwjcwq6f4wp4ce.com/vn/cities/Vinh-VII.jpg",
    from: "TP. Hồ Chí Minh",
    to: "Vinh",
    date: "25/11/2024",
    price: "914.000",
    type: "Một chiều / Phổ thông",
  },
  {
    img: "https://assets.airtrfx.com/media-em/vn/62fa63d86c890_Hai_Phong.jpg?height=500&width=500&quality=80&fit=crop&format=auto&opt=true",
    from: "TP. Hồ Chí Minh",
    to: "Hải Phòng",
    date: "18/12/2024",
    price: "914.000",
    type: "Một chiều / Phổ thông",
  },
];

type Props = {};

const page = (props: Props) => {
  const [key, setKey] = useState<string>("link-1");
  const [flightNumber, setFlightNumber] = useState("");
  const [ticketCode, setTicketCode] = useState("");
  const [ticketDetail, setTicketDetail] = useState<FlightDetails | null>(null);
  const [expandDetail, setExpandDetail] = useState(false);
  const [fullFormattedDepartureTime, setFullFormattedDepartureTime] = useState("");
  const [formattedDepartureTime, setFormattedDepartureTime] = useState("");
  const [formattedArrivalTime, setFormattedArrivalTime] = useState("");
  const [durationString, setDurationString] = useState("");

  useEffect(() => {
    localStorage.removeItem("passengerDetails");
  }, []);

  const handleSearch = async () => {
    if (flightNumber && ticketCode && flightNumber.length > 0 && ticketCode.length > 0) {
      try {
        const res = await axios.post(`/api/flight/get/`, {
          flightNumber,
          ticketCode,
        });

        if (res.status === 200) {
          setTicketDetail(res.data);
          console.log(res.data); // Xử lý kết quả trả về
        } else {
          toast.error("Không tìm thấy vé");
        }
      } catch (error) {
        toast.error("Không tìm thấy vé");
      }
    } else {
      toast.error("Vui lòng nhập mã máy bay và mã số vé để tìm kiếm");
    }
  };

  useEffect(() => {
    if (ticketDetail) {
      const departureTime = new Date(ticketDetail?.flightData?.departure?.time);
      const arrivalTime = new Date(ticketDetail?.flightData?.arrival?.time);

      const fullFormattedDeparture = departureTime
        .toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })
        .replace(",", "");

      setFullFormattedDepartureTime(fullFormattedDeparture);

      const formattedDeparture = departureTime
        .toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        })
        .replace(",", "");

      setFormattedDepartureTime(formattedDeparture);

      const formattedArrival = arrivalTime
        .toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "UTC",
        })
        .replace(",", "");

      setFormattedArrivalTime(formattedArrival);

      // Tính toán khoảng thời gian
      const durationInMilliseconds = arrivalTime.getTime() - departureTime.getTime();
      const durationInMinutes = Math.floor(durationInMilliseconds / 1000 / 60);

      // Chuyển đổi thành giờ và phút
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;

      // Định dạng kết quả
      const duration = `${hours} tiếng ${minutes} phút`;
      setDurationString(duration);
    }
  }, [ticketDetail]);

  const handleCancelSeat = async (flight_id, seatId) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn hoàn vé này không?");
    if (isConfirmed) {
      try {
        const res = await axios.post(`/api/flight/${flight_id}/seat/reset/${seatId}`);
        toast.success("Hoàn vé thành công!");
        setTicketDetail(null);
      } catch (error) {
        toast.error("Hoàn vé thất bại!");
      }
    } else {
      toast.success("Bạn đã hủy thao tác hoàn vé.");
    }
  };

  return (
    <>
      <Hero />

      <div className='!mt-[-52px] min-h-[120px]'>
        <div className='pt-[11px] max-w-[850px] relative z-10 m-auto'>
          <Tab.Container activeKey={key} onSelect={(k) => setKey(k ?? "")}>
            <Row>
              <Col sm={12}>
                <Nav
                  variant='tabs'
                  defaultActiveKey='link-1'
                  className='w-full d-flex rounded-t-md overflow-hidden border-none'
                >
                  <Nav.Item className='flex-grow-1'>
                    <Nav.Link
                      eventKey='link-1'
                      className='!flex items-center justify-center gap-2 text-white !bg-[#058cb373] !hover:bg-[#166987] active:bg-[#166987] !rounded-none !hover:border-none'
                    >
                      <IoAirplane />
                      <span>MUA VÉ</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='flex-grow-1'>
                    <Nav.Link
                      eventKey='link-2'
                      className='!flex items-center justify-center gap-2 text-white !bg-[#058cb373] !hover:bg-[#166987] active:bg-[#166987] !rounded-none !hover:border-none'
                    >
                      <VscNotebook />
                      <span>QUẢN LÝ ĐẶT CHỖ</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='flex-grow-1'>
                    <Nav.Link
                      eventKey='link-3'
                      className='!flex items-center justify-center gap-2 text-white !bg-[#058cb373] !hover:bg-[#166987] active:bg-[#166987] !rounded-none !hover:border-none'
                    >
                      <MdAirplaneTicket />
                      <span>LÀM THỦ TỤC</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col sm={12}>
                <Tab.Content
                  className='rounded-b-[4px] px-[20px] py-[10px] h-auto w-full bg-[#fbf9f2]'
                  style={{
                    boxShadow: "0 6px 12px rgba(0,0,0,.175)",
                  }}
                >
                  <Tab.Pane eventKey='link-1' className='h-auto '>
                    <FindTicketModal />
                  </Tab.Pane>
                  <Tab.Pane eventKey='link-2'>
                    {/* <button className='bg-[#0980A0] text-[#fff] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
                      Mã đặt chỗ/Số vé điện tử
                    </button> */}
                    <div className='mb-[30px] flex items-center gap-3 w-full'>
                      <div className='relative w-[40%]'>
                        <input
                          id='flightNumber'
                          onChange={(e) => {
                            setFlightNumber(e.target.value);
                          }}
                          type='text'
                          className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
                        />
                        <label
                          htmlFor='flightNumber'
                          className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'
                        >
                          Mã máy bay
                        </label>
                      </div>

                      <div className='relative w-[40%]'>
                        <input
                          id='ticketCode'
                          onChange={(e) => {
                            setTicketCode(e.target.value);
                          }}
                          type='text'
                          className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
                        />
                        <label
                          htmlFor='ticketCode'
                          className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'
                        >
                          Mã số vé
                        </label>
                      </div>

                      <button
                        className='w-[160px] h-[40px] rounded-[4px] text-[#000] bg-[#e6b441] hover:bg-[#fff] border-[2px] border-[#e6b441]'
                        onClick={() => handleSearch()}
                      >
                        <span className='font-semibold'>TÌM KIẾM</span>
                      </button>
                    </div>

                    {ticketDetail && (
                      <div
                        className=' rounded-[15px] overflow-hidden px-[20px] pt-[20px] bg-[#fff]'
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.176) -2px 0px 12px",
                        }}
                      >
                        <div className='border-b-[1px] border-[#00648A] flex justify-between gap-2 pb-[10px]'>
                          <div className='flex'>
                            <h4 className='font-semibold'>
                              {ticketDetail?.flightData?.departure.city} đến {ticketDetail?.flightData?.arrival.city}
                            </h4>
                            <span>-</span>
                            <span>{fullFormattedDepartureTime}</span>
                          </div>

                          <button
                            className='w-[160px] h-[40px] rounded-[4px] text-[#FFF] bg-[#e64141] hover:bg-[#d83939] border-[2px] border-[#7e1d1d]'
                            onClick={() => handleCancelSeat(ticketDetail?.flightData?.flightId, ticketDetail?.seatid)}
                          >
                            <span className='font-semibold'>HOÀN VÉ</span>
                          </button>
                        </div>

                        <div className='grid grid-cols-12 w-full'>
                          <div className='col-span-9 grid grid-cols-12 items-center my-0 h-[160px] '>
                            <div className='col-span-8  py-[10px] pr-[30px] ml-[8px] mr-[15px]'>
                              <div className='flex flex-row h-[21px] items-center justify-between'>
                                <span className='text-[17px] mb-[15px]'>{formattedDepartureTime}</span>
                                <div className='relative flex flex-col gap-1 items-center mx-[2px] justify-center h-[2rem] w-[205px]'>
                                  <span className='absolute top-[0px] text-[12px]'>Bay thẳng</span>
                                  <div className=''>
                                    ...............................................................................................
                                  </div>
                                </div>
                                <span className='text-[17px] mb-[15px]'>{formattedArrivalTime}</span>
                              </div>

                              <div className='flex flex-row justify-between'>
                                <span className='text-[14px]'>{ticketDetail?.flightData.departure.airportCode}</span>
                                <span className='text-[14px]'>{ticketDetail?.flightData.arrival.airportCode}</span>
                              </div>

                              <div className='flex flex-row justify-between'>
                                <span className='text-[14px] text-[#0062a9]'>Nhà ga 1</span>
                                <span className='text-[14px] text-[#0062a9]'>Nhà ga 1</span>
                              </div>
                            </div>

                            <div className='col-span-4  py-[10px] pr-[30px] ml-[8px] mr-[15px]'>
                              <div className='flex flex-col justify-between'>
                                <div className='flex items-center gap-2'>
                                  <FaRegClock className='text-[12px]' />
                                  <span className='text-[12px]'>Thời gian bay {durationString || "N/A"}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <MdOutlineFlightTakeoff className='text-[12px]' />
                                  <span className='text-[12px]'>{`${ticketDetail?.flightData.flightNumber} Hãng khai thác PTIT Airlines`}</span>
                                </div>

                                <span className='pt-[4px] text-[12px] underline px-[20px] text-[#00607d] hover:text-[#e6b441] cursor-pointer'>
                                  Chi tiết hành trình
                                </span>
                              </div>
                            </div>
                          </div>

                          <div
                            className='col-span-3 bg-[#fff] flex items-center justify-center cursor-pointer'
                            onClick={() => setExpandDetail(!expandDetail)}
                          >
                            <div className='flex items-center justify-center gap-4 text-[#00648a]'>
                              <span className='font-semibold'>{`${
                                ticketDetail?.flightData.economyPrice ==
                                ticketDetail?.passengerDetails.purchasedBy.paymentInfo.amount
                                  ? "Phổ thông tiết kiệm"
                                  : "Thương gia"
                              }`}</span>

                              {expandDetail ? <FaChevronUp className='' /> : <FaChevronDown className='' />}
                            </div>
                          </div>
                        </div>

                        {expandDetail && (
                          <div className=' h-full text-[#222222] flex flex-col'>
                            <div className='grid grid-cols-12 w-full h-full'>
                              <div className='col-span-6'>
                                <div className='w-full  pb-[10px] pt-[15px]'>
                                  <h4 className='font-bold text-[18px] text-center text-[#005F6E] py-[10px]'>
                                    Chi tiết hành trình
                                  </h4>

                                  <div className='relative grid grid-cols-12'>
                                    <span className='col-span-2'>{durationString || "N/A"}</span>

                                    <div className='col-span-10 pl-[10px]'>
                                      <div className='flex flex-col mb-[10px]'>
                                        <h4 className='text-[18px] font-semibold text-[#005F6E]'>
                                          {formattedDepartureTime} {ticketDetail?.flightData.departure.city}
                                        </h4>
                                        <p>Sân bay Tân Sơn Nhất, Việt Nam</p>
                                        <p className='text-[12px]'>Nhà ga 1</p>
                                      </div>

                                      <div className='flex flex-col'>
                                        <h4 className='text-[18px] font-semibold text-[#005F6E]'>
                                          {formattedArrivalTime} {ticketDetail?.flightData.arrival.city}
                                        </h4>
                                        <p>Sân bay Nội Bài, Việt Nam</p>
                                        <p className='text-[12px]'>Nhà ga 1</p>
                                      </div>
                                    </div>

                                    <div className='absolute top-[0px] left-[65px] w-[3px] h-[135px] bg-[#005572]'></div>
                                    <div className='absolute top-[-8px] left-[64px] w-[5px] h-[5px] rounded-full bg-[#005572]'></div>
                                    <div className='absolute bottom-[-8px] left-[64px] w-[5px] h-[5px] rounded-full bg-[#005572]'></div>
                                  </div>

                                  <div className='mt-[15px]'>
                                    <div className='text-[13px]'>
                                      <span>Số hiệu chuyến bay</span>{" "}
                                      <span className='font-bold'>{ticketDetail?.flightData.flightNumber}</span>
                                    </div>
                                    <p className='text-[13px]'>Khai thác bởi Vietnam Airlines</p>
                                    <p className='text-[13px]'>Boeing 787</p>
                                  </div>
                                </div>
                              </div>

                              <div className='col-span-6'>
                                <div className='w-full   pb-[10px] pt-[15px]'>
                                  <h4 className='font-bold text-[18px] text-center text-[#005F6E] py-[10px]'>
                                    Giá vé của Quý khách
                                  </h4>

                                  <div className='border-l-[3px] border-[#D0D5DD] px-[20px]'>
                                    <span className='font-semibold'>{`${
                                      ticketDetail?.flightData.economyPrice ==
                                      ticketDetail?.passengerDetails.purchasedBy.paymentInfo.amount
                                        ? "Phổ thông tiết kiệm"
                                        : "Thương gia"
                                    }`}</span>

                                    <div className='flex gap-[6px] mb-[4px]'>
                                      <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] border-[1px] flex items-center justify-center'>
                                        <TiTicket className='text-[#275e6c] text-[20px] ' />
                                      </div>
                                      <div className='flex flex-col'>
                                        <span className='font-bold text-[13px]'>Thay đổi vé</span>
                                        <span className='text-[13px]'>
                                          Phí đổi vé tối đa 1.000.000 VND mỗi hành khách
                                        </span>
                                      </div>
                                    </div>

                                    <div className='flex gap-[6px] mb-[4px]'>
                                      <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                                        <HiOutlineTicket className='text-[#275e6c] text-[20px]' />
                                      </div>
                                      <div className='flex flex-col'>
                                        <span className='font-bold text-[13px]'>Hoàn vé</span>
                                        <span className='text-[13px]'>
                                          Phí hoàn vé tối đa 1.000.000 VND mỗi hành khách
                                        </span>
                                      </div>
                                    </div>

                                    <div className='flex gap-[6px] mb-[4px]'>
                                      <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                                        <MdLuggage className='text-[#275e6c] text-[20px] ' />
                                      </div>
                                      <div className='flex flex-col'>
                                        <span className='font-bold text-[13px]'>Hành lý ký gửi</span>
                                        <span className='text-[13px]'>1 x 23 kg</span>
                                      </div>
                                    </div>

                                    <div className='flex gap-[6px] mb-[4px]'>
                                      <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                                        <RiLuggageDepositFill className='text-[#275e6c] text-[20px] ' />
                                      </div>
                                      <div className='flex flex-col'>
                                        <span className='font-bold text-[13px]'>Hành lý xách tay</span>
                                        <span className='text-[13px]'>Không quá 12 kg</span>
                                      </div>
                                    </div>

                                    <div className='flex gap-[6px] mb-[4px]'>
                                      <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                                        <PiFlowerLotusBold className='text-[#275e6c] text-[20px] ' />
                                      </div>
                                      <div className='flex flex-col'>
                                        <span className='font-bold text-[13px]'>Số dặm đạt được</span>
                                        <span className='text-[13px]'>Tích lũy 60% số dặm</span>
                                      </div>
                                    </div>

                                    <div className='flex gap-[6px] mb-[4px]'>
                                      <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'></div>
                                      <div className='flex flex-col'>
                                        <span className='font-bold text-[16px]'>
                                          Tổng cộng:{" "}
                                          {ticketDetail?.passengerDetails.purchasedBy.paymentInfo.amount.toLocaleString(
                                            "vi-VN"
                                          )}{" "}
                                          VND
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className='w-full border-t-[1px] border-[#00607d]'
                              onClick={() => setExpandDetail(false)}
                            >
                              <FaChevronUp className='text-[18px]  my-[10px] text-center w-full block cursor-pointer' />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey='link-3'>
                    <span className='text-[#006885] text-[14px] mb-[10px]'>
                      Quý khách có thể làm thủ tục trực tuyến từ 24 đến 01 tiếng trước chuyến bay
                    </span>
                    <div className='flex gap-2'>
                      <button className='bg-[#0980A0] text-[#fff] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
                        Mã đặt chỗ (PNR)
                      </button>
                      <button className='bg-[#f0eee9] text-[#333] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
                        Số điện tử
                      </button>
                      <button className='bg-[#f0eee9] text-[#333] py-[6px] px-[25px] border-[1px] border-[#ccc] hover:bg-[#0980A0] hover:text-[#fff] rounded-[30px] text-[13px] w-fit my-[10px] cursor-pointer'>
                        Số thẻ FFP
                      </button>
                    </div>
                    <div className='mb-[30px] flex items-center gap-3 w-full'>
                      <div className='relative w-[40%]'>
                        <input
                          id='city-from-roundtrip'
                          type='text'
                          className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
                        />
                        <label
                          htmlFor='city-from-roundtrip'
                          className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'
                        >
                          Mã đặt chỗ
                        </label>
                      </div>

                      <div className='relative w-[40%]'>
                        <input
                          id='city-from-roundtrip'
                          type='text'
                          className='border-b-[1px] border-[#333] bg-[#fbf9f2] h-[40px] text-[#000] line-clamp-1 pl-[9px] pr-[35px] pt-[15px] pb-[6px] outline-none w-full'
                        />
                        <label
                          htmlFor='city-from-roundtrip'
                          className='absolute top-[3px] left-[10px] text-[#333232] text-[10px]'
                        >
                          Họ
                        </label>
                      </div>

                      <button className='w-[160px] h-[40px] rounded-[4px] text-[#000] bg-[#e6b441] hover:bg-[#fff] border-[2px] border-[#e6b441]'>
                        <span className='font-semibold'>LÀM THỦ TỤC</span>
                      </button>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>

      <div className='w-[75%] m-auto'>
        <ul
          className='my-[25px] rounded-[3px] flex'
          style={{
            backgroundImage:
              "url('https://www.vietnamairlines.com/Themes/VNANew/Portal/images/pages/home/bg_menu_header_bottom.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_bag.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>
                HÀNH LÝ
                <br />
                TRẢ TRƯỚC
              </div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_plane.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>
                NÂNG HẠNG
                <br />& CHỌN CHỖ
              </div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='	https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_shopping.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>MUA SẮM</div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_hotel.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>KHÁCH SẠN & TOUR</div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_care.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>BẢO HIỂM</div>
            </div>
          </li>
          <li className='basis-[18%] py-[28px] px-[20px] text-center'>
            <div className='cursor-pointer min-h-[82px]'>
              <div className='mb-[20px] flex justify-center'>
                <img
                  src='	https://www.vietnamairlines.com/~/media/Images/HomeDashboard/icon_service_support.png'
                  alt=''
                  className='w-[30px] h-[30px] object-cover'
                />
              </div>
              <div className='font-bold text-[12px] text-[#006885]'>DỊCH VỤ KHÁC</div>
            </div>
          </li>
        </ul>
      </div>

      <div className='w-[75%] m-auto'>
        <h2 className='p-[5px] border-l-[12px] border-[#1B95B8] text-[38px] mt-[20px] mb-[10px]'>
          Khám Phá Các Chuyến Bay Phổ Biến Nhất Của Chúng Tôi
        </h2>

        <div className='flex flex-row items-center mb-[20px] flex-wrap gap-[10px]'>
          {popularFlights.slice(0, 8).map((popular, index) => (
            <div className='relative h-[400px] cursor-pointer basis-[24%]' key={index}>
              <img src={popular.img} className='object-cover h-full w-full' alt='' />
              <div className='absolute bottom-[0px] px-[15px] pt-[10px] pb-[10px] w-full z-2 bg-[#076981c7]'>
                <div className='flex flex-col'>
                  <span className='text-[18px] text-[#fff] font-semibold'>{popular.from} đến</span>
                  <span className='text-[18px] text-[#fff] font-semibold'>{popular.to}</span>
                  <span className='text-[14px] text-[#fff] font-semibold'>{popular.date}</span>
                </div>
                <div className='flex flex-col items-end mt-[30px]'>
                  <span className='text-[11px] text-[#fff] font-semibold'>Từ</span>
                  <span className='text-[18px] text-[#fff] font-semibold'>{popular.price} VND*</span>
                  <span className='text-[11px] text-[#fff] font-semibold'>Đã xem: 11 phút trước</span>
                  <span className='text-[11px] text-[#fff] font-semibold'>{popular.type}</span>
                </div>
              </div>

              <span className='absolute top-[10px] right-[10px] py-[1px] px-[10px] bg-[#0000009d] text-[#fff] text-[12px] rounded-[10px]'>
                {index + 1}/8
              </span>
            </div>
          ))}
        </div>

        <div className='flex items-center justify-center'>
          <button className='text-[13px] border-[2px] border-[#cc990e] text-[#cc990e] hover:bg-[#cc990e] hover:text-[#fff] rounded-[5px] w-[250px] h-[40px] !my-auto !mt-[5px] !mb-[15px] font-bold !text-center'>
            XEM THÊM
          </button>
        </div>
      </div>

      <div className='w-[75%] m-auto'>
        <h2 className='p-[5px] border-l-[12px] border-[#1B95B8] text-[38px] mt-[20px] mb-[10px]'>KHÁM PHÁ ĐIỂM ĐẾN</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[5px] mb-[20px]'>
          <div className='relative h-[495px] group cursor-pointer'>
            <img
              src='https://www.vietnamairlines.com/vn/vi/~/media/1B2961B388074C069FB6C065C63F2FBC.ashx'
              className='object-cover h-full w-full'
              alt=''
            />
            <div className='absolute bottom-[20px] group-hover:bottom-[50px] transition-all duration-300 ease-in-out px-[15px] pt-[20px] pb-[15px] w-full z-2'>
              <p className='text-[22px] text-[#fff] mb-[5px]'>Tokyo – Thủ đô của hiện đại và truyền thống</p>
              <button className='text-[13px] border-[1px] border-[#fff] w-[150px] h-[40px] text-center bg-[#ffffff29] text-[#fff] rounded-[5px] cursor-pointer font-semibold'>
                KHÁM PHÁ
              </button>
            </div>
            <div
              className='absolute top-0 w-full h-full z-1'
              style={{
                background:
                  "linear-gradient(0deg,rgba(0,0,0,.6530987394957983) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)",
              }}
            ></div>
          </div>

          <div className='relative h-[495px] group cursor-pointer'>
            <img
              src='https://www.vietnamairlines.com/~/media/1BA7C4D53BE94C50A847FFF2230FBA70.ashx'
              className='object-cover h-full w-full'
              alt=''
            />
            <div className='absolute bottom-[20px] group-hover:bottom-[50px] transition-all duration-300 ease-in-out px-[15px] pt-[20px] pb-[15px] w-full z-2'>
              <p className='text-[22px] text-[#fff] mb-[5px]'>Phú Quốc – Hòn ngọc quý</p>
              <button className='text-[13px] border-[1px] border-[#fff] w-[150px] h-[40px] text-center bg-[#ffffff29] text-[#fff] rounded-[5px] cursor-pointer font-semibold'>
                KHÁM PHÁ
              </button>
            </div>
            <div
              className='absolute top-0 w-full h-full z-1'
              style={{
                background:
                  "linear-gradient(0deg,rgba(0,0,0,.6530987394957983) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)",
              }}
            ></div>
          </div>

          <div className='flex flex-col justify-between'>
            <div className='relative h-[245px] group cursor-pointer'>
              <img
                src='https://www.vietnamairlines.com/~/media/7E9F34DB11A14845BF6CE6D6F0EFE52C.ashx'
                className='object-cover h-full w-full'
                alt=''
              />
              <div className='absolute bottom-[20px] group-hover:bottom-[50px] transition-all duration-300 ease-in-out px-[15px] pt-[20px] pb-[15px] w-full z-2'>
                <p className='text-[22px] text-[#fff] mb-[5px]'>Bangkok – Thiên đường ăn chơi và mua sắm Đông Nam Á</p>
                <button className='text-[13px] border-[1px] border-[#fff] w-[150px] h-[40px] text-center bg-[#ffffff29] text-[#fff] rounded-[5px] cursor-pointer font-semibold'>
                  KHÁM PHÁ
                </button>
              </div>
              <div
                className='absolute top-0 w-full h-full z-1'
                style={{
                  background:
                    "linear-gradient(0deg,rgba(0,0,0,.6530987394957983) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)",
                }}
              ></div>
            </div>

            <div className='relative h-[245px] group cursor-pointer'>
              <img
                src='https://www.vietnamairlines.com/~/media/01436F67953546C19F8EFAAEBC5A9932.ashx'
                className='object-cover h-full w-full'
                alt=''
              />
              <div className='absolute bottom-[20px] group-hover:bottom-[50px] transition-all duration-300 ease-in-out px-[15px] pt-[20px] pb-[15px] w-full z-2'>
                <p className='text-[22px] text-[#fff] mb-[5px]'>Đà Lạt – Một Paris thu nhỏ</p>
                <button className='text-[13px] border-[1px] border-[#fff] w-[150px] h-[40px] text-center bg-[#ffffff29] text-[#fff] rounded-[5px] cursor-pointer font-semibold'>
                  KHÁM PHÁ
                </button>
              </div>
              <div
                className='absolute top-0 w-full h-full z-1'
                style={{
                  background:
                    "linear-gradient(0deg,rgba(0,0,0,.6530987394957983) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0) 100%)",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <button className='text-[13px] border-[2px] border-[#cc990e] text-[#cc990e] hover:bg-[#cc990e] hover:text-[#fff] rounded-[5px] w-[250px] h-[40px] !my-auto !mt-[5px] !mb-[15px] font-bold !text-center'>
            KHÁM PHÁ TẤT CẢ ĐIỂM ĐẾN
          </button>
        </div>
      </div>

      <div className='w-[75%] m-auto'>
        <div className='mt-[35px] text-center relative overflow-hidden'>
          <h2 className='relative font-normal text-[35px] text-[#1f1f1f] px-[10px] text-center bg-[#fff] w-fit inline-block z-10'>
            Thông tin nổi bật
          </h2>
          <hr className='absolute top-[25%] left-0 w-full transform -translate-y-[8px] p-0 h-0 border-[#303030] border-t-[1px]' />
        </div>
        <Slider />
      </div>
    </>
  );
};

export default page;
