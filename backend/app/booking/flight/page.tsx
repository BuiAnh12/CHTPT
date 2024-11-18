"use client";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaCheck, FaChevronDown, FaChevronUp, FaRegClock, FaTag } from "react-icons/fa6";
import { TiTicket } from "react-icons/ti";
import { HiOutlineTicket } from "react-icons/hi2";
import { RiLuggageDepositFill } from "react-icons/ri";
import { PiFlowerLotusBold } from "react-icons/pi";
import { FaExternalLinkAlt } from "react-icons/fa";
import FindTicketModal from "../../../components/FindTicketModal";
import { MdLuggage, MdOutlineFlightTakeoff } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import BookingHeader from "../../../components/Header/BookingHeader";

type Props = {};

const page = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketPrice, setSelectedTicketPrice] = useState(null);
  const [findFlights, setFindFlights] = useState(false);

  const [totalFlights, setTotalFlights] = useState(null);

  useEffect(() => {
    localStorage.removeItem("passengerDetails");
  }, []);

  const fetchAllFlight = async () => {
    try {
      const res = await axios.get(`/api/flight/total/`);

      if (res.status === 200) {
        console.log(res);
        setTotalFlights(res.data);
      }
    } catch (error) {
      console.error("Error fetching flight info:", error);
    }
  };

  useEffect(() => {
    fetchAllFlight();
  }, []);

  if (!totalFlights) {
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <Spinner animation='border' />
      </div>
    );
  }

  const handleSelectTicket = (id) => {
    setSelectedTicket(id);
  };

  const handleSelectTicketPrice = (id) => {
    setSelectedTicketPrice(id);
  };

  return (
    <>
      <BookingHeader
        step={1}
        departure={totalFlights[0].departure.airportCode}
        arrival={totalFlights[0].arrival.airportCode}
        amountPassenger={null}
      />
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
            src='https://booking.vietnamairlines.com/statics/applications/booking/dynamicContent/1.0.78/assets/img/background/SGN/large.jpg'
            alt=''
            className='w-full h-full object-cover'
          />

          <div className='absolute top-[30%] right-[35%] bg-white px-[30px] py-[20px] rounded-[10px] text-[#005F6E] text-center'>
            <h1 className='font-bold text-[22px] mb-[5px]'>Chọn chuyến bay</h1>
            <h2 className='font-medium text-[20px]'>
              {totalFlights[0].departure.city} đến {totalFlights[0].arrival.city}
            </h2>
          </div>
        </div>

        {totalFlights &&
          totalFlights.map((flight, index) => {
            const departureTime = new Date(flight?.departure?.time);
            const arrivalTime = new Date(flight.arrival.time);

            const formattedDepartureTime = departureTime
              .toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })
              .replace(",", "");

            const formattedArrivalTime = arrivalTime
              .toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })
              .replace(",", "");

            // Tính toán khoảng thời gian
            const durationInMilliseconds = arrivalTime - departureTime;
            const durationInMinutes = Math.floor(durationInMilliseconds / 1000 / 60);

            // Chuyển đổi thành giờ và phút
            const hours = Math.floor(durationInMinutes / 60);
            const minutes = durationInMinutes % 60;

            // Định dạng kết quả
            const durationString = `${hours} tiếng ${minutes} phút`;

            const economyId = flight.flightId + "-economy";
            const businessId = flight.flightId + "-business";

            return (
              <div key={index} className='w-[75%] my-[20px] mx-auto'>
                <div
                  className=' rounded-[15px] overflow-hidden'
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.176) -2px 0px 12px",
                  }}
                >
                  <div className='grid grid-cols-12 w-full '>
                    <div className='col-span-8 flex items-center my-0 px-[15px] h-[160px] bg-[#fff]'>
                      <div className='flex-1 py-[10px] pr-[30px] ml-[8px] mr-[15px] border-r-[1px] border-[#D0D5DD] text-[#0062a9]'>
                        <div className='flex flex-row h-[21px] items-center'>
                          <span className='text-[17px]'>{formattedDepartureTime}</span>
                          <div className='relative flex flex-col gap-1 items-center mx-[2px] justify-center h-[2rem] w-[205px]'>
                            <span className='absolute top-[0px] text-[12px]'>Bay thẳng</span>
                            <div className=''>...........................................................</div>
                          </div>
                          <span className='text-[17px]'>{formattedArrivalTime}</span>
                        </div>

                        <div className='flex flex-row justify-between'>
                          <span className='text-[14px]'>{flight.departure.airportCode}</span>
                          <span className='text-[14px]'>{flight.arrival.airportCode}</span>
                        </div>

                        <div className='flex flex-row justify-between'>
                          <span className='text-[14px]'>Nhà ga 1</span>
                          <span className='text-[14px]'>Nhà ga 1</span>
                        </div>
                      </div>

                      <div className='flex-1 py-[10px] pr-[30px] ml-[8px] mr-[15px]'>
                        <div className='flex flex-col justify-between'>
                          <div className='flex items-center gap-2'>
                            <FaRegClock className='text-[12px]' />
                            <span className='text-[12px]'>Thời gian bay {durationString || "N/A"}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <MdOutlineFlightTakeoff className='text-[12px]' />
                            <span className='text-[12px]'>{`${flight.flightNumber} Hãng khai thác PTIT Airlines`}</span>
                          </div>
                          <span className='pt-[4px] text-[12px] underline px-[20px] text-[#00607d] hover:text-[#e6b441] cursor-pointer'>
                            Chi tiết hành trình
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`col-span-2 relative bg-[#005f6e] w-full h-[160px]  ${
                        selectedTicket === "popular-ticket" ? "scale-[1.12] z-1" : "scale-[1] z-0"
                      } flex flex-col items-center justify-center text-[#fff] pt-[20px] pb-[15px] cursor-pointer`}
                      onClick={() => {
                        if (selectedTicket !== "popular-ticket") {
                          handleSelectTicket("popular-ticket");
                        } else {
                          handleSelectTicket(null);
                        }
                      }}
                    >
                      <h4 className='font-medium text-[17px] mt-[5px]'>PHỔ THÔNG</h4>
                      <p>từ</p>
                      <h4 className='font-bold text-[20px]'>{flight.economyPrice.toLocaleString("vi-VN")}</h4>
                      <p>VND</p>

                      {selectedTicket === "popular-ticket" ? (
                        <FaChevronUp className='' />
                      ) : (
                        <FaChevronDown className='' />
                      )}

                      <FaTag className='absolute top-[10px] right-[5px] text-[25px]' />
                    </div>

                    <div
                      className={`col-span-2 relative bg-[#e6b441] w-full h-[160px]  ${
                        selectedTicket === "merchant-ticket" ? "scale-[1.12] z-1" : "scale-[1] z-0"
                      } flex flex-col items-center justify-center text-[#222222] pt-[20px] pb-[15px] cursor-pointer`}
                      onClick={() => {
                        if (selectedTicket !== "merchant-ticket") {
                          handleSelectTicket("merchant-ticket");
                        } else {
                          handleSelectTicket(null);
                        }
                      }}
                    >
                      <h4 className='font-medium text-[17px] mt-[5px]'>THƯƠNG GIA</h4>
                      <p>từ</p>
                      <h4 className='font-bold text-[20px]'>{flight.businessPrice.toLocaleString("vi-VN")}</h4>
                      <p>VND</p>

                      {selectedTicket === "merchant-ticket" ? (
                        <FaChevronUp className='' />
                      ) : (
                        <FaChevronDown className='' />
                      )}

                      <FaTag className='absolute top-[10px] right-[10px] text-[25px]' />
                    </div>
                  </div>

                  {(() => {
                    if (selectedTicket === "popular-ticket") {
                      return (
                        <div className='bg-[#f8f8f8] h-full text-[#222222] flex flex-col items-center'>
                          <span className='text-[20px] mt-[15px] font-semibold'>Chọn giá vé</span>
                          <span className='text-[14px] underline text-[#00607d] hover:text-[#e6b441] cursor-pointer'>
                            Điều kiện giá vé
                          </span>

                          <div className='flex items-center justify-center mt-[20px] gap-[15px] w-[30%] h-[460px] mx-auto'>
                            <label
                              className={`group w-[calc(100%+5px)] h-fit bg-[#fff] rounded-[20px] overflow-hidden border-[0px] 
                    hover:border-[5px] hover:border-[#f4f9f5] hover:shadow-[rgba(0,0,0,0.2)_0px_0px_8px]
          ${
            selectedTicketPrice === economyId
              ? "border-[5px] border-[#f4f9f5] shadow-[rgba(0,0,0,0.2)_0px_0px_8px]"
              : "border-[#fff]"
          }`}
                              style={{ boxShadow: "rgba(0, 0, 0, 0.176) 0px 0px 4px" }}
                              htmlFor={`${economyId}`}
                            >
                              <div
                                className={`relative px-[20px] pt-[15px] pb-[20px] flex flex-col justify-center items-center group-hover:bg-[#060706]
            ${selectedTicketPrice === economyId ? "bg-[#f4f9f5]" : "bg-[#fff]"}`}
                                style={{
                                  borderRadius: "50% 50% 54% 46% / 94% 94% 6% 6%",
                                  boxShadow: "rgba(0, 0, 0, 0.2) 0px -2px 10px",
                                }}
                              >
                                <input
                                  type='radio'
                                  name='choose-ticket'
                                  className='w-[16px] h-[16px] z-[1]'
                                  id={`${economyId}`}
                                  onChange={() => handleSelectTicketPrice(economyId)}
                                />
                                <div className=' z-[1]'>
                                  <span className='text-[22px] font-bold'>
                                    {flight.economyPrice.toLocaleString("vi-VN")}
                                  </span>{" "}
                                  <span className='text-[16px]'>VND</span>
                                </div>
                                <p className='text-[16px] font-semibold z-[1]'>Phổ Thông Tiết Kiệm</p>

                                <div
                                  className={`absolute top-0 left-0 right-0 w-full h-[90%] z-[0] group-hover:bg-[#f4f9f5] ${
                                    selectedTicketPrice === economyId ? "bg-[#f4f9f5]" : "bg-[#fff]"
                                  }`}
                                ></div>
                              </div>

                              <div className='h-fit w-full bg-[#fff] px-[10px] pb-[10px] pt-[15px]'>
                                <div className='flex gap-[6px] mb-[4px]'>
                                  <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] border-[1px] flex items-center justify-center'>
                                    <TiTicket className='text-[#275e6c] text-[20px] ' />
                                  </div>
                                  <div className='flex flex-col'>
                                    <span className='font-bold text-[13px]'>Thay đổi vé</span>
                                    <span className='text-[13px]'>Phí đổi vé tối đa 1.000.000 VND mỗi hành khách</span>
                                  </div>
                                </div>

                                <div className='flex gap-[6px] mb-[4px]'>
                                  <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                                    <HiOutlineTicket className='text-[#275e6c] text-[20px]' />
                                  </div>
                                  <div className='flex flex-col'>
                                    <span className='font-bold text-[13px]'>Hoàn vé</span>
                                    <span className='text-[13px]'>Phí hoàn vé tối đa 1.000.000 VND mỗi hành khách</span>
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

                                <div className='mt-[20px] ml-[10px] mb-[10px] text-[12px] text-[#008000] underline cursor-pointer flex gap-1 items-center'>
                                  <span>Chi tiết</span>
                                  <FaExternalLinkAlt />
                                </div>
                              </div>
                            </label>
                          </div>

                          <div className='text-[18px] mb-[15px] mt-[10px]'>
                            <div className='flex gap-1 items-center'>
                              {selectedTicketPrice && <FaCheck className='text-[#e6b441]' />}

                              <span>
                                {selectedTicketPrice
                                  ? "Quý khách đã chọn Phổ Thông Tiết Kiệm."
                                  : "Vui lòng chọn giá vé để tiếp tục."}
                              </span>
                            </div>
                          </div>

                          {selectedTicketPrice && (
                            <div className='mb-[20px] text-center w-full block'>
                              <Link
                                href={`/booking/summary/${flight.flightId}?class=economy`}
                                className='text-[18px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[5px] px-[15px] w-fit font-medium '
                              >
                                XÁC NHẬN VÀ TIẾP TỤC
                              </Link>
                            </div>
                          )}

                          <div
                            className='w-full border-t-[1px] border-[#00607d]'
                            onClick={() => handleSelectTicket(null)}
                          >
                            <FaChevronUp className='text-[18px]  my-[10px] text-center w-full block cursor-pointer' />
                          </div>
                        </div>
                      );
                    } else if (selectedTicket === "merchant-ticket") {
                      return (
                        <div className='bg-[#f8f8f8] h-full text-[#222222] flex flex-col items-center'>
                          <span className='text-[20px] mt-[15px] font-semibold'>Chọn giá vé</span>
                          <span className='text-[14px] underline text-[#00607d] hover:text-[#e6b441] cursor-pointer'>
                            Điều kiện giá vé
                          </span>

                          <div className='flex items-center justify-center mt-[0px] gap-[15px] w-[30%] h-[450px] mx-auto'>
                            <label
                              className={`group w-[calc(100%+5px)] h-fit bg-[#fff] rounded-[20px] overflow-hidden border-[0px] 
                    hover:border-[5px] hover:border-[#f4f9f5] hover:shadow-[rgba(0,0,0,0.2)_0px_0px_8px]
          ${
            selectedTicketPrice === businessId
              ? "border-[5px] border-[#f4f9f5] shadow-[rgba(0,0,0,0.2)_0px_0px_8px]"
              : "border-[#fff]"
          }`}
                              style={{ boxShadow: "rgba(0, 0, 0, 0.176) 0px 0px 4px" }}
                              htmlFor={`${businessId}`}
                            >
                              <div
                                className={`relative px-[20px] pt-[15px] pb-[20px] flex flex-col justify-center items-center group-hover:bg-[#f4f9f5]
            ${selectedTicketPrice === businessId ? "bg-[#f4f9f5]" : "bg-[#fff]"}`}
                                style={{
                                  borderRadius: "50% 50% 54% 46% / 94% 94% 6% 6%",
                                  boxShadow: "rgba(0, 0, 0, 0.2) 0px -2px 10px",
                                }}
                              >
                                <input
                                  type='radio'
                                  name='choose-ticket'
                                  className='w-[16px] h-[16px] z-[1]'
                                  id={`${businessId}`}
                                  onChange={() => handleSelectTicketPrice(businessId)}
                                />
                                <div className=' z-[1]'>
                                  <span className='text-[22px] font-bold'>
                                    {flight.businessPrice.toLocaleString("vi-VN")}
                                  </span>{" "}
                                  <span className='text-[16px]'>VND</span>
                                </div>
                                <p className='text-[16px] font-semibold z-[1]'>Thương gia</p>

                                <div
                                  className={`absolute top-0 left-0 right-0 w-full h-[90%] z-[0] group-hover:bg-[#f4f9f5] ${
                                    selectedTicketPrice === businessId ? "bg-[#f4f9f5]" : "bg-[#fff]"
                                  }`}
                                ></div>
                              </div>

                              <div className='h-fit w-full bg-[#fff] px-[10px] pb-[10px] pt-[15px]'>
                                <div className='flex gap-[6px] mb-[4px]'>
                                  <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] border-[1px] flex items-center justify-center'>
                                    <TiTicket className='text-[#275e6c] text-[20px] ' />
                                  </div>
                                  <div className='flex flex-col'>
                                    <span className='font-bold text-[13px]'>Thay đổi vé</span>
                                    <span className='text-[13px]'>Phí đổi vé tối đa 1.000.000 VND mỗi hành khách</span>
                                  </div>
                                </div>

                                <div className='flex gap-[6px] mb-[4px]'>
                                  <div className='size-[20px] rounded-full border-[#275e6c] px-[2px] py-[1px] flex items-center justify-center'>
                                    <HiOutlineTicket className='text-[#275e6c] text-[20px]' />
                                  </div>
                                  <div className='flex flex-col'>
                                    <span className='font-bold text-[13px]'>Hoàn vé</span>
                                    <span className='text-[13px]'>Phí hoàn vé tối đa 1.000.000 VND mỗi hành khách</span>
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

                                <div className='mt-[20px] ml-[10px] mb-[10px] text-[12px] text-[#008000] underline cursor-pointer flex gap-1 items-center'>
                                  <span>Chi tiết</span>
                                  <FaExternalLinkAlt />
                                </div>
                              </div>
                            </label>
                          </div>

                          <div className='text-[18px] mb-[15px] mt-[0px]'>
                            <div className='flex gap-1 items-center'>
                              {selectedTicketPrice && <FaCheck className='text-[#e6b441]' />}

                              <span>
                                {selectedTicketPrice
                                  ? "Quý khách đã chọn Phổ Thông Tiết Kiệm."
                                  : "Vui lòng chọn giá vé để tiếp tục."}
                              </span>
                            </div>
                          </div>

                          {selectedTicketPrice && (
                            <div className='mb-[20px] text-center w-full block'>
                              <Link
                                href={`/booking/summary/${flight.flightId}?class=business`}
                                className='text-[18px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[5px] px-[15px] w-fit font-medium '
                              >
                                XÁC NHẬN VÀ TIẾP TỤC
                              </Link>
                            </div>
                          )}

                          <div
                            className='w-full border-t-[1px] border-[#00607d]'
                            onClick={() => handleSelectTicket(null)}
                          >
                            <FaChevronUp className='text-[18px]  my-[10px] text-center w-full block cursor-pointer' />
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default page;
