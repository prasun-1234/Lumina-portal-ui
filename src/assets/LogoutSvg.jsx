import PropTypes from 'prop-types';

function LogoutSvg({ className }) {
   return (
      <>
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none" className={`${className}`}>
            <path d="M5.02331 4.5C2.59826 6.11238 1 8.86954 1 12C1 16.9706 5.02944 21 10 21C14.9706 21 19 16.9706 19 12C19 8.86954 17.4017 6.11238 14.9767 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 1V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
      </>
   )
}

LogoutSvg.propTypes = {
   className: PropTypes.string,
};

export default LogoutSvg