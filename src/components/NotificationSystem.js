



'use client';

import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../app/axios/axiosInstance';

const NotificationSystem = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [showPanel, setShowPanel] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const panelRef = useRef(null);

    const [expandedNotification, setExpandedNotification] = useState(null);


    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get("/categories");
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Fetch notifications when panel is shown
    useEffect(() => {
        if (showPanel) {
            fetchAllNotifications();
        }
    }, [showPanel]);

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                // Check if the click is not on the notification button
                if (!event.target.closest('.notification-button')) {
                    setShowPanel(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Fetch all notifications
    const fetchAllNotifications = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/notification");
            // Update this line to access the notifications array from the response
            setNotifications(res.data.notifications || []);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    // Save selected categories
    const handleSaveCategories = async () => {
        try {
            await axiosInstance.post("/notification/set", {
                categoryIds: selectedCategories
            });
            setShowCategoryModal(false);
            fetchAllNotifications();
        } catch (error) {
            console.error("Error saving categories:", error);
        }
    };

    // Handle category selection
    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    // Handle notification button click
    const handleNotificationClick = () => {
        setShowPanel(!showPanel);
    };

    return (
        <div className="relative">
            {/* Notification Button in Header */}
            <button
                onClick={handleNotificationClick}
                className="notification-button relative py-2 px-3 hover:text-[#009FE3] transition-all duration-200 text-base font-semibold group"
            >
                Notifications
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#009FE3] to-[#87B105] group-hover:w-full transition-all duration-300"></div>

                {/* Notification Badge */}
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                )}
            </button>

            {/* Slide-in Panel */}
            <div
                ref={panelRef}
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${showPanel ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-4 h-full flex flex-col border-l border-gray-100">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                        <button
                            onClick={() => setShowPanel(false)}
                            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <button
                        onClick={() => setShowCategoryModal(true)}
                        className="mb-4 w-full bg-gradient-to-r from-[#009FE3] to-[#87B105] text-white py-2 rounded-md hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Set Preferences
                    </button>

                    <div className="flex-grow overflow-y-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009FE3]"></div>
                                <p className="mt-2 text-gray-500">Loading notifications...</p>
                            </div>
                        ) : notifications && notifications.length > 0 ? (
                            <div className="space-y-3">
                                {notifications.map((notification) => {
                                    const isExpanded = expandedNotification === notification._id; // check if this one is expanded
                                    return (
                                        <div
                                            key={notification._id}
                                            className="p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white transition-colors shadow-sm"
                                        >
                                            {/* Title */}
                                            <h4 className="font-semibold text-sm text-gray-800">{notification.title}</h4>

                                            {/* Extra details only when expanded */}
                                            {isExpanded && (
                                                <>
                                                    <p className="text-xs text-gray-600 mt-1 truncate">{notification.description}</p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="text-xs text-gray-400">
                                                            {new Date(notification.createdAt).toLocaleDateString()}
                                                        </span>
                                                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                            {categories.find((cat) => cat._id === notification.category)?.name || "General"}
                                                        </span>
                                                    </div>
                                                </>
                                            )}

                                            {/* Read more / Show less button */}
                                            <button
                                                onClick={() =>
                                                    setExpandedNotification(isExpanded ? null : notification._id)
                                                }
                                                className="text-blue-600 text-xs mt-2 focus:outline-none"
                                            >
                                                {isExpanded ? "Show less" : "Read more"}
                                            </button>
                                        </div>
                                    );
                                })}

                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <p className="text-gray-500">No notifications available</p>
                                <p className="text-sm text-gray-400 mt-1">Set preferences to get relevant notifications</p>
                            </div>
                        )}
                    </div>

                    {/* Footer with clear all button */}
                    {notifications && notifications.length > 0 && (
                        <div className="pt-4 mt-auto border-t border-gray-100">
                            <button className="w-full text-sm text-gray-500 hover:text-gray-700 py-2 rounded-md hover:bg-gray-100 transition-colors">
                                Clear All
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Category Selection Modal */}
            {showCategoryModal && (
                <>
                    <div
                        className="fixed inset-0 bg-opacity-50 z-50"
                        onClick={() => setShowCategoryModal(false)}
                    ></div>

                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
                        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Notification Preferences</h2>
                            <button
                                onClick={() => setShowCategoryModal(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 max-h-64 overflow-y-auto">
                            <p className="text-sm text-gray-600 mb-4">
                                Select categories to receive notifications for:
                            </p>

                            <div className="space-y-3">
                                {categories.map(category => (
                                    <div key={category._id} className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            id={`cat-${category._id}`}
                                            checked={selectedCategories.includes(category._id)}
                                            onChange={() => handleCategoryChange(category._id)}
                                            className="mr-3 h-4 w-4 text-[#009FE3] focus:ring-[#009FE3] border-gray-300 rounded"
                                        />
                                        <label htmlFor={`cat-${category._id}`} className="text-sm text-gray-700">
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 p-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setShowCategoryModal(false)}
                                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCategories}
                                className="px-4 py-2 text-sm bg-gradient-to-r from-[#009FE3] to-[#87B105] text-white rounded-md hover:opacity-90 transition-opacity shadow-md"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Overlay for panel when open */}
            {showPanel && (
                <div className="fixed inset-0  bg-opacity-30 z-40"></div>
            )}
        </div>
    );
};

export default NotificationSystem;