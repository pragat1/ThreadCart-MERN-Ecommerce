import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Profile = () => {
const { backendUrl, token, navigate, setToken, setCartItems } =
useContext(ShopContext);

const [user, setUser] = useState(null);
const [name, setName] = useState('');
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [editing, setEditing] = useState(false);
const [error, setError] = useState('');
const [message, setMessage] = useState('');

useEffect(() => {
    if (!token) {
        navigate('/login');
        return;
    }

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError('');

            const { data } = await axios.get(
                `${backendUrl}/api/user/profile`,
                {
                    headers: { token }
                }
            );

            if (data.success) {
                setUser(data.user);
                setName(data.user.name || '');
            } else {
                setError(data.message || 'Unable to load profile.');
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Unable to load your profile. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    fetchProfile();
}, [token, backendUrl, navigate]);

const handleSave = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
        setError('Please enter your name.');
        return;
    }

    try {
        setSaving(true);
        setError('');
        setMessage('');

        const { data } = await axios.put(
            `${backendUrl}/api/user/profile`,
            { name: name.trim() },
            {
                headers: { token }
            }
        );

        if (data.success) {
            setUser(data.user);
            setName(data.user.name);
            setEditing(false);
            setMessage('Your profile has been updated.');
        } else {
            setError(data.message || 'Unable to update profile.');
        }
    } catch (err) {
        setError(
            err.response?.data?.message ||
            'Unable to update your profile. Please try again.'
        );
    } finally {
        setSaving(false);
    }
};

const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
};

if (loading) {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <p className="text-gray-500">Loading your profile...</p>
        </div>
    );
}

if (error && !user) {
    return (
        <div className="max-w-5xl mx-auto py-16 px-4">
            <h1 className="text-2xl font-medium mb-3">My Profile</h1>
            <p className="text-red-600 mb-5">{error}</p>
            <button
                onClick={() => navigate('/login')}
                className="bg-black text-white px-6 py-3 text-sm"
            >
                Go to Login
            </button>
        </div>
    );
}

if (!user) return null;

return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Page heading */}
        <div className="mb-10">
            <p className="text-sm text-gray-500 mb-2">
                ThreadCart / Account
            </p>

            <h1 className="text-3xl sm:text-4xl font-medium">
                My Account
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
                Manage your personal information and orders.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">

            {/* Account navigation */}
            <aside className="border border-gray-200 h-fit">
                <div className="p-5 border-b border-gray-200">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium mb-3">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>

                    <p className="font-medium break-words">
                        {user.name}
                    </p>

                    <p className="text-sm text-gray-500 break-all mt-1">
                        {user.email}
                    </p>
                </div>

                <nav className="flex flex-col text-sm">
                    <button
                        onClick={() => {
                            setEditing(false);
                            setError('');
                            setMessage('');
                        }}
                        className="text-left px-5 py-4 hover:bg-gray-50 border-l-2 border-black"
                    >
                        My Profile
                    </button>

                    <Link
                        to="/orders"
                        className="px-5 py-4 hover:bg-gray-50"
                    >
                        My Orders
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="text-left px-5 py-4 hover:bg-gray-50 text-red-600"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Profile details */}
            <section className="border border-gray-200 p-5 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-xl font-medium">
                            Personal Information
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            View and update your account details.
                        </p>
                    </div>

                    {!editing && (
                        <button
                            onClick={() => {
                                setName(user.name || '');
                                setEditing(true);
                                setError('');
                                setMessage('');
                            }}
                            className="border border-gray-300 px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors"
                        >
                            Edit
                        </button>
                    )}
                </div>

                {error && (
                    <p className="bg-red-50 text-red-700 p-3 text-sm mb-5">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="bg-green-50 text-green-700 p-3 text-sm mb-5">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSave}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm text-gray-500 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={editing ? name : user.name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                readOnly={!editing}
                                className={`w-full border px-4 py-3 text-sm outline-none ${
                                    editing
                                        ? 'border-gray-400 focus:border-black'
                                        : 'border-gray-200 bg-gray-50'
                                }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none"
                            />

                            <p className="text-xs text-gray-400 mt-2">
                                Email editing is not enabled.
                            </p>
                        </div>
                    </div>

                    {editing && (
                        <div className="flex gap-3 mt-8">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-black text-white px-6 py-3 text-sm disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setName(user.name || '');
                                    setEditing(false);
                                    setError('');
                                    setMessage('');
                                }}
                                className="border border-gray-300 px-6 py-3 text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>

                <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className="font-medium mb-2">Account Security</h3>

                    <p className="text-sm text-gray-500">
                        Your password is protected and is never displayed
                        on this page.
                    </p>
                </div>
            </section>
        </div>
    </main>
);

};

export default Profile;