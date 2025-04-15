import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../features/userSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isStudent, setIsStudent] = useState(true);

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const url = isStudent
                ? (`${import.meta.env.VITE_BASE_URL}/students/login`)

                : (`${import.meta.env.VITE_BASE_URL}/teachers/login`);

            const response = await axios.post(url, {
                email: email,
                password: password
            });
            if (isStudent == true) {
                if (response.status === 200) {
                    const data = response.data;
                    localStorage.setItem('token', data.token);
                    dispatch(fetchUserProfile());
                    navigate('/');
                }
            } else {
                if (response.status === 200) {
                    const data = response.data;
                    localStorage.setItem('teacher_token', data.teacher_token);
                    dispatch(fetchUserProfile());
                    navigate('/');
                }
            }
        } catch (error: any) {
            console.error("Login failed:", error);
            //  Show alert for invalid credentials
            if (error.response && error.response.status === 401) {
                alert("Invalid email or password.");
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === "") {
            setEmailError("");
        } else if (!emailRegex.test(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = (value: string) => {
        if (value.trim() === "") {
            setPasswordError("");
        } else if (value.length < 8) {
            setPasswordError("Password must be at least 8 characters");
        } else {
            setPasswordError("");
        }
    };


    return (
        <div className="min-h-screen bg-[#000000] relative flex items-center justify-center overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-purple-600/20 via-purple-900/20 to-transparent blur-3xl"></div>
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl"></div>

            {/* Login Card */}
            <div className="w-[400px] -mt-[5rem] p-8 rounded-3xl bg-black/30 backdrop-blur-xl border border-t-transparent border-l-white/20 border-b-white/20 border-r-white/20 shadow-2xl relative z-10">

                {/* Toggle Student/Teacher */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        className={`text-white px-4 py-2 rounded-lg transition-all ${isStudent ? 'bg-purple-600' : 'bg-transparent'}`}
                        onClick={() => setIsStudent(true)}
                    >
                        Student
                    </button>
                    <button
                        className={`text-white px-4 py-2 rounded-lg transition-all ${!isStudent ? 'bg-purple-600' : 'bg-transparent'}`}
                        onClick={() => setIsStudent(false)}
                    >
                        Teacher
                    </button>
                </div>

                <h1 className="text-white text-2xl font-medium mb-2">Log In</h1>
                {(isStudent) ?
                    <>
                        <p className="text-gray-400 text-sm mb-8">
                            Stay on top of your studies with easy progress tracking.</p>
                    </> :
                    <>
                        <p className="text-gray-400 text-sm mb-8">
                            Simplify teaching—organize lessons, track progress, and engage students
                        </p>
                    </>}


                {/* Form */}
                <form className="space-y-4" onSubmit={formSubmit}>
                    <input
                        type="text"
                        placeholder="Email or Phone"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);

                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50"
                    />
                    {emailError && (
                        <p className="text-red-400 text-sm mt-1">{emailError}</p>
                    )}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        {passwordError && (
                            <p className="text-red-400 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 transition-colors ${loading ? 'bg-purple-400 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading && (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {
                            isStudent ?
                                <>
                                    {loading ? 'Logging In...' : 'Log In as Student'}
                                </>
                                :
                                <>
                                    {loading ? 'Logging In...' : 'Log In as Teacher'}
                                </>

                        }

                    </button>

                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-gray-400">New to Edusphere? </span>
                    <Link to="/signup" className="text-purple-400 hover:text-purple-300">Join Now</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
