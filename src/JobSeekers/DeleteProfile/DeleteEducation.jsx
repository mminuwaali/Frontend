import React, { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/AxiosInstance";

export const DeleteEducation = ({ setShowDelete, credentials, item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {updateUser, getUserMeHandler } = useContext(AuthContext);
  const handleDelete = async () => {
    setIsLoading(true);
    const response = await api
      .delete(`/jobseeker/user-profile/me/professional_info/${item.id}`)
      .catch((err) => {
        console.log(err);
        toast.error("An error occured. Try again or refresh.");
        setIsLoading(false);
      });

    if (response) {
      setIsLoading(false);
      getUserMeHandler()
      setShowDelete(false);
      console.log(response);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-3 max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-1  rounded-t">
              {/*body*/}
              <div className="relative p-[1rem] md:p-[2rem] flex-auto">
                <div className="w-full max-w-xl grid  mt-[1rem]">
                  {/* <label className='text-xl mb-3 font-[700]'>Edit Bio</label> */}
                  <h3 className="text-xl font-semibold">
                    Are you sure you want to delete?
                  </h3>

                  <div className="flex items-center justify-end mb-[1rem]">
                    <div className="mt-[1.6rem] grid grid-cols-2 gap-6">
                      <div>
                        <button
                          onClick={() => setShowDelete(false)}
                          className="bg-blue  opacity-100 block w-full px-6 text-white rounded-md p-2"
                          type="submit"
                        >
                          Cancel
                        </button>
                      </div>
                      {!isLoading && (
                        <button
                          onClick={handleDelete}
                          className=" bg-red-600  opacity-100 block w-full px-6 text-white rounded-md p-2"
                          type="submit"
                        >
                          Delete
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
                  </div>
                </div>
              </div>{" "}
              {/*footer*/}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40  bg-black"></div>
    </>
  );
};
