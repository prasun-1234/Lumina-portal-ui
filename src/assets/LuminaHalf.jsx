import PropTypes from 'prop-types';

export default function LuminaHalf({className}) {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="43" viewBox="0 0 48 43" fill="none" className={className}>
         <mask id="mask0_42_857" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="43">
            <path d="M47.5316 0.5H0.171143V42.5H47.5316V0.5Z" fill="white" />
         </mask>
         <g mask="url(#mask0_42_857)">
            <path d="M26.812 17.2044C25.3013 18.1195 23.8853 19.1766 22.5797 20.3521C21.4437 11.8716 14.2531 5.31599 5.57932 5.31599C5.36238 5.31599 5.14544 5.31599 4.9285 5.32783V30.2486C4.9285 34.3389 8.21418 37.6719 12.2414 37.6719H13.5707C13.4247 38.8237 13.3537 40.0031 13.3537 41.1943C13.3537 41.6282 13.3616 42.062 13.3814 42.488H12.2375C9.54345 42.488 7.05453 41.5887 5.04683 40.0662C2.08853 37.8415 0.167603 34.2679 0.167603 30.2446V0.499878H4.92455V0.507767C5.13755 0.499878 5.35844 0.499878 5.57538 0.499878C15.7874 0.499878 24.3862 7.61164 26.8081 17.2044H26.812Z" fill="#5652A2" />
            <path d="M47.531 22.0874V4.06543H42.774V4.07332C42.561 4.06543 42.3441 4.06543 42.1271 4.06543C36.321 4.13248 30.8461 6.68846 26.5191 10.6999C27.4895 12.0528 28.3414 13.4926 29.0633 15.0111C32.2109 11.2679 36.9008 8.88155 42.1311 8.88155C42.3441 8.88155 42.565 8.88549 42.778 8.89338V16.5258C42.7227 16.5258 42.6636 16.5219 42.6083 16.5179C42.4387 16.51 42.2691 16.5021 42.0995 16.5021C38.2656 16.5021 34.6407 17.3857 31.3984 18.9674C23.0678 23.0262 17.2971 31.6644 17.2971 41.6398C17.2971 41.9277 17.3011 42.2117 17.3129 42.4997H22.0738C22.062 42.2157 22.0541 41.9277 22.0541 41.6398C22.0541 34.2717 25.9472 27.8068 31.7573 24.245C34.7787 22.3911 38.3168 21.3261 42.0995 21.3261C43.981 21.3261 45.8073 21.5904 47.5349 22.0835L47.531 22.0874Z" fill="url(#paint0_linear_42_857)" />
            <path d="M34.2468 42.3223C34.2468 38.0545 37.6745 34.5795 41.8911 34.5795H41.895C44.1236 34.5795 46.1392 35.5537 47.5355 37.1039V42.488H44.7744V42.3184C44.7744 40.7051 43.4846 39.3956 41.8911 39.3956C40.2975 39.3956 39.0038 40.7051 39.0038 42.3184V42.488H34.2468V42.3184V42.3223Z" fill="url(#paint1_linear_42_857)" />
            <path d="M41.8916 25.4562C37.395 25.4562 33.3401 27.3771 30.4568 30.4419L34.4722 33.1951C36.4365 31.3925 39.0319 30.2762 41.8877 30.2762C43.9466 30.2762 45.8794 30.8521 47.5282 31.854V26.5133C45.7768 25.8309 43.8717 25.4562 41.8877 25.4562H41.8916Z" fill="url(#paint2_linear_42_857)" />
            <path d="M28.2788 33.3607L32.2193 36.0587C31.3436 37.668 30.8348 39.51 30.8348 41.4744C30.8348 41.8254 30.8545 42.1646 30.8861 42.4999H26.1133C26.0897 42.1567 26.0818 41.8136 26.0818 41.4744C26.0818 38.5161 26.8943 35.7471 28.2828 33.3607H28.2788Z" fill="url(#paint3_linear_42_857)" />
         </g>
         <defs>
            <linearGradient id="paint0_linear_42_857" x1="54.694" y1="62.06" x2="22.6063" y2="6.19936" gradientUnits="userSpaceOnUse">
               <stop stopColor="#5652A2" />
               <stop offset="1" stopColor="#E66869" />
            </linearGradient>
            <linearGradient id="paint1_linear_42_857" x1="53.9294" y1="62.4979" x2="21.8417" y2="6.63732" gradientUnits="userSpaceOnUse">
               <stop stopColor="#5652A2" />
               <stop offset="1" stopColor="#E66869" />
            </linearGradient>
            <linearGradient id="paint2_linear_42_857" x1="57.397" y1="60.5101" x2="25.3054" y2="4.64946" gradientUnits="userSpaceOnUse">
               <stop stopColor="#5652A2" />
               <stop offset="1" stopColor="#E66869" />
            </linearGradient>
            <linearGradient id="paint3_linear_42_857" x1="45.3423" y1="67.4325" x2="13.2506" y2="11.5718" gradientUnits="userSpaceOnUse">
               <stop stopColor="#5652A2" />
               <stop offset="1" stopColor="#E66869" />
            </linearGradient>
         </defs>
      </svg>
   )
}

LuminaHalf.propTypes = {
   className: PropTypes.string,
};



