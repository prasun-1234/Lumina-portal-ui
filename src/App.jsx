import { lazy, Suspense, useState } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom'

const SignUpPage = lazy(() => import('./Auth/SignUp'));

const DashBoardPage = lazy(() => import('./DashBoard'));

function App() {
  const [submitFormData, setSubmitFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmitFormData(data);
    console.log('Form Data received from SignUp:', data);
  }


  return (
    <>
      <div className="mainApp relative">
        <Suspense fallback={<div className="container mx-auto">Loading......</div>}  >
          <Routes>
            <Route path="/" element={<SignUpPage onFormSubmit={handleFormSubmit} />} />
            {/* <Route path="/signup" element={<SignUpPage />} /> */}
            <Route path="/dashboard" element={<DashBoardPage submitFormData={submitFormData} />} />
            <Route path="*"
              element={
                <div className="w-full h-dvh container mx-auto">
                  <h2 className="text-[4rem] font-bold  ">404 not found </h2>
                </div>
              } 
            />
          </Routes>

        </Suspense>

      </div>
    </>
  )
}

export default App
