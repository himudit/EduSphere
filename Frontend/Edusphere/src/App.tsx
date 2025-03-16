import './index.css';
import Home from './components/Home';
import Login from './components/Login.tsx';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.tsx'
import Signup from './components/Signup.tsx';
import CourseDetails from './components/CourseDetails.tsx';
import Search from './components/Search.tsx';
import Profile from './components/Profile.tsx';
import EditStudentProfile from './components/EditStudentProfile.tsx';
import EditTeacherProfile from './components/EditTeacherProfile.tsx'
import CourseUpload from './components/CourseUpload';
import TeacherSignup from './components/TeacherSignup.tsx';
import TeacherLogin from './components/TeacherLogin.tsx';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path="/course/:course_id" element={<CourseDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/students/edit" element={<EditStudentProfile />} />
        <Route path="/profile/teachers/edit" element={<EditTeacherProfile />} />
        <Route path="/teacher/courseupload" element={<CourseUpload />} />
        {/* <Route path="/teacher/login" element={<TeacherLogin />} /> */}
        {/* <Route path="/teacher/signup" element={<TeacherSignup />} /> */}
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
