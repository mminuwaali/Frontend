

import React, {useContext, useState } from "react";
import { FormInputBox } from "./FormInputBox";
import {
  FaSignInAlt,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import { useFormik, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import google from "../../assets/google.png";
import linkedin from "../../assets/linkedin.png";
import { LoginSchema } from "./schema";
import jwtDecode from "jwt-decode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// 
export const LoginForm = ({ setShowLogin, showModal }) => {
  const { setAuthTokens, employerUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    setIsLoading(true);
    const response = await axios
      .post(`${process.env.REACT_APP_BASE_URL}jobseeker/jwt/token/`, values)
      .catch((err) => {
        if (err) {
          //   console.log(err)
          if (err.response.status === 400) {
            toast.error("Password or email incorrect");
            setIsLoading(false);
          } else if (err.response.status === 401) {
            toast.error("No active account found");
            setIsLoading(false);
          } else {
            toast.error("Something went wrong");
            setIsLoading(false);
          }
        }
        // console.log(err)
      });

      if (response && response.data) {
        // console.log(response.data)
        if(employerUser){
          localStorage.removeItem("authTokens", JSON.stringify(response.data));
          localStorage.removeItem('employer_user');
        }
        
        const userType = jwtDecode(response.data.access)
        // console.log(userType)
        if (userType.is_jobseeker === true){
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        navigate('/dashboard/find-jobs');
        setAuthTokens(response.data.access);

        }
        else {
          toast.error('You are not registered as a job seeker')
        }
        setIsLoading(false);
      }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: LoginSchema,
  });

  return (
    <section>
      <ToastContainer />
      <div className="border relative bg-white p-2 py-[2rem] px-[20px] mx-[1.5rem] md:px-[42px]  rounded-[30px]  lg:w-[500px]">
        <div className="flex my-4 gap-x-[0.2rem] justify-center items-center ">
          <FaSignInAlt className="text-[2rem] text-blue" />
          <div className="h-[2.5rem] w-[3px] mr-[0.5rem] ml-[0.5rem] bg-black"></div>
          <h2 className="title text-blue  text-[1.5rem] font-[800]">LOG IN</h2>
          {showModal ? (
            <FaTimes
              onClick={() => setShowLogin(false)}
              className="text-blue z-[99999] text-[1.3rem] absolute top-[1rem] right-[1rem]  cursor-pointer"
            />
          ) : null}
        </div>

        <Formik>
          {() => (
            <Form onSubmit={formik.handleSubmit}>
              <FormInputBox
                type="text"
                name="email"
                id="email"
                className="border p-2.5 block w-full  border-solid border-[#808080] rounded-lg outline-none"
                icon={<FaEnvelope />}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                placeholder="Email Address"
              />
              {formik.touched.email && formik.errors.email ? (
                <small className="text-red-600">{formik.errors.email}</small>
              ) : null}

              <FormInputBox
                type="password"
                name="password"
                id="password"
                className="border p-2.5 mt-[1.6rem] block w-full  border-solid border-[#808080] rounded-lg outline-none"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder="Password"
              />

              {formik.touched.password && formik.errors.password ? (
                <small className="text-red-600">{formik.errors.password}</small>
              ) : null}

              <div className="mt-[1.6rem]">
                {!isLoading && (
                  <button
                    disabled={!formik.isValid}
                    className={
                      !formik.isValid
                        ? "bg-blue block w-full text-white opacity-25 font-[700] rounded-[6px] p-2"
                        : "bg-blue opacity-100 block w-full text-white  font-[700] rounded-[6px] p-2"
                    }
                    type="submit"
                  >
                    LOGIN
                  </button>
                )}
                {isLoading && (
                  <div className="flex justify-center">
                    <ThreeDots
                      type="ThreeDots"
                      width={100}
                      height={20}
                      color="blue"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-row justify-between mt-[1rem] mb-[1.2rem] ">
                <small>
                  <Link to="/forgot-password" className="text-blue underline">
                    Forgot Password?
                  </Link>
                </small>
                <small>
                  Don't have an account?
                  <Link className="text-blue underline" to="/jobseeker/register">
                    {" "}
                    Sign up
                  </Link>
                </small>
              </div>

              <small>
                  <Link to="/employer/login" className="text-blue underline">
                    Employer Login
                  </Link>
                </small>

              {/* <div className="flex justify-between gap-x-5 items-baseline">
                <hr className="bg-blue border-[0.1px] w-[35%] " />
                <span>OR</span>
                <hr className="bg-blue border-[0.1px]  w-[35%]" />
              </div>

              <div className="mt-4 flex justify-center flex-row gap-x-[1rem]">
                <img
                  className="border rounded-full p-[0.3rem]  border-[#808080]"
                  src={google}
                  alt=""
                />
                <img
                  className="border p-[0.4rem] rounded-full ml-[1rem] border-[#808080]"
                  src={linkedin}
                  alt=""
                />
              </div> */}

              
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
