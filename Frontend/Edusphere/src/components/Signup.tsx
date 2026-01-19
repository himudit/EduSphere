import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../features/userSlice";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [isStudent, setIsStudent] = useState(true);
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const url = isStudent
                ? (`${import.meta.env.VITE_BASE_URL}/students/register`)

                : (`${import.meta.env.VITE_BASE_URL}/teachers/register`);

            const response = await axios.post(url, {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            });
            console.log(response);
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
        } catch (error) {
            console.error('Registration failed:', error);
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
        if (value.length > 0 && value.length < 8) {
            setPasswordError("Password must be at least 8 characters");
        } else {
            setPasswordError("");
        }
    };


    return (
        <div className="min-h-screen w-full bg-black relative flex items-center justify-center overflow-hidden">
            {/* Dark White Dotted Grid Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "#000000",
                    backgroundImage: `
                        radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
                    `,
                    backgroundSize: "30px 30px",
                    backgroundPosition: "0 0",
                }}
            />

            {/* Signup Card */}
            <div className="w-[400px] p-8 rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10">

                {/* Toggle Student/Teacher */}
                <div className="flex justify-between  items-center mb-4">
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

                <h1 className="text-white -mt-2 text-2xl font-medium mb-2">Sign Up</h1>
                <p className="text-gray-400 text-sm mb-8">Join the cosmic journey as {isStudent == true ? 'Student' : 'Teacher'}</p>

                <form className="space-y-3" onSubmit={formSubmit}>
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                            value={first_name}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name (optional)"
                            value={last_name}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        {emailError && <p className="text-red-400 text-sm mt-1">{emailError}</p>}
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {passwordError && <p className="text-red-400 text-sm mt-1">{passwordError}</p>}

                    <button
                        type="submit"
                        disabled={loading || emailError !== "" || passwordError !== ""}
                        className={`w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 transition-colors ${loading ? 'bg-purple-400 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading && (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-gray-400">Already have an account? </span>
                    <Link to='/login' className="text-purple-400 hover:text-purple-300">Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;