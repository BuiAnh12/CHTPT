"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoAirplaneSharp } from "react-icons/io5";
import { useUser } from "../../../../contexts/UserContext";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import toast from "react-hot-toast";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { useRouter } from "next/navigation";

type Props = {};

export interface FlightInfo {
  arrival: LocationInfo;
  departure: LocationInfo;
  flightNumber: string;
  seats: Seats;
}

interface LocationInfo {
  airportCode: string;
  city: string;
  time: string; // You could use Date instead if you plan to parse this as a date.
}

interface Seats {
  [seatNumber: string]: Seat;
}

interface Seat {
  status: "free" | "register" | "purchase";
  registeredBy?: RegistrationInfo;
  purchasedBy?: PurchaseInfo;
}

interface RegistrationInfo {
  timestamp: string;
  userId: string;
}

interface PurchaseInfo {
  paymentInfo: PaymentInfo;
  timestamp: string;
  userId: string;
}

interface PaymentInfo {
  amount: number;
  method: string;
}

const page = ({ params }) => {
  const router = useRouter();

  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);
  const [activeSeat, setActiveSeat] = useState(null);
  const [userSeat, setUserSeat] = useState<Record<string, any> | undefined>(undefined);

  const { flight_id } = params;
  const { user } = useUser();

  const fetchFlightInfo = async () => {
    try {
      const result = await axios.get(`/api/flight/info/${flight_id}`);
      setFlightInfo(result.data);
    } catch (error) {
      console.error("Error fetching flight info:", error);
    }
  };

  const findSeatsByUserId = (seats, userId) => {
    const result = [];
    for (const seatId in seats) {
      const seat = seats[seatId];
      if (seat.registeredBy && seat.registeredBy.userId === userId) {
        result.push({ seatId, ...seat });
      }
    }
    return result;
  };

  useEffect(() => {
    fetchFlightInfo();
  }, [flight_id]);

  useEffect(() => {
    if (flightInfo) {
      setUserSeat(findSeatsByUserId(flightInfo.seats, user?.userId)[0]);
      console.log(userSeat);
    }
  }, [flightInfo, user]);

  if (!flightInfo) {
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <Spinner animation='border' />
      </div>
    );
  }

  const departureTime = new Date(flightInfo?.departure?.time);
  const arrivalTime = new Date(flightInfo.arrival.time);

  const formattedDepartureTime = departureTime
    .toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "long",
      year: "numeric",
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

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Convert seat data to an array of [seatName, seatInfo] pairs and group by 3 seats each
  const seatEntries = Object.entries(flightInfo.seats);
  const seatGroups = chunkArray(seatEntries, 3); // Groups of 3 seats

  // Now divide the 3-seat groups into 2 main rows of 32 groups each
  const [row1, row2] = chunkArray(seatGroups, 32); // Two main rows with 32 groups each

  const handleChooseSeat = async () => {
    if (activeSeat !== null) {
      const seat = flightInfo.seats[activeSeat];

      if (seat?.status === "free") {
        try {
          const res = await axios.post(`/api/flight/${flight_id}/seat/register/${activeSeat}`, {
            userId: user.userId,
          });
          if (res.status === 200) {
            toast.success("Chọn chỗ thành công");
            fetchFlightInfo();
            router.push(`/booking/payment/${flight_id}`);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("Chỗ ngồi không còn trống. Vui lòng chọn chỗ ngồi khác!");
      }
    } else {
      toast.error("Vui lòng chọn chỗ để tiếp tục!");
    }
  };

  const handleCancelSeat = async () => {
    try {
      const res = await axios.post(`/api/flight/${flight_id}/seat/reset/${userSeat?.seatId}`);
      console.log(res);
      if (res.status === 200) {
        toast.success("Hủy chọn chỗ thành công");
        fetchFlightInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-[75%] my-[20px] mx-auto grid grid-cols-12'>
      <div className='col-span-8 aircraft'>
        <div className='relative aircraft-body'>
          <div className='top-left-exists'>
            <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
          </div>
          <div className='top-right-exists'>
            <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
          </div>

          <div className='seats'>
            <div className='absolute top-[-25px] left-[30px] flex gap-[35px]'>
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </div>
            {row1.map((group, groupIndex) => (
              <div key={groupIndex} className='seats-triple'>
                {group.map(([seatName, seatInfo]) => (
                  <div
                    key={seatName}
                    className={`seat ${
                      seatInfo?.status === "free"
                        ? activeSeat === seatName
                          ? "active"
                          : ""
                        : userSeat?.seatId === seatName
                        ? "active"
                        : "already"
                    }`}
                    onClick={() => {
                      if (userSeat !== undefined) {
                        toast.error("Vui lòng hủy chỗ để chọn lại chỗ!");
                      } else if (seatInfo?.status === "free") {
                        setActiveSeat(seatName);
                      } else {
                        toast.error("Chỗ ngồi đã không còn trống. Vui lòng chọn chỗ ngồi khác!");
                      }
                    }}
                  ></div>
                ))}
              </div>
            ))}
            <div className='absolute bottom-[-25px] left-[30px] flex gap-[35px]'>
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </div>
          </div>
          <div className='seats'>
            <div className='absolute top-[-25px] right-[30px] flex gap-[35px]'>
              <span>D</span>
              <span>E</span>
              <span>F</span>
            </div>
            {row2.map((group, groupIndex) => (
              <div key={groupIndex} className='seats-triple' data-line={`${groupIndex + 1}`}>
                {group.map(([seatName, seatInfo]) => (
                  <div
                    key={seatName}
                    className={`seat ${
                      seatInfo?.status === "free"
                        ? activeSeat === seatName
                          ? "active"
                          : ""
                        : userSeat?.seatId === seatName
                        ? "active"
                        : "already"
                    }`}
                    onClick={() => {
                      if (userSeat !== undefined) {
                        toast.error("Vui lòng hủy chỗ để chọn lại chỗ!");
                      } else if (seatInfo?.status === "free") {
                        setActiveSeat(seatName);
                      } else {
                        toast.error("Chỗ ngồi đã không còn trống. Vui lòng chọn chỗ ngồi khác!");
                      }
                    }}
                  ></div>
                ))}
              </div>
            ))}
            <div className='absolute bottom-[-25px] right-[30px] flex gap-[35px]'>
              <span>D</span>
              <span>E</span>
              <span>F</span>
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
          <h3 className='font-semibold text-[20px] text-[#007390] border-b-[2px] border-[#0980A0] px-[10px] py-[15px] m-0'>
            Chi tiết chuyến bay
          </h3>

          <div className=''>
            <div className='flex items-center justify-between px-[10px] py-[6px] bg-[#cce3e0] cursor-pointer'>
              <div className='flex items-center gap-2'>
                <IoAirplaneSharp className='text-[#007390]' />
                <div className='flex items-center gap-1'>
                  <span className='text-[13px]'>{flightInfo.departure.airportCode || "Unknown"}</span>
                  <FaArrowRightLong className='text-[#007390]' />
                  <span className='text-[13px]'>{flightInfo.arrival.airportCode || "Unknown"}</span>
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
                <span>{formattedDepartureTime}</span>
              </div>

              <div className='p-[10px] flex flex-col'>
                <div className='flex items-center gap-1'>
                  <span className='font-bold text-[14px]'>
                    {flightInfo?.departure?.city || "Unknown"} ({flightInfo?.departure?.airportCode || "N/A"})
                  </span>
                  <FaArrowRightLong className='font-bold text-[14px]' />
                  <span className='font-bold text-[14px]'>
                    {flightInfo?.arrival?.city || "Unknown"} ({flightInfo?.arrival?.airportCode || "N/A"})
                  </span>
                </div>
                <p className='text-[13px] my-[2px]'>Thời gian: {durationString || "N/A"} / Bay thẳng</p>
                <p className='text-[13px] my-[2px]'>{flightInfo?.flightNumber || "Unknown Flight Number"}</p>
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
                <span className='text-[13px] uppercase'>{user.name}</span>
              </div>
            </div>
          </div>

          {(activeSeat || userSeat !== undefined) && (
            <div className=''>
              <div className='flex items-center justify-between px-[10px] py-[6px] bg-[#cce3e0] cursor-pointer'>
                <div className='flex items-center gap-2'>
                  <MdAirlineSeatReclineExtra className='text-[#007390]' />
                  <div className='flex items-center gap-1'>
                    <span className='text-[13px]'>Chỗ ngồi</span>
                  </div>
                </div>

                <div className='flex gap-1'>
                  <FaAngleDown className='ml-[8px] mt-[4px] text-[#007390]' />
                </div>
              </div>

              <div className=''>
                <div className='p-[10px] flex flex-row justify-between items-center'>
                  <span className='font-bold text-[13px] my-[2px]'>{`Ghế đang chọn: ${
                    userSeat?.seatId ? userSeat?.seatId : activeSeat
                  }`}</span>

                  {userSeat !== undefined && (
                    <div
                      className='text-[14px] text-[#fff] hover:text-[#e64141] bg-[#e64141] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e64141] py-[3px] px-[6px] w-fit font-medium cursor-pointer'
                      onClick={() => handleCancelSeat()}
                    >
                      HỦY CHỌN CHỖ
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
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

          <div className='flex flex-wrap gap-2 px-[10px] py-[15px]'>
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
              <p className='text-[13px]'>Chỗ ngồi còn</p>
              <p className='text-[13px]'>trống</p>
            </div>

            <div className='flex flex-col items-center'>
              <div className='h-[40px] flex items-center justify-center mb-[4px]'>
                <div className='seat already'></div>
              </div>
              <p className='text-[13px]'>Chỗ không ngồi còn</p>
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
            href={`/booking/traveler/${flight_id}`}
            className='mr-[10px] text-[18px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[10px] px-[25px] w-fit font-medium flex items-center justify-center'
          >
            <FaArrowLeftLong />
          </Link>

          <div
            className='text-[18px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[10px] px-[15px] w-fit font-medium cursor-pointer'
            onClick={() => handleChooseSeat()}
          >
            CHỌN CHỖ VÀ TIẾP TỤC
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
