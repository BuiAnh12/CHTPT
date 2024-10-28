import React from "react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { styles } from "../../styles/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../util/firebase";
import { useUser } from "../../contexts/UserContext";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

type Props = {};

const Login = ({ setOpenLogin, setOpenSignUp }) => {
  const [show, setShow] = useState(false);
  const [loginStage, setLoginStage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(loginStage);

  const { setUser } = useUser();

  useEffect(() => {
    setIsLoggedIn(loginStage);
  }, [loginStage]);

  const handleLogin = async ({ email, password }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        console.log(result);
        setUser(result);
        localStorage.setItem("user_id", result.user.uid); // save cached user
        toast.success("Đăng nhập thành công");
        setOpenLogin(false);
      }
      console.log(result);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      handleLogin({ email, password });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className='w-full'>
      <h1 className={styles.title}>Đăng Nhập</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor='email'>
          Email
        </label>
        <input
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          id='email'
          placeholder=''
          className={`${errors.email && touched.email ? "border-red-500" : ""} ${styles.input}`}
        />
        {errors.email && touched.email && <span className='text-red-500 pt-2 block'>{errors.email}</span>}
        <div className='w-full mt-5 relative mb-1'>
          <label className={styles.label} htmlFor='password'>
            Mật khẩu
          </label>
          <input
            type={!show ? "password" : "text"}
            name='password'
            value={values.password}
            onChange={handleChange}
            id='password'
            placeholder=''
            className={`${errors.password && touched.password ? "border-red-500" : ""} ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className='absolute bottom-3 right-2 z-10 cursor-pointer text-black'
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className='absolute bottom-3 right-2 z-10 cursor-pointer text-black'
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && <span className='text-red-500 pt-2 block'>{errors.password}</span>}
        </div>
        <div className='w-full mt-5'>
          <input type='submit' value='Đăng nhập' className={`${styles.button} hover:bg-[#0077b9] text-white`} />
        </div>

        {/* <div className='relative py-3 mt-3'>
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
        <h5 className='text-center pt-4 font-Poppins text-[14px] text-black'>
          Chưa có tài khoản?
          <span
            className='text-[#007390] pl-1 cursor-pointer'
            onClick={() => {
              setOpenLogin(false);
              setOpenSignUp(true);
            }}
          >
            Đăng Ký
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

export default Login;
