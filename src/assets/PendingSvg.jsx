import PropTypes from 'prop-types';

export default function PendingSvg({className}) {
   return (
      <>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className={`${className}`}>
            <path d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z" stroke="#9CA3AF" strokeWidth="1.5" />
            <path d="M11.992 15.5H12.001" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12.5V8.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
      </>
   )
}

PendingSvg.propTypes = {
   className: PropTypes.string,
};
