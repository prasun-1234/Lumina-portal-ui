import LuminaHalf from '../assets/LuminaHalf'
import UserProfile from './HeaderProfile'
import ProfilePic from '../assets/profile-image.jpg'
import PropTypes from 'prop-types';

function Footer({ className, userProfile }) {
   return (
      <div className={`footer-div container mx-auto w-full flex flex-col items-center justify-between  ${className} `}>
         {userProfile ?
            <UserProfile
               className=" lg:hidden flex mb-8 "
               profilePic={ProfilePic}
               userName="John"
               date="23 Sept, 2024"
            /> : null
         }
         <div className="w-full flex items-center justify-between md:flex-row flex-col ">
            <p className='text-[#737373]'>© 2024  LuminaMD. All rights reserved | Powered by  Quadrant Technology</p>
            <LuminaHalf className=" md:mt-0 mt-5 " />
         </div>
      </div>
   )
}

Footer.propTypes = {
   userProfile: PropTypes.oneOfType([
      PropTypes.bool,  // Allow userProfile to be a boolean
      PropTypes.shape({
         profilePic: PropTypes.string.isRequired, // Validate profilePic as a required string
         userName: PropTypes.string.isRequired,    // Validate userName as a required string
         date: PropTypes.string.isRequired,         // Validate date as a required string
      }),
   ]).isRequired, // Add validation for the onFormSubmit prop
   className: PropTypes.string, // If className is also used
};

export default Footer