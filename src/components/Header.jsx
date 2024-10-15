import { Link } from 'react-router-dom'
import ProfilePic from '../assets/profile-image.jpg'
import LuminaSvg from '../assets/LuminaSvg'
import UserProfile from './HeaderProfile'

export default function Header() {

   return (
      <header className="w-full flex items-center justify-center lg:py-16 md:py-10 py-5 px-[1.25rem]  bg-white relative ">
         <span className='absolute w-full h-full gradient-span  border '></span>
         <nav className=' container mx-auto w-full flex justify-between items-center '>
            <Link to="/" className='flex items-center justify-center h-fit'>
               < LuminaSvg alt="header logo" className='md:w-[13rem] sm:w-[8.3125rem] w-[9rem] h-full  ' />
            </Link>
            <div className="w-full lg:max-w-[34.25rem] max-w-fit flex items-center lg:justify-between justify-end lg:gap-0 gap-5 relative">
               {/* <div className=" md:flex hidden w-full lg:max-w-[24.25rem] max-w-fit  justify-between items-center lg:py-3 lg:px-4 p-1 rounded-full  border">
                  <div className=" lg:flex hidden lg:border-r lg:pr-8 ">
                     <figure className='lg:max-w-[3rem]  lg:max-h-[3rem] w-full h-full rounded-full overflow-hidden'>
                        <img src={ProfilePic} alt="profile pic" className='w-full h-full object-cover ' />
                     </figure>
                     <div className="flex flex-col items-start ml-2 ">
                        <h1 className="lg:text-2xl text-[1rem] font-semibold text-[#374151]">Hello, John</h1>
                        <span className=" lg:text-sm text-[.625rem] font-semibold text-gray-500">23 Sept, 2024</span>
                     </div>
                  </div>
                  <Link to="#" type='button' className='lg:flex hidden flex-nowrap w-28 h-12 items-center justify-between text-[#182886]' >
                     <span>Log Out</span>
                     <div className='w-full  h-full max-w-[2.75rem] max-h-[2.75rem] bg-[#1E3A8A] rounded-full flex items-center justify-center  '>
                        <LogoutSvg />
                     </div>
                  </Link>
               </div> */}
               <button className=' flex items-center text-center text-white lg:py-5 lg:px-6  p-[.625rem] lg:text-[16px] text-[14px] bg-[#6562ED] md:h-[3.125rem] h-[2.75rem]  rounded-md '>Schedule  Scan</button>
               <UserProfile
                  className="lg:flex hidden h-[4rem] "
                  profilePic={ProfilePic}
                  userName="John"
                  date="23 Sept, 2024"
               />
            </div>
         </nav>
      </header>
   )
}
