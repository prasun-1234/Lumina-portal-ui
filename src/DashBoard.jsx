import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ReportSvg from './assets/ReportSvg'
import PendingSvg from './assets/PendingSvg'
import DownloadSvg from './assets/DownloadSvg'
import DownloadAnimated from './assets/DownloadAnimated'
import ScheduleSvgLumina from './assets/ScheduleSvgLumina'
import PropTypes from 'prop-types';
// import CompleteSvg from './assets/CompleteSvg'
import completeLogo from './assets/Complete.png';

function DashBoard({ submitFormData }) {
   const formId = 1;
   const consumerKey = import.meta.env.VITE_CONSUMER_KEY;
   const consumerSecret = import.meta.env.VITE_CONSUMER_SECRET;
   const [entries, setEntries] = useState([]);
   // const [downloading, setDownloading] = useState(false);
   const [downloadingEntryId, setDownloadingEntryId] = useState(null);
   console.log(submitFormData, "submit form data");


   useEffect(() => {
      // Fetch data from API here
      fetch(`https://luminascan.com/wp-json/gf/v2/forms/${formId}/entries`, {
         method: 'GET',
         headers: {
            'Authorization': 'Basic ' + btoa(`${consumerKey}:${consumerSecret}`),
            'Content-Type': 'application/json'
         }
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            return response.json();
         })
         .then((data) => {
            console.log(data, 'json');
            setEntries(data.entries || []);

         })
         .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
         });
   }, [])

   const groupByEmail = Array.isArray(entries)
      ? entries.reduce((acc, entry) => {
         const email = entry[2];
         // const signupEmail = submitFormData[1];
         if (!acc[email]) {
            acc[email] = [];
         }
         acc[email].push(entry);
         return acc;
      }, {}) // Provide an initial value of {}
      : {};

   const handleAnimation = (id) => {
      // setDownloading(true);
      setDownloadingEntryId(id);
      setTimeout(() => {
         // setDownloading(false);
         setDownloadingEntryId(null);
         // Here you can also trigger the actual download functionality
      }, 3000);
   }

   return (
      <>
         <Header />
         <main className='w-full flex flex-col items-start md:gap-y-[2rem] gap-y-[1.25rem] px-[1.25rem] '>
            <div className="report w-full container mx-auto flex items-center  " >
               <div className="md:w-full md:min-w-[3.375rem]  w-[2.75rem] h-[2.75rem] max-w-[3rem] md:h-full md:min-h-[3.375rem] max-h-[4rem] rounded-full bg-[#1E3A8A] flex items-center justify-center ">
                  <ReportSvg />
               </div>
               <h3 className=" text-[#374151] text-left font-semibold md:text-[2.5rem] text-[1.25rem]  ml-3 ">Scan Reports</h3>
            </div>

            {Object.keys(groupByEmail).length > 0 ? (
               Object.keys(groupByEmail).map((ip) => (
                  <div key={ip} className=' container mx-auto dashboard-div rounded-md border'>
                     {/* <h3>IP Address: {ip}</h3> */}
                     <table border="1" cellPadding="8" cellSpacing="0" className='w-full  ' style={{ borderCollapse: 'collapse' }}>
                        <thead className='bg-[#F5F5F5] md:table-header-group hidden'>
                           <tr>
                              <th className='w-[25%] text-left p-[.625rem] lg:py-[1.25rem] lg:px-[2rem] px-4 text-[#374151] font-semibold text-[1rem]' >Date of Scan</th>
                              <th className='w-[25%] text-left lg:py-[1.25rem] p-[.625rem] lg:px-[2rem] px-4 text-[#374151] font-semibold text-[1rem]' >Type of Scan</th>
                              <th className='w-[25%] text-left lg:py-[1.25rem] lg:px-[2rem] px-4 p-[.625rem] text-[#374151] font-semibold text-[1rem]' >Status of the Scan</th>
                              <th className='w-[25%] text-left  lg:py-[1.25rem] lg:px-[2rem] px-4 text-[#374151] p-[.625rem] font-semibold text-[1rem]' >Report Status</th>
                           </tr>
                        </thead>
                        <tbody>
                           {groupByEmail[ip].map((entry) => (
                              <tr key={entry.id} className='md:table-row flex flex-col md:p-0 p-4 ' >
                                 <td className='w-full  md:w-[25%] md:table-cell flex flex-col text-left p-[.625rem] lg:py-[1.25rem] xl:px-[2rem] lg:px-4  md:px-[10px] text-[1rem] font-normal text-[#374151] '>
                                    <span className='md:hidden block text-left  text-[#374151] font-semibold text-[1rem]'>Date of Scan</span>
                                    <span>{entry[3]} {entry[1]} </span>
                                 </td>
                                 <td className='w-full  md:w-[25%] md:table-cell flex flex-col text-left p-[.625rem] lg:py-[1.25rem] xl:px-[2rem] lg:px-4  md:px-[10px] text-[1rem] font-normal text-[#374151] '>
                                    <span className='md:hidden block text-left  text-[#374151] font-semibold text-[1rem]'>Type Of Scan</span>
                                    <span>{entry[21]}</span>
                                 </td>
                                 <td className='w-full  md:w-[25%] md:table-cell flex flex-col text-left p-[.625rem] lg:py-[1.25rem] xl:px-[2rem] lg:px-4  md:px-[10px] text-[1rem] font-normal text-[#374151] '>
                                    <span className='md:hidden block text-left  text-[#374151] font-semibold text-[1rem]'>Status Of  the Scan</span>
                                    <span className="flex w-full h-full items-center gap-x-[.75rem] ">
                                       {entry.is_read === '1' ? <img src={completeLogo} className='w-auto h-auto' /> : <ScheduleSvgLumina />}
                                       {entry.is_read === '1' ? "Scan Completed" : "Scan Scheduled"}
                                    </span>
                                 </td>
                                 <td className='w-full  md:w-[25%]   md:justify-center justify-start p-[.625rem] lg:py-[1.25rem] xl:px-[2rem] lg:px-4  md:px-[10px] text-[1rem] font-normal text-[#374151] '>
                                    <span className='md:hidden block text-left  text-[#374151] font-semibold text-[1rem] pb-2'>Report Status</span>
                                    <button key={entry.id} onClick={() => handleAnimation(entry.id)} className={`max-w-[13.5rem] w-full h-auto lg:px-5 px-[10px]  py-3 flex items-center rounded-md justify-between font-semibold lg:text-[1rem] sm:text-[.75rem] border ${entry.is_read === "1" ? "generated" : "pending"} `}>
                                       {entry.is_read === '1' ? (
                                          downloadingEntryId === entry.id ? 'Downloading...' : 'Download Report'
                                       ) : (
                                          'Report Pending'
                                       )}

                                       {entry.is_read === '1' ? (downloadingEntryId === entry.id ? (<DownloadAnimated className='' />) : (<DownloadSvg className='' />)) : (<PendingSvg className='' />)}
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               ))
            ) : (
               <div className=' container mx-auto '>No entries found</div>
            )}
         </main>
         <Footer className="mt-20 mb-6 px-[1.25rem]" userProfile={true} />
      </>
   )
}

DashBoard.propTypes = {
   submitFormData: PropTypes.func,
   className: PropTypes.string,
};
export default DashBoard

