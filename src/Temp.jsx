

import Footer from './components/Footer'
import ReportSvg from './assets/ReportSvg'
import Header from './components/Header'
import completeLogo from './assets/Complete.png';
import ScheduleSvgLumina from './assets/ScheduleSvgLumina';
import DownloadAnimated from './assets/DownloadAnimated';
import PendingSvg from './assets/PendingSvg';

export default function Temp() {
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


            <div className=' container mx-auto dashboard-div rounded-md border'>
               <table border="1" cellPadding="8" cellSpacing="0" className='w-full  ' style={{ borderCollapse: 'collapse' }}>
                  <thead className='bg-[#F5F5F5] md:table-header-group hidden'>
                     <tr>
                        <th className='w-[25%] text-left p-[.625rem] lg:py-[1.25rem] lg:px-[2rem] text-[#374151] font-semibold text-[1rem]' >Date of Scan</th>
                        <th className='w-[25%] text-left lg:py-[1.25rem] p-[.625rem] lg:px-[2rem] text-[#374151] font-semibold text-[1rem]' >Type of Scan</th>
                        <th className='w-[25%] text-left lg:py-[1.25rem] lg:px-[2rem] p-[.625rem] text-[#374151] font-semibold text-[1rem]' >Status of the Scan</th>
                        <th className='w-[25%] text-left  lg:py-[1.25rem] lg:px-[2rem] text-[#374151] p-[.625rem] font-semibold text-[1rem]' >Report Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className='w-[25%] text-left  p-[.625rem] lg:py-[1.25rem] lg:px-[2rem]' >borderCollapse</td>
                        <td className='w-[25%] text-left  p-[.625rem] lg:py-[1.25rem] lg:px-[2rem]' >border Collapse</td>
                        <td className='w-[25%] text-left  p-[.625rem] lg:py-[1.25rem] lg:px-[2rem]' >
                           <span className='md:hidden block text-left  text-[#374151] font-semibold text-[1rem]'>Status Of  the Scan</span>
                           <span className="flex w-full h-full items-center gap-x-[.75rem] ">
                              <img src={completeLogo} className='w-auto h-auto' />
                              Scan Scheduled
                           </span>
                        </td>
                        <td className='w-[25%] text-left p-[.625rem] lg:py-[1.25rem] lg:px-[2rem]' >
                           <span className='md:hidden block text-left  text-[#374151] font-semibold text-[1rem] pb-2'>Report Status</span>
                           <button  className={`max-w-[13.5rem] w-full h-auto px-5 py-3 flex items-center rounded-md justify-between font-semibold text-[1rem] border `}>
                             Download Report
                              <PendingSvg className='' />
                           </button>
                        </td>
                     </tr>
                     <tr>
                        <td className='w-[25%] text-left  p-[.625rem] lg:py-[1.25rem] lg:px-[2rem] md:px-[1rem]' >borderCollapse</td>
                        <td className='w-[25%] text-left  p-[.625rem] lg:py-[1.25rem] lg:px-[2rem] md:px-[1rem]' >border Collapse</td>
                        <td className='w-[25%] text-left  p-[.625rem] lg:py-[1.25rem] lg:px-[2rem] md:px-[1rem]' >
                           <span className='md:hidden block text-left  text-[#374151] font-semibold text-[1rem]'>Status Of  the Scan</span>
                           <span className="flex w-full h-full items-center gap-x-[.75rem] ">
                              <ScheduleSvgLumina />
                              Scan Complete
                           </span>
                        </td>
                        <td className='w-[25%] text-left p-[.625rem] lg:py-[1.25rem] lg:px-[2rem]' >
                           <span className='md:hidden block text-left  text-[#374151] font-semibold text-[1rem] pb-2'>Report Status</span>
                           <button  className={`max-w-[13.5rem] w-full h-auto px-5 py-3 flex items-center rounded-md justify-between font-semibold text-[1rem] border `}>
                             View Reports
                              <DownloadAnimated className='' />
                           </button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

         </main>
         <Footer className="mt-20 mb-6 px-[1.25rem]" userProfile={false} />
      </>
   )
}
