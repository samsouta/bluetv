import { useState, useEffect } from 'react';

/**
 * Custom hook to handle timeout error during loading.
 * @param {boolean} isLoading - The current loading state.
 * @param {number} timeout - Timeout duration in milliseconds.
 * @returns {boolean} - Whether a timeout error occurred.
 */
export const useTimeoutError = (isLoading, timeout = 30000) => {
    const [isTimeoutError, setIsTimeoutError] = useState(false);

    useEffect(() => {
        let timeoutId;

        if (isLoading) {
            timeoutId = setTimeout(() => {
                setIsTimeoutError(true);
            }, timeout);
        } else {
            setIsTimeoutError(false); // Reset error state if loading stops
            clearTimeout(timeoutId);  // Clear the timeout
        }

        return () => clearTimeout(timeoutId); // Cleanup on unmount
    }, [isLoading, timeout]);

    return isTimeoutError;
};
