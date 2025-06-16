import './index.css';
import React, { Suspense } from 'react'; 
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Layout from './Layout.tsx';
import Home from './components/Home';
import Login from './components/Login.tsx';
import Signup from './components/Signup.tsx';
import CourseDetails from './components/CourseDetails.tsx';
import Search from './components/Search.tsx';

const LazyTeacherProfile = React.lazy(() => import('./components/EditTeacherProfile.tsx'));
const LazyStudentProfile = React.lazy(() => import('./components/EditStudentProfile.tsx'));
const LazyCourseUploadProfile = React.lazy(() => import('./components/CourseUpload.tsx'));
const LazyPurchasedCourses = React.lazy(() => import('./components/PurchasedCourses.tsx'));
const LazyProfile = React.lazy(() => import('./components/Profile.tsx'));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path="/course/:course_id" element={<CourseDetails />} />
        <Route path="/search" element={<Search />} />

        <Route
          path="/profile"
          element={
            <Suspense fallback={<div>Loading profile...</div>}>
              <LazyProfile />
            </Suspense>
          }
        />
        <Route
          path="/profile/students/edit"
          element={
            <Suspense fallback={<div>Loading student profile editor...</div>}>
              <LazyStudentProfile />
            </Suspense>
          }
        />
        <Route
          path="/profile/teachers/edit"
          element={
            <Suspense fallback={<div>Loading teacher profile editor...</div>}>
              <LazyTeacherProfile />
            </Suspense>
          }
        />
        <Route
          path="/teacher/courseupload"
          element={
            <Suspense fallback={<div>Loading course upload page...</div>}>
              <LazyCourseUploadProfile />
            </Suspense>
          }
        />
        <Route
          path="/mylearning"
          element={
            <Suspense fallback={<div>Loading your purchased courses...</div>}>
              <LazyPurchasedCourses />
            </Suspense>
          }
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;