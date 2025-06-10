// import './index.css';
// import React, { Suspense } from 'react';
// import Home from './components/Home';
// import Login from './components/Login.tsx';
// import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
// import Layout from './Layout.tsx'
// import Signup from './components/Signup.tsx';
// import CourseDetails from './components/CourseDetails.tsx';
// import Search from './components/Search.tsx';
// import Profile from './components/Profile.tsx';

// const LazyTeacherProfile = React.lazy(() => import('./components/EditTeacherProfile.tsx'));
// const LazyStudentProfile = React.lazy(() => import('./components/EditStudentProfile.tsx'));
// const LazyCourseUploadProfile = React.lazy(() => import('./components/CourseUpload.tsx'));
// const LazyPurchasedCourses = React.lazy(() => import('./components/PurchasedCourses.tsx'));

// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path='/' element={<Layout />}>
//         <Route path='/' element={<Home />} />
//         <Route path='login' element={<Login />} />
//         <Route path='signup' element={<Signup />} />
//         <Route path="/course/:course_id" element={<CourseDetails />} />
//         <Route path="/search" element={<Search />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/profile/students/edit" element={<LazyStudentProfile />} />
//         <Route path="/profile/teachers/edit" element={<LazyTeacherProfile />} />
//         <Route path="/teacher/courseupload" element={<LazyCourseUploadProfile />} />
//         <Route path="/mylearning" element={<LazyPurchasedCourses />} />
//       </Route>
//     )
//   );

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   )
// }

// export default App

import './index.css';
import React, { Suspense } from 'react'; // Make sure Suspense is imported
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

// Import components that are NOT lazy-loaded (i.e., critical for initial load)
import Layout from './Layout.tsx';
import Home from './components/Home';
import Login from './components/Login.tsx';
import Signup from './components/Signup.tsx';
import CourseDetails from './components/CourseDetails.tsx';
import Search from './components/Search.tsx';
import Profile from './components/Profile.tsx';

// Lazy load the components
// Ensure these components use 'export default' in their respective files.
const LazyTeacherProfile = React.lazy(() => import('./components/EditTeacherProfile.tsx'));
const LazyStudentProfile = React.lazy(() => import('./components/EditStudentProfile.tsx'));
const LazyCourseUploadProfile = React.lazy(() => import('./components/CourseUpload.tsx'));
const LazyPurchasedCourses = React.lazy(() => import('./components/PurchasedCourses.tsx'));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        {/* These components will be part of the initial bundle or loaded normally */}
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path="/course/:course_id" element={<CourseDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />

        {/* Wrap lazy-loaded routes with Suspense */}
        {/* You can have a single Suspense for multiple lazy routes,
            or separate ones if you want different loading indicators. */}
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