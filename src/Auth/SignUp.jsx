import bodyImg from '../assets/body-frame.jpg'
import { useState, useEffect } from 'react';
import { extractInnerText } from '../Hooks/ExtractText';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import LuminaFormImg from '../assets/LuminaFormImg';
import PropTypes from 'prop-types';

export default function SignUp({ onFormSubmit }) {
   const [formFields, setFormFields] = useState([]);
   const [formData, setFormData] = useState({});
   const [message, setMessage] = useState('');
   const [isValid, setIsValid] = useState(false);
   // console.log('message', message, isValid);


   const formId = 3;
   const consumerKey = import.meta.env.VITE_CONSUMER_KEY;
   const consumerSecret = import.meta.env.VITE_CONSUMER_SECRET;
   

   const auth = btoa(`${consumerKey}:${consumerSecret}`);

   useEffect(() => {
      const fetchFormData = async () => {
         try {
            const response = await fetch(
               `https://luminascan.com/wp-json/gf/v2/forms/${formId}`,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Basic ${auth}`,
                  },
               }
            );

            if (!response.ok) {
               throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setFormFields(data.fields);
            // Initialize form data state based on the fields
            const initialFormData = {};
            data.fields.forEach((field) => {
               initialFormData[`input_${field.id}`] = '' // Initialize with empty strings
            });
            setFormData(initialFormData);
         } catch (error) {
            console.error('Error fetching form data:', error);
         }
      };

      fetchFormData();
   }, [formId]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));

   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Check if all required fields have values
      const filledOut = Object.values(formData).some(value => value.trim() !== '');

      if (!filledOut) {
         console.error('At least one form field must be filled out.');
         return;
      }

      try {
         const response = await fetch(
            `https://luminascan.com/wp-json/gf/v2/forms/${formId}/submissions`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${auth}`,
               },
               body: JSON.stringify(formData),
            }
         );

         if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Submission error response:', errorResponse);
            throw new Error(`Error: ${response.status} ${response.statusText}`);
         }

         const data = await response.json();
         const confMsg = extractInnerText(data.confirmation_message);
         setMessage(confMsg);
         setIsValid(data.is_valid);
         console.log('Form submitted successfully:', data, formData);
         onFormSubmit(formData);
      } catch (error) {
         console.error('Error submitting form:', error);
      }
   };


   return (
      <>
         <div className="flex  md:h-dvh h-auto  flex-col justify-center px-6 lg:py-24 md:py-12  py-8 lg:px-8  lg:gap-y-[10rem] sm:gap-y-[7rem] gap-y-[5rem] ">
            <div className="w-full lg:max-w-[46.875rem] sm:max-w-[35rem] max-w-full flex flex-col mx-auto  justify-center gap-6 rounded-[8px]  border ">
               {isValid && message ? (
                  <div className='form-img w-full min-h-[18.75rem] flex flex-col items-center justify-center h-full bg-white  rounded-lg'>
                     {message}
                     <Link to="/dashboard" className=' w-fit p-4 rounded-md bg-[#626262] flex items-center justify-center text-[#fff] mt-8 border'>Go to Dashboard</Link>
                  </div>
               ) : (
                  <div className="form-img w-full md:grid md:grid-cols-12 flex bg-white  rounded-lg">
                     <form onSubmit={handleSubmit} className="w-full lg:col-span-8 md:col-span-7  col col-span-12  flex flex-col items-start lg:p-10 p-8">
                        <LuminaFormImg alt="lumina logo" className='w-auto h-full max-h-[6.25rem]' />
                        {formFields.map((field) => (
                           <div key={field.id} className='w-full mt-8'>
                              <label htmlFor={`input_${field.id}`} className='text-[#626262]' >{field.label}</label>
                              <input
                                 type={field.type}
                                 id={`input_${field.formId}_${field.id}`}
                                 name={`input_${field.id}`}
                                 value={formData[`input_${field.id}`] || ''}
                                 onChange={handleChange}
                                 required={field.isRequired}
                                 placeholder={field.placeholder || ''}
                                 className='block w-full mt-2 rounded-md border-0 py-3 px-6 text-[#626262] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                           </div>
                        ))}
                        <button className='mt-6 w-full max-w-[6.25rem] px-6 py-3  bg-[#6562ED] text-white rounded-md self-end'>Submit</button>
                     </form>

                     <figure className="lg:col-span-4 md:col-span-5 col-span-12 hidden md:flex w-full ">
                        <img src={bodyImg} alt="body image" className='w-full h-full body-img' />
                     </figure>
                  </div>
               )}

            </div>
         </div>
         <span className='absolute w-full h-full top-0 left-0 -z-10 signup-section'></span>
         <Footer className="md:fixed relative bottom-4 left-1/2 transform -translate-x-1/2 px-[1.25rem] " userProfile={false} />

      </>
   )
}

SignUp.propTypes = {
   onFormSubmit: PropTypes.func.isRequired
};



