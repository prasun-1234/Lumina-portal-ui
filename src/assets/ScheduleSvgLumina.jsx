import PropTypes from 'prop-types';

export default function ScheduleSvgLumina({className}) {
   return (
      <>
         <svg xmlns="http://www.w3.org/2000/svg" width="21" height="23" viewBox="0 0 21 23" fill="none" className={`${className}`} >
            <path d="M16.5 1V3M4.5 1V3" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 12.2432C1 7.88594 1 5.70728 2.25212 4.35364C3.50424 3 5.51949 3 9.55 3H11.45C15.4805 3 17.4958 3 18.7479 4.35364C20 5.70728 20 7.88594 20 12.2432V12.7568C20 17.1141 20 19.2927 18.7479 20.6464C17.4958 22 15.4805 22 11.45 22H9.55C5.51949 22 3.50424 22 2.25212 20.6464C1 19.2927 1 17.1141 1 12.7568V12.2432Z" stroke="url(#paint0_linear_144_91)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.5 8H19.5" stroke="url(#paint1_linear_144_91)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.5 12.55H14.5M6.5 12.55H6.50898M11.5 16.75H6.5M14.5 16.75H14.491" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
               <linearGradient id="paint0_linear_144_91" x1="-10.5" y1="1" x2="13.5" y2="9.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E3A8A" stopOpacity="0" />
                  <stop offset="1" stopColor="#1E3A8A" />
                  <stop offset="1" stopColor="#1E3A8A" stopOpacity="0.426708" />
               </linearGradient>
               <linearGradient id="paint1_linear_144_91" x1="14.5" y1="9" x2="6.5" y2="2" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E3A8A" />
                  <stop offset="1" stopColor="#1E3A8A" stopOpacity="0" />
               </linearGradient>
            </defs>
         </svg>
      </>
   )
}

ScheduleSvgLumina.propTypes = {
   className: PropTypes.string,
};
