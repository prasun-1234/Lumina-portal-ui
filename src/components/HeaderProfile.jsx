import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoutSvg from '../assets/LogoutSvg';

const UserProfile = ({ profilePic, userName, date, onLogout, className }) => {
   return (
      <div className={`w-full max-w-[22.25rem]  justify-between items-center py-3 px-2 rounded-full ${className} border`}>
         <div className="flex border-r sm:pr-8 pr-4 ">
            <figure className='max-w-[3rem] max-h-[3rem] w-full h-full rounded-full overflow-hidden'>
               <img src={profilePic} alt="profile pic" className='w-full h-full object-cover' />
            </figure>
            <div className="flex flex-col items-start ml-2">
               <h1 className=" text-[1rem] font-semibold text-[#374151]">Hello, {userName}</h1>
               <span className="lg:text-sm text-[.625rem] font-semibold text-gray-500">{date}</span>
            </div>
         </div>
         <Link to="#" onClick={onLogout} className='flex flex-nowrap w-28 h-12 items-center justify-between text-[#182886] ml-2'>
            <span>Log Out</span>
            <div className='w-full h-full max-w-[2.75rem] max-h-[2.75rem] bg-[#1E3A8A] rounded-full flex items-center justify-center'>
               <LogoutSvg />
            </div>
         </Link>
      </div>
   );
};

UserProfile.propTypes = {
   profilePic: PropTypes.string.isRequired,
   userName: PropTypes.string.isRequired,
   date: PropTypes.string.isRequired,
   onLogout: PropTypes.func.isRequired,
   className: PropTypes.string,
};

export default UserProfile;
