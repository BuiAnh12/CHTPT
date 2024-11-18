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
import io from "socket.io-client";
import BookingHeader from "../../../../components/Header/BookingHeader";
import { useParams, useSearchParams } from "next/navigation";

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
  time: string;
}

interface Seats {
  [seatNumber: string]: Seat;
}

interface Seat {
  status: "free" | "register" | "purchase" | "locked";
  registeredBy?: RegistrationInfo;
  purchasedBy?: PurchaseInfo;
  lockedBy?: LockedInfo;
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

interface LockedInfo {
  paymentInfo: PaymentInfo;
  timestamp: string;
  userId: string;
}

interface PaymentInfo {
  amount: number;
  method: string;
}

const socket = io({
  path: "/api/socket",
});

const page = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const flight_id = params.flight_id;
  const flightClass = searchParams.get("class");
  const { user } = useUser();

  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);

  const [passengerDetails, setPassengerDetails] = useState(() => {
    if (typeof window !== "undefined") {
      const storedInfo = localStorage.getItem("passengerDetails");
      return storedInfo ? JSON.parse(storedInfo) : [{}];
    }
    return [{}];
  });

  const [allPassengersHaveSeat, setAllPassengersHaveSeat] = useState(false);
  const [allPassengersHaveSeatAndRegister, setAllPassengersHaveSeatAndRegister] = useState(false);

  const fetchFlightInfo = async () => {
    try {
      const result = await axios.get(`/api/flight/info/${flight_id}`);

      socket.emit("joinFlight", { flightId: flight_id, flightInfo: result.data });
    } catch (error) {
      console.error("Error fetching flight info:", error);
    }
  };

  useEffect(() => {
    fetchFlightInfo();

    // Lắng nghe sự kiện flightInfo từ server
    socket.on("flightInfo", ({ flightInfo }) => {
      setFlightInfo(flightInfo);
    });

    // Dọn dẹp sự kiện khi component bị unmount
    return () => {
      socket.off("flightInfo"); // Dọn dẹp sự kiện flightInfo
      socket.off("seatStatusUpdated"); // Nếu cần dọn dẹp thêm các sự kiện khác
    };
  }, [flight_id]);

  useEffect(() => {
    socket.on("seatStatusUpdated", ({ seatId, status, lockedBy, registeredBy, passengerDetails }) => {
      // Update flight information
      setFlightInfo((prevInfo) => {
        if (!prevInfo) return null;
        const updatedSeats = {
          ...prevInfo.seats,
          [seatId]: { ...prevInfo.seats[seatId], status, lockedBy, registeredBy, passengerDetails },
        };
        return { ...prevInfo, seats: updatedSeats };
      });

      // Update passenger details

      // Update passenger details
      setPassengerDetails((prevDetails) => {
        const updatedDetails = [...prevDetails];
        // Find the index of the passenger you want to update
        const index = updatedDetails.findIndex((passenger) => passenger.passengerId === passengerDetails.passengerId);

        if (index !== -1) {
          updatedDetails[index] = passengerDetails;
        }

        return updatedDetails;
      });
    });

    return () => {
      socket.off("seatStatusUpdated");
    };
  }, []);

  useEffect(() => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    console.log(`Updated flightInfo at ${time}:`, flightInfo);
  }, [flightInfo]);

  useEffect(() => {
    if (passengerDetails && Array.isArray(passengerDetails)) {
      const allRegistered = passengerDetails.every(
        (passenger) => passenger.seatId !== undefined && passenger.seatId !== null && passenger.status === "register"
      );
      setAllPassengersHaveSeatAndRegister(allRegistered);

      const allLocked = passengerDetails.every(
        (passenger) => passenger.seatId !== undefined && passenger.seatId !== null
      );
      setAllPassengersHaveSeat(allLocked);
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    console.log(`Updated passengerDetails at ${time}:`, passengerDetails);

    localStorage.setItem("passengerDetails", JSON.stringify(passengerDetails));
  }, [passengerDetails]);

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

  const handleSeatSelection = (seatId: string, seatInfo: Seat) => {
    if (allPassengersHaveSeatAndRegister) {
      toast.error("Vui lòng nhấn vào hủy chọn chỗ để bắt đầu chọn lại chỗ!");
    } else {
      // Get the current passenger from the list
      const nextPassengerIndex = passengerDetails.findIndex((passenger) => !passenger.seatId);
      if (seatInfo?.status === "locked" && seatInfo.lockedBy?.userId === user.userId) {
        const passengerIndex = passengerDetails.findIndex(
          (passenger) => passenger.seatId === seatInfo.passengerDetails.seatId
        );
        const currentPassenger = passengerDetails[passengerIndex];

        socket.emit("unlockSeat", {
          flightId: flight_id,
          seatId,
          passengerDetails: currentPassenger,
        });
      } else if (seatInfo?.status === "free" && nextPassengerIndex !== -1) {
        const currentPassenger = passengerDetails[nextPassengerIndex];
        // Lock the seat and associate it with the current passenger
        socket.emit("lockSeat", {
          flightId: flight_id,
          seatId,
          userId: user.userId,
          passengerDetails: currentPassenger,
        });
      } else {
        toast.error("Vui lòng nhấn lại chỗ ngồi đã chọn để hủy chọn trước khi chọn chỗ ngồi mới!");
      }
    }
  };

  const handleConfirmSeat = async () => {
    if (allPassengersHaveSeatAndRegister) {
      router.push(`/booking/payment/${flight_id}?class=${flightClass}`);
    } else {
      if (allPassengersHaveSeat) {
        let errorStatus = false;

        try {
          // Loop through each passenger and confirm their seat
          for (const passenger of passengerDetails) {
            if (passenger.seatId) {
              const registerTime = new Date().toISOString();
              const res = await axios.post(`/api/flight/${flight_id}/seat/register/${passenger.seatId}`, {
                userId: user.userId,
                passengerDetails: passenger,
                registerTime,
              });

              if (res.status === 200) {
                toast.success(`Chọn ghế cho hành khách ${passenger.firstName} thành công`);

                socket.emit("seatReserved", {
                  flightId: flight_id,
                  seatId: passenger.seatId,
                  userId: user.userId,
                  passengerDetails: passenger,
                  registerTime,
                });
              } else {
                errorStatus = true;
                toast.error(`Không thể chọn ghế cho hành khách ${passenger.name}`);
                break;
              }
            }
          }

          // If any reservation failed, rollback the successful reservations
          if (errorStatus) {
            for (const passenger of passengerDetails) {
              await axios.post(`/api/flight/${flight_id}/seat/reset/${passenger.seatId}`);
              socket.emit("unlockSeat", {
                flightId: flight_id,
                seatId: passenger.seatId,
                passengerDetails: passenger,
              });
            }
            toast.error("Đã hủy chọn ghế cho tất cả hành khách do lỗi.");
          } else {
            router.push(`/booking/payment/${flight_id}?class=${flightClass}`);
          }
        } catch (error) {
          for (const passenger of passengerDetails) {
            await axios.post(`/api/flight/${flight_id}/seat/reset/${passenger.seatId}`);
            socket.emit("unlockSeat", {
              flightId: flight_id,
              seatId: passenger.seatId,
              passengerDetails: passenger,
            });
          }
          toast.error("Có lỗi xảy ra khi xác nhận chỗ ngồi.");
        }
      } else {
        toast.error("Vui lòng chọn ghế cho toàn bộ hành khách!");
      }
    }
  };

  const handleCancelSeat = async () => {
    for (const passenger of passengerDetails) {
      try {
        const res = await axios.post(`/api/flight/${flight_id}/seat/reset/${passenger.seatId}`);
        socket.emit("unlockSeat", {
          flightId: flight_id,
          seatId: passenger.seatId,
          passengerDetails: passenger,
        });
        toast.success("Hủy chọn chỗ thành công");
      } catch (error) {
        socket.emit("unlockSeat", {
          flightId: flight_id,
          seatId: passenger.seatId,
          passengerDetails: passenger,
        });
        console.log(error);
      }
    }
  };

  const getSeatStatus = (seatInfo) => {
    if (seatInfo.status === "free") {
      return "";
    } else {
      if (seatInfo.purchasedBy) {
        return "already";
      } else if (seatInfo.registeredBy) {
        if (seatInfo.registeredBy.userId === user.userId) {
          return "active";
        } else {
          return "already";
        }
      } else if (seatInfo.lockedBy) {
        if (seatInfo.lockedBy.userId === user.userId) {
          return "active";
        } else {
          return "already";
        }
      }
    }
  };

  return (
    <>
      <BookingHeader
        step={3}
        departure={flightInfo.departure.airportCode}
        arrival={flightInfo.arrival.airportCode}
        amountPassenger={passengerDetails.length}
      />

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
              {row1?.map((group, groupIndex) => (
                <div key={groupIndex} className='seats-triple'>
                  {group.map(([seatName, seatInfo]) => (
                    <div
                      key={seatName}
                      className={`seat ${getSeatStatus(seatInfo)}`}
                      onClick={() => handleSeatSelection(seatName, seatInfo)}
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
              {row2?.map((group, groupIndex) => (
                <div key={groupIndex} className='seats-triple' data-line={`${groupIndex + 1}`}>
                  {group.map(([seatName, seatInfo]) => (
                    <div
                      key={seatName}
                      className={`seat ${getSeatStatus(seatInfo)}`}
                      onClick={() => handleSeatSelection(seatName, seatInfo)}
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
                  <span className='font-bold text-[17px] text-[#007390]'>{`${
                    flightClass === "economy"
                      ? (flightInfo.economyPrice - 608000).toLocaleString("vi-VN")
                      : (flightInfo.businessPrice - 608000).toLocaleString("vi-VN")
                  }`}</span>
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
                    <span className='font-bold text-[13px] text-[#007390]'>{`Hành khách x ${passengerDetails.length}`}</span>
                    <span className=''>
                      <span className='font-bold text-[17px] text-[#007390] mr-[4px]'>
                        {flightClass === "economy"
                          ? ((flightInfo.economyPrice - 608000) * passengerDetails.length).toLocaleString("vi-VN")
                          : ((flightInfo.businessPrice - 608000) * passengerDetails.length).toLocaleString("vi-VN")}
                      </span>
                      <span className='text-[13px] text-[#007390]'>VND</span>
                    </span>
                  </div>
                  {passengerDetails.map((passenger, index) => (
                    <span
                      key={index}
                      className='text-[13px] uppercase'
                    >{`${passenger.title} ${passenger.firstName}`}</span>
                  ))}
                </div>
              </div>
            </div>

            {passengerDetails.some((passenger) => passenger.seatId) && (
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
                {passengerDetails.map(
                  (passenger, index) =>
                    passenger.seatId && (
                      <div key={index} className='px-[10px] py-[4px] flex flex-row justify-between items-center'>
                        <span className='font-bold text-[13px] my-[2px]'>{`${passenger.title} ${passenger.firstName} - Ghế: ${passenger.seatId}`}</span>
                      </div>
                    )
                )}

                {allPassengersHaveSeatAndRegister && (
                  <div
                    className='text-[14px] text-[#fff] hover:text-[#e64141] bg-[#e64141] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e64141] py-[3px] px-[6px] my-[10px] mr-[10px] ml-auto flex items-end w-fit font-medium cursor-pointer'
                    onClick={() => handleCancelSeat()}
                  >
                    HỦY CHỌN CHỖ
                  </div>
                )}
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
                <p className='text-[13px]'>Chỗ ngồi không còn</p>
                <p className='text-[13px]'>trống</p>
              </div>

              <div className='flex flex-col items-center'>
                <div className='h-[40px] flex items-center justify-center mb-[4px]'>
                  <img alt='' src='https://i.ibb.co/ftwgLCL/exist.png' />
                </div>
                <p className='text-[13px]'>Lối thoát</p>
                <p className='text-[13px]'>hiểm</p>
              </div>

              <p className='text-[12px] text-red-400'>
                * Hành khách vui lòng chọn chỗ và nhấn vào nút "XÁC NHẬN VÀ TIẾP TỤC" nếu không sau 1 phút ghế sẽ bị hủy
              </p>
            </div>
          </div>

          <div className='my-[20px] flex justify-end'>
            <Link
              href={`/booking/traveler/${flight_id}?class=${flightClass}`}
              className='mr-[10px] text-[18px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[10px] px-[25px] w-fit font-medium flex items-center justify-center'
            >
              <FaArrowLeftLong />
            </Link>

            <div
              className={`text-[18px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[10px] px-[15px] w-fit font-medium cursor-pointer ${
                !allPassengersHaveSeat ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleConfirmSeat()}
            >
              XÁC NHẬN VÀ TIẾP TỤC
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
