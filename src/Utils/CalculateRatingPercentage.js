// Match view and count -----------------------
export const calculateRatingPercentage = (ratingTotal, ratingCount) => {
    if (ratingCount === 0) {
        return "0%"; // No ratings, 0%
    }

    const averageRating = ratingTotal / ratingCount;
    const ratingPercentage = (averageRating / 5) * 100;

    return `${Math.round(ratingPercentage)}%`; // Round to the nearest whole number
};
/////////////-----------------