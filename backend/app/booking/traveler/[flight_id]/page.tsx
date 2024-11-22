"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeftLong } from "react-icons/fa6";
import FindTicketModal from "../../../../components/FindTicketModal";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useUser } from "../../../../contexts/UserContext";
import BookingHeader from "../../../../components/Header/BookingHeader";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FlightInfo, User } from "../../../../util/interface";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const flight_id = params!.flight_id;
  const flightClass = searchParams!.get("class");
  const { user } = useUser() as { user: User };

  const [findFlights, setFindFlights] = useState(false);
  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);
  const [passengerDetails, setPassengerDetails] = useState(() => {
    if (typeof window !== "undefined") {
      const storedInfo = localStorage.getItem("passengerDetails");
      return storedInfo ? JSON.parse(storedInfo) : [];
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchFlightInfo = async () => {
    try {
      const res = await axios.get(`/api/flight/info/${flight_id}`);

      if (res.status === 200) {
        setFlightInfo(res.data);
      }
    } catch (error) {
      console.error("Error fetching flight info:", error);
    }
  };

  useEffect(() => {
    fetchFlightInfo();
  }, [flight_id]);

  useEffect(() => {
    if (flightInfo) {
      setIsLoading(true);
    }
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    console.log(`Payment Updated flightInfo at ${time}:`, flightInfo);
  }, [flightInfo]);

  useEffect(() => {
    if (user && (!Array.isArray(passengerDetails) || passengerDetails.length === 0)) {
      const newPassenger = {
        passengerId: `${user.userId}-0`,
      };
      setPassengerDetails([newPassenger]);
    }
  }, [user, passengerDetails]);

  useEffect(() => {
    if (passengerDetails && Array.isArray(passengerDetails)) {
      localStorage.setItem("passengerDetails", JSON.stringify(passengerDetails));
    }
  }, [passengerDetails]);

  // Function to add a new passenger information object
  const addPassenger = () => {
    const newPassenger = {
      passengerId: `${user.userId}-${passengerDetails.length}`,
    };
    setPassengerDetails([...passengerDetails, newPassenger]);
  };

  // Function to remove a passenger by index
  const removePassenger = (index) => {
    const updatedInfo = passengerDetails.filter((_, i) => i !== index);
    setPassengerDetails(updatedInfo);
  };

  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedInfo = [...passengerDetails];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setPassengerDetails(updatedInfo);
  };

  // Function to check if a passenger's information is complete
  const isPassengerValid = (info) => {
    // Kiểm tra tất cả các trường bắt buộc và email hợp lệ
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return (
      info.title && info.firstName && info.lastName && info.birthDate && emailRegex.test(info.email) && info.phoneNumber
    );
  };

  // Function to check if all passengers have valid information
  const isFormValid = () => {
    return passengerDetails.length > 0 && passengerDetails.every(isPassengerValid);
  };

  const handleConfirmClick = (e) => {
    if (!isFormValid()) {
      e.preventDefault();
      toast.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  return (
    <>
      {!isLoading || !flightInfo ? (
        <div className='h-screen w-full flex items-center justify-center'>
          <Spinner animation='border' />
        </div>
      ) : (
        <>
          <BookingHeader
            step={2}
            departure={flightInfo.departure.airportCode}
            arrival={flightInfo.arrival.airportCode}
            amountPassenger={null}
          />

          <div>
            <div className={`relative h-full  ${findFlights && "!pt-[20px] !pb-[35px]"}`}>
              <div
                className={`w-[75%] mx-auto rounded-b-[4px] px-[20px] py-[10px] bg-[#fbf9f2] ${
                  !findFlights && "hidden"
                }`}
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

            {/* <div className='w-[75%] my-[20px] mx-auto'>
              <div className='text-[12px] pt-[20px]'>
                <p>Lưu ý: * Trường bắt buộc nhập thông tin</p>
                <p>
                  Quý Khách vui lòng sử dụng tiếng Việt không dấu và không sử dụng các ký tự đặc biệt, nhập đầy đủ tên
                  hành khách và những thông tin khác xuất hiện trên (các) giấy tờ tùy thân do chính phủ cấp.
                </p>
                <p>Nếu Tên đầy đủ của Quý khách lớn hơn 41 ký tự, vui lòng viết tắt tên đệm.</p>
                <p>Nếu Tên đầy đủ của Quý khách lớn hơn 41 ký tự, vui lòng viết tắt tên đệm.</p>
                <p>Đệm và tên: V T T K N A DUONG MAI</p>
                <p>Họ: NGUYEN</p>
              </div>
            </div> */}

            <div className='w-[75%] my-[20px] mx-auto'>
              {passengerDetails &&
                passengerDetails.map((info, index) => (
                  <div
                    key={index}
                    className='relative rounded-[15px] overflow-hidden mb-[20px]'
                    style={{ boxShadow: "rgba(0, 0, 0, 0.176) 0px 0px 5px" }}
                  >
                    <div className='flex flex-col items-center py-[20px] px-[80px] bg-[#fff]'>
                      <h2 className='text-[20px] font-bold text-[#00559e] mb-[30px]'>Thông tin liên lạc</h2>

                      {/* Input fields for passenger information */}
                      <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] mb-[25px]'>
                        <select
                          value={info.title || ""}
                          onChange={(e) => handleInputChange(index, "title", e.target.value)}
                          className='w-full h-full outline-none border-none px-[12px] py-[6px]'
                        >
                          <option value=''>Chọn danh xưng</option>
                          <option value='Ông'>Ông</option>
                          <option value='Bà'>Bà</option>
                          <option value='Cô/chị'>Cô/chị</option>
                        </select>
                        <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                          Danh xưng *
                        </div>
                      </div>

                      <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
                        <input
                          type='text'
                          value={info.firstName || ""}
                          onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
                          className='w-full h-full outline-none'
                        />
                        <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                          Tên đệm và tên (như trong CCCD/hộ chiếu) *
                        </div>
                      </div>

                      <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
                        <input
                          type='text'
                          value={info.lastName || ""}
                          onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
                          className='w-full h-full outline-none'
                        />
                        <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                          Họ (như trong CCCD/hộ chiếu) *
                        </div>
                      </div>

                      <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
                        <input
                          type='date'
                          value={info.birthDate || ""}
                          onChange={(e) => handleInputChange(index, "birthDate", e.target.value)}
                          className='w-full h-full outline-none'
                        />
                        <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                          Ngày sinh *
                        </div>
                      </div>

                      <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] px-[12px] py-[6px] mb-[25px]'>
                        <input
                          type='email'
                          value={info.email || ""}
                          onChange={(e) => handleInputChange(index, "email", e.target.value)}
                          className='w-full h-full outline-none'
                        />
                        <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                          Địa chỉ email bắt buộc *
                        </div>
                      </div>

                      <div className='relative w-full h-[48px] border-[2px] border-[#d0d5dd] hover:border-[#00559e] rounded-[4px] mb-[25px] col-span-7 px-[12px] py-[6px]'>
                        <input
                          type='text'
                          value={info.phoneNumber || ""}
                          onChange={(e) => handleInputChange(index, "phoneNumber", e.target.value)}
                          className='w-full h-full outline-none'
                        />
                        <div className='absolute top-[-10px] left-[6px] bg-[#fff] px-[4px] text-[12px]'>
                          Điện thoại di động *
                        </div>
                      </div>

                      {/* Remove Passenger Button */}
                      {passengerDetails.length > 1 && index > 0 && (
                        <button
                          type='button'
                          onClick={() => removePassenger(index)}
                          className='absolute top-[10px] right-[20px] bg-red-500 text-white rounded-full py-[5px] px-[10px] flex items-center justify-center'
                        >
                          <FaTrashAlt className='mr-2' />
                          Xóa hành khách
                        </button>
                      )}
                    </div>
                  </div>
                ))}

              {/* Add Passenger Button */}
              <button onClick={addPassenger} className='mt-3 px-4 py-2 bg-[#00559e] text-white rounded'>
                Thêm hành khách
              </button>
            </div>

            <div className='w-[75%] my-[20px] mx-auto flex justify-end'>
              <Link
                href={`/booking/summary/${flight_id}?class=${flightClass}`}
                className='mr-[10px] text-[18px] text-[#222222] hover:text-[#e6b441] bg-[#e6b441] hover:bg-[#fff] rounded-[10px] border-[3px] border-[#e6b441] py-[10px] px-[25px] w-fit font-medium flex items-center justify-center'
              >
                <FaArrowLeftLong />
              </Link>

              <Link
                href={`/booking/seat/${flight_id}?class=${flightClass}`}
                onClick={handleConfirmClick}
                className={`text-[18px] text-[#005f6e] hover:text-[#fff] hover:bg-[#005f6e] rounded-[10px] border-[3px] border-[#005f6e] py-[10px] px-[15px] w-fit font-medium ${
                  !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                XÁC NHẬN
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
