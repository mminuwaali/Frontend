import React, { useContext, useState } from "react";
import jwtDecode from "jwt-decode";
import { FormInputBox } from "../../components/Forms/FormInputBox";
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
import { LoginSchema } from "../../components/Forms/schema";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const EmployersLoginForm = ({ setShowLogin, showModal }) => {
  const { setAuthTokens, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    setIsLoading(true);
    const response = await axios
      .post(`${process.env.REACT_APP_BASE_URL}employer/jwt/token/`, values)
      .catch((err) => {
        // console.log(err)
        if (err) {
          if (err.response.status === 400) {
            toast.error("Password or email incorrect");
            setIsLoading(false);
          } else if (err.response.status === 401) {
            toast.error("No active account found");
            setIsLoading(false);
          } else if(err.message === 'Network Error') {
            toast.error(err.message);
            setIsLoading(false);
          }
           else {
            toast.error("Something went wrong");
            // console.log(err)
            setIsLoading(false);
          }
        }
      });

    if (response && response.data) {
      if(user){
        localStorage.removeItem("authTokens");
        localStorage.removeItem('user')
      }
      const userType = jwtDecode(response.data.access)
     
      if (userType.is_employee === true){
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthTokens(response.data.access);
      navigate('/employer/dashboard/view-jobs');
      }
      else {
        toast.error('You are not registered as an employer')
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
      <div className="border relative bg-white p-2 py-[2rem] px-[20px] mx-[1.5rem] md:px-[42px] rounded-[30px]  lg:w-[500px]">
      <div className="flex my-4 gap-x-[0.2rem] justify-center items-center ">
          <FaSignInAlt className="text-[2rem] text-blue" />
          <div className="h-[2.5rem] w-[3px] mr-[0.5rem] ml-[0.5rem] bg-black"></div>
          <h2 className="title text-blue  text-[1.5rem] font-[800]">LOG IN</h2>
          
        </div>
        <div>
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
                        ? "bg-blue block w-full text-white font-[700] opacity-25 rounded-sm p-2"
                        : "bg-blue opacity-100 block w-full font-[700]  text-white rounded-sm p-2"
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
                  <Link className="text-blue underline" to="/employer/register">
                    {" "}
                    Sign up
                  </Link>
                </small>
              </div>

              <small>
                  <Link to="/jobseeker/login" className="text-blue underline">
                    Jobseeker Login
                  </Link>
                </small>

             
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
