import PropTypes from 'prop-types';

export default function DownloadSvg({ className }) {
   return (
      <>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" className={`${className}`}>
            <path d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z" stroke="#1E3A8A" strokeWidth="1.5" />
            <path d="M12 7.5V13M10 11.5L11.2929 12.7929C11.6262 13.1262 11.7929 13.2929 12 13.2929C12.2071 13.2929 12.3738 13.1262 12.7071 12.7929L14 11.5" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.99023 16.5H14.9902" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
      </>
   )
}

DownloadSvg.propTypes = {
   className: PropTypes.string,
};