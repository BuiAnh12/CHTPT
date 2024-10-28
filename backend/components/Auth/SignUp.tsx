import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../../styles/styles";
import { IoClose } from "react-icons/io5";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string().email("Invalid email").required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

type Props = {};

const SignUp = ({ setOpenLogin, setOpenSignUp }) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      console.log(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className='w-full'>
      <h1 className={`${styles.title}`}>Đăng ký</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className={`${styles.label}`} htmlFor='name'>
            Tên
          </label>
          <input
            type='name'
            name='name'
            value={values.name}
            onChange={handleChange}
            id='name'
            placeholder=''
            className={`${errors.name && touched.name && "border-red-500"}
              ${styles.input}
              `}
          />
          {errors.name && touched.name && <span className='text-red-500 pt-2 block'>{errors.name}</span>}
        </div>

        <label className={`${styles.label}`} htmlFor='email'>
          Email
        </label>
        <input
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          id='email'
          placeholder=''
          className={`${errors.email && touched.email && "border-red-500"}
          ${styles.input}
          `}
        />
        {errors.email && touched.email && <span className='text-red-500 pt-2 block'>{errors.email}</span>}

        <div className='w-full relative mb-1'>
          <label className={`${styles.label}`} htmlFor='password'>
            Mật khẩu
          </label>
          <input
            type={!show ? "password" : "text"}
            name='password'
            value={values.password}
            onChange={handleChange}
            id='password'
            placeholder=''
            className={`${errors.email && touched.email && "border-red-500"}
          ${styles.input}
          `}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className='absolute bottom-3 right-2 z-1 cursor-pointer'
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className='absolute bottom-3 right-2 z-1 cursor-pointer'
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && <span className='text-red-500 pt-2 block'>{errors.password}</span>}
        <div className='w-full mt-5'>
          <input type='submit' value='Đăng ký' className={`${styles.button} hover:bg-[#0077b9] text-white`} />
        </div>

        {/* <br />
        <div className='relative py-3'>
          <h5 className='absolute top-[0px] left-[35%] text-center bg-[#f8f8f8] font-Poppins text-[14px] text-black'>
            Hoặc đăng nhập bằng
          </h5>
          <div className='w-full h-[1px] bg-[#ccc]'></div>
        </div>

        <div className='flex items-center justify-center my-3'>
          <div className={`${styles.button} text-white cursor-pointer mr-2 bg-slate-200`}>
            <FcGoogle size={30} />
            <span className='text-black ml-2'>Đăng nhập bằng Google</span>
          </div>
        </div> */}

        <h5 className='text-center pt-4 font-Poppins text-[14px]'>
          Đã có tài khoản?
          <span
            className='text-[#007390] pl-1 cursor-pointer'
            onClick={() => {
              setOpenLogin(true);
              setOpenSignUp(false);
            }}
          >
            Đăng nhập
          </span>
        </h5>
      </form>

      <div className='absolute top-[-15px] right-[-15px] w-[35px] h-[35px] rounded-full bg-[#e0e0e0] hover:bg-[#d3d3d3] text-[#636363] flex items-center justify-center cursor-pointer'>
        <IoClose
          className='text-[25px]'
          onClick={() => {
            setOpenLogin(false);
            setOpenSignUp(false);
          }}
        />
      </div>
    </div>
  );
};

export default SignUp;
