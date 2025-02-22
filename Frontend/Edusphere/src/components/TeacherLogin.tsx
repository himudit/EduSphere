import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchUserProfile, addUser, removeUser } from "../features/userSlice";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/teachers/login`, {
                email: email,
                password: password
            });
            console.log(response);
            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('teacher_token', data.teacher_token);
                dispatch(fetchUserProfile());
                dispatch(fetchUserProfile());
                navigate('/');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen  bg-[#000000] relative overflow-hidden flex items-center justify-center">
            {/* Cosmic Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-purple-600/20 via-purple-900/20 to-transparent blur-3xl"></div>
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl"></div>

            {/* Sign In Card */}
            <div className="w-[400px] p-8 rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl relative z-10">
                <h1 className="text-white text-3xl font-medium mb-2">Log In</h1>
                <p className="text-gray-400 text-sm mb-8">Simplify teaching—organize lessons, track progress, and engage students</p>

                <form className="space-y-4" onSubmit={(e) => formSubmit(e)} >
                    <div>
                        <input
                            type="text"
                            name="emailOrPhone"
                            placeholder="Email or Phone"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
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

                    <button
                        type="button"
                        onClick={() => {
                            navigate('/login');
                        }}
                        className="text-gray-400 text-sm hover:text-purple-400 transition-colors"
                    >
                        Login as Student
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 transition-colors ${loading ? 'bg-purple-400 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading && (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? 'Logging In...' : 'Log In as Teacher'}
                    </button>

                </form>

                <div className="mt-8 text-center text-sm">
                    <span className="text-gray-400">New to Atomic? </span>
                    <Link to='/teacher/signup' className="text-purple-400 hover:text-purple-300">Join Now</Link>
                </div>
            </div>
        </div>
    );
}


export default Login;