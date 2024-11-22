"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaArrowLeftLong, FaArrowRightLong, FaDivide } from "react-icons/fa6";
import { IoAirplaneSharp } from "react-icons/io5";
import { MdAirlineSeatReclineExtra, MdFeed } from "react-icons/md";
import { useUser } from "../../../../contexts/UserContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import io from "socket.io-client";
import BookingHeader from "../../../../components/Header/BookingHeader";
import { useParams, useSearchParams } from "next/navigation";
import { FlightInfo, User } from "../../../../util/interface";

type Props = {};

const socket = io({
  path: "/api/socket",
});

const page = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const flight_id = params!.flight_id;
  const flightClass = searchParams!.get("class");
  const { user } = useUser() as { user: User };

  const [money, setMoney] = useState(0);
  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);
  const [passengerDetails, setPassengerDetails] = useState(() => {
    if (typeof window !== "undefined") {
      const storedInfo = localStorage.getItem("passengerDetails");
      return storedInfo ? JSON.parse(storedInfo) : [{}];
    }
    return [{}];
  });
  const [updatedSeatsCount, setUpdatedSeatsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formattedDepartureTime, setFormattedDepartureTime] = useState("");
  const [durationString, setDurationString] = useState("");
  const [allPassengersHaveSeat, setAllPassengersHaveSeat] = useState(false);
  const [allPassengersHaveSeatAndRegister, setAllPassengersHaveSeatAndRegister] = useState(false);

  useEffect(() => {
    socket.emit("joinFlight", { flightId: flight_id });

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
    socket.on("seatStatusUpdated", ({ seatId, status, lockedBy, registeredBy, purchasedBy, passengerDetails }) => {
      // Update flight information
      setFlightInfo((prevInfo) => {
        if (!prevInfo) return null;
        const updatedSeats = {
          ...prevInfo.seats,
          [seatId]: { ...prevInfo.seats[seatId], status, lockedBy, registeredBy, purchasedBy, passengerDetails },
        };
        return { ...prevInfo, seats: updatedSeats };
      });

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

      if (status === "purchase") {
        setUpdatedSeatsCount((prevCount) => prevCount + 1);
      }
    });

    return () => {
      socket.off("seatStatusUpdated");
    };
  }, []);

  useEffect(() => {
    if (flightInfo) {
      setIsLoading(true);

      const departureTime = new Date(flightInfo.departure.time);
      const arrivalTime = new Date(flightInfo.arrival.time);

      const formattedTime = departureTime
        .toLocaleString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })
        .replace(",", "");

      setFormattedDepartureTime(formattedTime);

      // Tính toán khoảng thời gian
      const durationInMilliseconds = arrivalTime.getTime() - departureTime.getTime();
      const durationInMinutes = Math.floor(durationInMilliseconds / 1000 / 60);
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;

      const duration = `${hours} tiếng ${minutes} phút`;
      setDurationString(duration);
    }
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    console.log(`Payment Updated flightInfo at ${time}:`, flightInfo);
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
    console.log(`Payment Updated passengerDetails at ${time}:`, passengerDetails);

    localStorage.setItem("passengerDetails", JSON.stringify(passengerDetails));
  }, [passengerDetails]);

  const handleSendEmail = async (
    userEmail: string,
    seatInfo: string,
    money: number,
    flightNumber: string,
    ticketCode: string
  ) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toEmail: userEmail,
          seatInfo,
          money,
          flightNumber,
          ticketCode,
        }),
      });
    } catch (error) {
      console.error("Đã có lỗi xảy ra:", error);
    }
  };

  const generateRandomString = (length = 15): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?/!@#$%^&*()[]{}";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handlePayment = async () => {
    if (flightInfo) {
      let totalMoney = 0;

      // Tính tổng số tiền cần thanh toán dựa trên hạng vé
      if (flightClass === "economy") {
        totalMoney = flightInfo.economyPrice * passengerDetails.length;
      } else {
        totalMoney = flightInfo.businessPrice * passengerDetails.length;
      }

      console.log("money: ", money);
      console.log("totalMoney: ", totalMoney);

      // Kiểm tra nếu số tiền nhập vào bằng 0
      if (money === 0) {
        toast.error("Vui lòng nhập số tiền cần thanh toán!");
        return;
      }

      // Kiểm tra nếu số tiền nhập vào không đúng
      if (totalMoney != money) {
        toast.error("Vui lòng nhập đúng số tiền cần thanh toán!");
        return;
      }

      try {
        // Kiểm tra tất cả các chỗ ngồi có trạng thái "register" hay không
        for (const passenger of passengerDetails) {
          if (passenger.status !== "register") {
            toast.error("Chỗ ngồi đã bị hết hạn, vui lòng quay lại trang chọn chỗ ngồi để chọn lại!");
            return; // Dừng quá trình nếu có chỗ ngồi hết hạn
          }
        }

        const registerTime = new Date().toISOString();
        // Thực hiện tất cả các yêu cầu thanh toán đồng thời
        const purchasePromises = passengerDetails.map(async (passenger) => {
          let ticketCode = generateRandomString();

          // Purchase ticket
          const purchaseRequest = axios.post(`/api/flight/${flight_id}/seat/purchase/${passenger.seatId}`, {
            userId: user.userId,
            ticketCode,
            paymentInfo: {
              amount: money / passengerDetails.length,
              method: "credit_card",
            },
            passengerDetails: passenger,
            registerTime,
          });

          // Send email
          const sendEmail = handleSendEmail(
            passenger.email,
            passenger.seatId,
            money / passengerDetails.length,
            flightInfo.flightNumber,
            ticketCode
          );

          return Promise.allSettled([purchaseRequest, sendEmail]);
        });

        // Đợi tất cả lời hứa hoàn thành
        const results = await Promise.allSettled(purchasePromises);

        // Xử lý các yêu cầu thành công
        const successfulRequests = results.filter((result) => result.status === "fulfilled");

        if (successfulRequests.length === passengerDetails.length) {
          // Tất cả yêu cầu đều thành công
          passengerDetails.forEach((passenger) => {
            socket.emit("seatPurchased", {
              flightId: flight_id,
              seatId: passenger.seatId,
              userId: user.userId,
              passengerDetails: passenger,
              registerTime,
              paymentInfo: {
                amount: money / passengerDetails.length,
                method: "credit_card",
              },
            });
          });
        } else {
          // Xử lý các yêu cầu không thành công
          const failedRequests = results.filter((result) => result.status === "rejected");
          console.error(
            "Các yêu cầu thất bại:",
            failedRequests.map((req) => req.reason)
          );
          toast.error("Một hoặc nhiều chỗ ngồi đã bị hết hạn hoặc xảy ra lỗi!");
        }
      } catch (error) {
        console.error("Lỗi khi thực hiện thanh toán:", error);
        toast.error("Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau!");
      }
    }
  };

  useEffect(() => {
    setIsLoading(false);
    if (updatedSeatsCount == passengerDetails.length) {
      setIsLoading(true);
      toast.success("Thanh toán thành công!");

      router.push(`/home`);
    }
  }, [updatedSeatsCount, passengerDetails.length]);

  return (
    <>
      {!isLoading || !flightInfo ? (
        <div className='h-screen w-full flex items-center justify-center'>
          <Spinner animation='border' />
        </div>
      ) : (
        <>
          <BookingHeader
            step={4}
            departure={flightInfo.departure.airportCode}
            arrival={flightInfo.arrival.airportCode}
            amountPassenger={passengerDetails.length}
          />

          <div className='w-[75%] my-[20px] mx-auto '>
            <div
              className='p-[20px] bg-white rounded-md'
              style={{
                boxShadow: "0 4px 8px rgba(0,0,0,.175)",
              }}
            >
              <h4 className='font-semibold text-[#8f7028]'>Lưu ý:</h4>
              <span className='text-[13px]'>
                PTIT Airlines đặt trụ sở tại Việt Nam. Tùy theo chính sách của mình, ngân hàng phát hành thẻ có thể thu
                phí trên mỗi giao dịch của Qúy khách. PTIT Airlines tuyệt đối không chịu chách nhiệm khi phát sinh bất
                kỳ khoản phí nào liên quan đến việc sử dụng để thanh toán tại website của PTIT Airlines. Qúy khách nên
                trực tiếp liên hệ với ngân hàng phát hành thẻ để có đầy đủ thông tin về chi phí phát sinh.
              </span>
            </div>

            <h1 className='font-semibold text-[24px] text-[#007390] my-[20px] '>THANH TOÁN</h1>

            <div className='grid grid-cols-12 gap-[15px]'>
              <div className='col-span-8'>
                <div
                  className=' bg-white  rounded-md overflow-hidden'
                  style={{
                    boxShadow: "0 4px 8px rgba(0,0,0,.175)",
                  }}
                >
                  <div className='border-b-[2px] border-[#0980A0] px-[10px] py-[15px] bg-[#cce3e0]'>
                    <div className=' flex items-center gap-3'>
                      <h3 className='text-[#007390] font-semibold text-[20px] '>Chọn hình thức thanh toán</h3>
                      <div className=''>
                        <span className='font-bold text-[17px] text-[#007390] mr-[4px]'>
                          {flightClass === "economy"
                            ? (flightInfo.economyPrice * passengerDetails.length).toLocaleString("vi-VN")
                            : (flightInfo.businessPrice * passengerDetails.length).toLocaleString("vi-VN")}
                        </span>
                        <span className='text-[13px] text-[#007390]'>VND</span>
                      </div>
                    </div>
                    <p className='text-[13px] mt-[6px]'>Quý khách lựa chọn hình thức thanh toán dưới đây</p>
                  </div>

                  <div className='relative h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mx-[10px] my-[15px]'>
                    <input
                      type='number'
                      value={money}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setMoney(value);
                      }}
                      className='w-full h-full outline-none'
                      min='0'
                    />
                    <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                      Nhập số tiền bạn cần thanh toán
                    </div>
                  </div>

                  <div className='px-[10px] py-[15px] flex justify-end'>
                    <Link
                      href={`/booking/seat/${flight_id}?class=${flightClass}`}
                      className='mr-[10px] text-[16px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[10px] px-[25px] w-fit font-medium flex items-center justify-center'
                    >
                      <FaArrowLeftLong />
                    </Link>

                    <div
                      className='mr-[10px] text-[16px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[4px] px-[6px] w-fit font-medium flex justify-end cursor-pointer'
                      onClick={() => handlePayment()}
                    >
                      HOÀN TẤT THANH TOÁN
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-span-4'>
                <div
                  className=' bg-white rounded-md overflow-hidden'
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
                                : ((flightInfo.businessPrice - 608000) * passengerDetails.length).toLocaleString(
                                    "vi-VN"
                                  )}
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
                    </div>
                  )}

                  <div className=''>
                    <div className='flex items-center justify-between px-[10px] py-[6px] bg-[#cce3e0] cursor-pointer'>
                      <div className='flex items-center gap-2'>
                        <MdFeed className='text-[#007390]' />
                        <div className='flex items-center gap-1'>
                          <span className='text-[13px]'>Thuế, phí và các khoản thu</span>
                        </div>
                      </div>

                      <div className='flex gap-1'>
                        <span className='font-bold text-[17px] text-[#007390]'>608,000</span>
                        <span className='text-[13px] text-[#007390]'>VND</span>
                        <FaAngleDown className='ml-[8px] mt-[4px] text-[#007390]' />
                      </div>
                    </div>

                    <div className=''>
                      <div className='p-[10px] flex flex-col'>
                        <div className='flex items-center justify-between mb-[4px]'>
                          <span className='text-[13px]'>Thuế giá trị gia tăng, Việt Nam</span>

                          <div className='flex gap-1'>
                            <span className='font-bold text-[#007390]'>38,000</span>
                            <span className='text-[#007390]'>VND</span>
                          </div>
                        </div>

                        <div className='flex items-center justify-between mb-[4px]'>
                          <span className='text-[13px]'>Phí soi chiếu an ninh hành khách và hành lý, Việt Nam</span>

                          <div className='flex gap-1'>
                            <span className='font-bold text-[#007390]'>20,000</span>
                            <span className='text-[#007390]'>VND</span>
                          </div>
                        </div>

                        <div className='flex items-center justify-between mb-[4px]'>
                          <span className='text-[13px]'>Phí dịch vụ hành khách chặng nội địa, Việt Nam</span>

                          <div className='flex gap-1'>
                            <span className='font-bold text-[#007390]'>100,000</span>
                            <span className='text-[#007390]'>VND</span>
                          </div>
                        </div>

                        <div className='flex items-center justify-between'>
                          <span className='text-[13px]'>Phụ thu quản trị hệ thống</span>

                          <div className='flex gap-1'>
                            <span className='font-bold text-[#007390]'>450,000</span>
                            <span className='text-[#007390]'>VND</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='p-[10px] border-t-[3px] border-[#eee] flex justify-between items-center'>
                    <h4 className='font-bold text-[18px]'>TỔNG SỐ TIỀN</h4>

                    <div className='flex gap-1'>
                      <span className='font-bold text-[17px] text-[#007390]'>
                        {flightClass === "economy"
                          ? (flightInfo.economyPrice * passengerDetails.length).toLocaleString("vi-VN")
                          : (flightInfo.businessPrice * passengerDetails.length).toLocaleString("vi-VN")}
                      </span>
                      <span className='text-[13px] text-[#007390]'>VND</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
