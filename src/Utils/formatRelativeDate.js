// src/utils/formatRelativeDate.js
import { formatDistanceToNow, parseISO } from 'date-fns';

const formatRelativeDate = (postedDate) => {
    if (!postedDate) {
        return "Date not available";
    }

    const dateString = `${postedDate}T00:00:00`; // Ensure it's in a valid ISO format
    const parsedDate = parseISO(dateString);
    const diffInDays = Math.floor((new Date() - parsedDate) / (1000 * 60 * 60 * 24)); // Difference in days

    if (diffInDays >= 7 && diffInDays < 14) {
        return "1 week ago";
    } else if (diffInDays >= 14 && diffInDays < 21) {
        return "2 weeks ago";
    } else if (diffInDays >= 21 && diffInDays < 28) {
        return "3 weeks ago";
    } else if (diffInDays >= 28) {
        const weeksAgo = Math.floor(diffInDays / 7);
        return `${weeksAgo} weeks ago`;
    } else {
        let relative = formatDistanceToNow(parsedDate, { addSuffix: true });
        // Remove the word "about"
        relative = relative.replace(/^about /, '');
        return relative;
    }
};

export default formatRelativeDate;