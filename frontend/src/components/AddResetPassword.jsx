import React, { useState } from 'react';

const AddResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        const token = new URLSearchParams(window.location.search).get('token');
        if (!token) {
            setError('Invalid or missing reset token');
            return;
        }

        try {
            // Simulate API call to reset password (replace with your actual endpoint)
            const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Password reset successfully! Redirecting to login...');
                setError('');
                // Redirect to login after a delay (e.g., 2 seconds)
                setTimeout(() => (window.location.href = '/login'), 2000);
            } else {
                setError(data.message || 'Failed to reset password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h1>
                {message && <p className="text-green-600 text-center mb-4">{message}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Reset Password
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Remembered your password?{' '}
                    <a href="/login" className="text-indigo-600 hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default AddResetPassword;