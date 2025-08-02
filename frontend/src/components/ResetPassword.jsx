import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import { IoMdArrowBack } from 'react-icons/io';
import toast from 'react-hot-toast';
import axios from 'axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add password reset logic here
        console.log('Reset link sent to:', email);
    };

    const handleBack = () => {
        // Add logic to navigate back (e.g., using React Router or window.history)
        window.history.back();
    };


    const handleResetLink = async () => {
        try {
            let response = await axios.post('http://localhost:5174/api/users/reset-password-link', {
                email
            })
            console.log(response)
            toast.success('Reset Mail Successfully!')
            localStorage.setItem('user', JSON.stringify(response.data))
        } catch (error) {
            console.log(error)
        }
    }

    const { setShowPassScreen } = useContext(AppContext)

    return (
        <div className="max-w-md mx-auto p-6">
            <div
                onClick={() => setShowPassScreen(false)}
                className="flex gap-2 cursor-pointer items-center active:scale-95"
            >
                <IoMdArrowBack />
                <h2 className="text-sm font-semibold">Back</h2>
            </div>
            <h1 className="text-2xl font-bold text-black">Reset password</h1>
            <p className="text-gray-600 text-sm mt-2">
                Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="mt-4">
                <div>
                    <label className="block text-gray-700 text-sm mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ali@mail.com"
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleResetLink}
                    className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800"
                >
                    Reset password
                </button>
            </form>
            <button
                onClick={handleBack}
                className="mt-4 w-full bg-gray-200 text-black p-3 rounded-md hover:bg-gray-300"
            >
                Back
            </button>
        </div>
    );
};

export default ResetPassword;