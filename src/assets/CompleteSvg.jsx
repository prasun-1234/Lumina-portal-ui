import PropTypes from 'prop-types';
export default function CompleteSvg({ className }) {
   return (
      <>
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" className={`${className}`} >
            <path fillRule="evenodd" clipRule="evenodd" d="M17.6476 6.0088C18.2803 6.64791 18.2803 7.68412 17.6476 8.32323L12.8637 13.1558C11.4916 14.5418 9.26868 14.5475 7.88965 13.1685L6.15159 11.4305C5.5157 10.7946 5.51051 9.75842 6.13999 9.11608C6.76946 8.47374 7.79524 8.46849 8.43113 9.10436L10.1692 10.8424C10.281 10.9542 10.4612 10.9537 10.5725 10.8413L15.3565 6.0088C15.9892 5.36969 17.0149 5.36969 17.6476 6.0088Z" fill="#13BF39" />
            <path d="M19.9999 10.4999C19.9999 16.0228 15.5228 20.4999 9.99994 20.4999C4.47712 20.4999 0 16.0228 0 10.4999C0 4.97712 4.47712 0.5 9.99994 0.5C15.5228 0.5 19.9999 4.97712 19.9999 10.4999ZM2.99025 10.4999C2.99025 14.3713 6.12859 17.5096 9.99994 17.5096C13.8713 17.5096 17.0096 14.3713 17.0096 10.4999C17.0096 6.62859 13.8713 3.49025 9.99994 3.49025C6.12859 3.49025 2.99025 6.62859 2.99025 10.4999Z" fill="url(#paint0_angular_144_84)" />
            <circle cx="10.0998" cy="19" r="1.49999" fill="#13BF39" />
            <defs>
               <radialGradient id="paint0_angular_144_84" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.99994 10.4999) rotate(90) scale(9.99994)">
                  <stop stopColor="#13BF39" />
                  <stop offset="0.078125" stopColor="#13BF39" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
               </radialGradient>
            </defs>
         </svg>
      </>
   )
}

CompleteSvg.propTypes = {
   className: PropTypes.string, 
};