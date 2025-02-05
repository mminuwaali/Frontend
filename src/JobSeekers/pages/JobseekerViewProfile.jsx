/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from 'react';
import Moment from "moment";
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import marker from '../../assets/Marker.png';
import { Footer } from '../../components/Footer';
import photo from '../../assets/asideprofile.svg';
import AuthContext from '../../context/AuthContext';
import { JobseekerNavbar as Navbar } from '../components/JobseekerNavbar';


export const Profile = () => {
    // hooks
    const { user } = React.useContext(AuthContext);

    // methods
    const downloadCertificate = (ev) => {
        ev.preventDefault();

        let [url, ext] = [ev.currentTarget.href, ev.currentTarget.href.slice(ev.currentTarget.href.lastIndexOf('.'))];
        axios.get(url, { responseType: 'blob' }).then(res => {
            let blob = new Blob([res.data]);
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `document${ext}`;
            link.click();
            window.URL.revokeObjectURL(link.href);
            link = undefined;
        }).catch(console.error);
    };

    return <>
        <Navbar user={user} />
        <section className='flex felx-wrap w-screen items-start gap-4 mb-8'>
            <div className="flex flex-col gap-8 justify-start min-w-[60%] grow-[1] p-4">
                <div className="flex flex-col item-start gap-2">
                    <h3 className='capitalize font-bold text-3xl'>welcome, {user?.user?.first_name}</h3>
                    <div className="flex items-center justify-start px-4 gap-4">
                        <img src={user?.avatar} alt='profile pic' className="w-14" />
                        <div className="flex grow-[1] flex-col items-start">
                            <h4 className='font-bold text-xl'>{user?.user?.first_name} {user?.user?.last_name}</h4>
                            <span className="flex gap-2">
                                <img src={marker} alt="" className='w-4' />
                                <h5 className="capitalize">{user?.city || "..."}, <span className="">{user?.state || "..."}</span></h5>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="max-w-[52em] flex flex-col w-full rounded-lg border-gray-400 border p-4 gap-4">
                    <header className="w-full flex items-center justify-between">
                        <h3 className="capitalize font-bold text-md">personal information</h3>
                        <Link to='/dashboard/profile/edit?tab=0'><AiFillEdit className='w-8' /></Link>
                    </header>
                    <div className="grow-1 w-full flex flex-wrap justify-center p-[o] gap-2">
                        <div className="flex flex-col grow basis-52">
                            <label htmlFor="first_name" className="font-thinbold capitalize text-grey" children='first name' />
                            <span className="mx-1 shrink grow">
                                <input name="first_name" type="text" disabled className='rounded-md text-sm p-2 w-full border border-grey' value={user?.user?.first_name} />
                            </span>
                        </div>
                        <div className="flex flex-col grow basis-52">
                            <label htmlFor="middle_name" className="font-thinbold capitalize text-grey" children='middle name' />
                            <span className="mx-1 shrink grow">
                                <input name="middle_name" type="text" disabled className='rounded-md text-sm p-2 w-full border border-grey' value={user?.middle_name} />
                            </span>
                        </div>
                        <div className="flex flex-col grow basis-52">
                            <label htmlFor="last_name" className="font-thinbold capitalize text-grey" children='last name' />
                            <span className="mx-1 shrink grow">
                                <input name="last_name" type="text" disabled className='rounded-md text-sm p-2 w-full border border-grey' value={user?.user?.last_name} />
                            </span>
                        </div>
                        <div className="flex flex-col grow basis-52">
                            <label htmlFor="gender" className="font-thinbold capitalize text-grey" children='gender' />
                            <span className="mx-1 shrink grow">
                                <input name="gender" type="text" disabled className='rounded-md text-sm p-2 w-full border border-grey' value={user?.gender} />
                            </span>
                        </div>
                        <div className="flex flex-col grow basis-52">
                            <label htmlFor="phone_number" className="font-thinbold capitalize text-grey" children='phone number' />
                            <span className="mx-1 shrink grow">
                                <input name="phone_number" type="text" disabled className='rounded-md text-sm p-2 w-full border border-grey' value={user?.phone_number} />
                            </span>
                        </div>
                        <div className="flex flex-col grow basis-52">
                            <label htmlFor="email" className="font-thinbold capitalize text-grey" children='email address' />
                            <span className="mx-1 shrink grow">
                                <input name="email" type="text" disabled className='rounded-md text-sm p-2 w-full border border-grey' value={user?.user?.email} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full max-w-[52em] rounded-lg border-gray-400 border p-4">
                    <header className="w-full flex items-center justify-between">
                        <h3 className="capitalize font-bold text-md">professional information</h3>
                        <Link to='/dashboard/profile/edit?tab=1'><AiFillEdit className='w-8' /></Link>
                    </header>
                    {user?.professional_info?.map(item => (
                        <div key={item?.id} className="grow-1 w-full flex flex-col items-start my-2">
                            <h3 className="font-thin text-sm leading-[1em]">{item?.degree}</h3>
                            <span className="font-thin text-sm leading-[1em]">{item?.school_name}</span>
                            <span className="font-thin text-sm leading-[1em]">{Moment(item?.start_of_education).format("MMM DD YYYY")} - {Moment(item?.end_of_education).format("MMM DD YYYY")}</span>
                            <span className="font-thin text-sm leading-[1em]">{item?.grade}</span>
                            <p className="leading-[1em] text-md">
                                {item?.study_summary}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col w-full max-w-[52em] rounded-lg border-gray-400 border p-4">
                    <header className="w-full flex items-center justify-between">
                        <h3 className="capitalize font-bold text-md">credentials</h3>
                        <Link to='/dashboard/profile/edit?tab=2'><AiFillEdit className='w-8' /></Link>
                    </header>
                    <div className="grow-1 w-full flex flex-col gap-4">
                        <div className="flex w-full gap-4 px-4">
                            <div className="w-12 h-14 flex-none bg-gray-400"></div>
                            <div className="flex flex-col items-start justify-center">
                                <a className="text-blue underline" href={user?.cv?.file}>
                                    {user?.cv?.name}
                                </a>
                                {/* <span className="capitalize leading-[1em] text-sm">added 7/4/2022</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full max-w-[52em] rounded-lg border-gray-400 border p-4">
                    <header className="w-full flex items-center justify-between">
                        <h3 className="capitalize font-bold text-md">contact information</h3>
                        <Link to='/dashboard/profile/edit?tab=3'><AiFillEdit className='w-8' /></Link>
                    </header>
                    <div className="grow-1 w-full flex flex-wrap justify-center p-[o] gap-2">
                        <span className="flex-none w-full capitalize text-sm">next of kin details</span>
                        <div className="flex flex-col grow basis-52">
                            <label htmlFor="first_name" className="font-thinbold capitalize text-grey" children='first name' />
                            <span className="mx-1 shrink grow">
                                <input name="first_name" type="text" disabled className='rounded-md text-sm p-2 w-full border border-grey' value={user?.contact_info?.next_kin_fname} />
                            </span>
                        </div>
                        <div className="flex flex-col grow basis-52">
                            <label htmlFor="last_name" className="font-thinbold capitalize text-grey" children='last name' />
                            <span className="mx-1 shrink grow">
                                <input name="last_name" type="text" disabled className='rounded-md text-sm p-2 w-full border border-grey' value={user?.contact_info?.next_kin_lname} />
                            </span>
                        </div>
                        <div className="flex flex-col grow basis-52">
                            <label htmlFor="phone_number" className="font-thinbold capitalize text-grey" children='phone number' />
                            <span className="mx-1 shrink grow">
                                <input name="phone_number" type="nutextmber" disabled className='rounded-md text-sm p-2 w-full border border-grey' value={user?.contact_info?.next_kin_phone} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full max-w-[52em] rounded-lg border-gray-400 border p-4">
                    <header className="w-full flex items-center justify-between">
                        <h3 className="capitalize font-bold text-md">cv document</h3>
                        {/* <Link to='/dashboard/profile/edit?tab=3'><AiFillEdit className='w-8' /></Link> */}
                    </header>
                    <div className="grow-1 w-full flex flex-wrap justify-center p-[o] gap-2">
                        <div className="flex flex-col mr-auto gap-2">
                            <label htmlFor="first_name" className="font-thinbold capitalize text-grey" children='cv' />
                            <span className="mx-1 shrink">
                                {user?.professional_cert?.certificate ?
                                    <a onClick={downloadCertificate} href={user?.professional_cert?.certificate} className='bg-blue px-6 py-2 text-white uppercase text-sm rounded' dis>download</a> :
                                    <Link to="/dashboard/cv" className='bg-blue px-6 py-2 text-white uppercase text-sm rounded'>get a professional cv</Link>
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex flex-col justify-start w-[40%]">
                <img src={photo} alt="" className="w-full object-cover" />
            </div>
        </section>
        <Footer />
    </>;
};
