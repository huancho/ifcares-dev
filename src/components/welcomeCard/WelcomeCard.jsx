import React from 'react';
import Link from 'next/link';

const useIsWithinLastWeek = (dateStr) => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  const checkDate = new Date(dateStr);

  return checkDate >= lastWeek && checkDate <= today;
};

const WelcomeCard = ({ date, siteName, isExcluded, isNewDate }) => {
  // Function to format the date
  const formatDate = (dateStr) => {
    // Correcting the date string format if necessary
    const correctedDateStr = dateStr.includes('T')
      ? dateStr
      : `${dateStr}T00:00:00Z`;

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date(correctedDateStr);
    const dayOfWeek = days[date.getUTCDay()]; // Using getUTCDay() for UTC dates
    const dayOfMonth = date.getUTCDate(); // Using getUTCDate() for UTC dates
    const month = months[date.getUTCMonth()]; // Using getUTCMonth() for UTC dates

    // Adding the suffix for the day of the month
    const suffix = (dayOfMonth) => {
      if (dayOfMonth > 3 && dayOfMonth < 21) return 'th';
      switch (dayOfMonth % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${dayOfWeek}, ${dayOfMonth}${suffix(dayOfMonth)} of ${month}`;
  };

  const isWithinLastWeek = useIsWithinLastWeek(date);

  const formattedDate = formatDate(date);

  let cardBackgroundColor = 'bg-white'; // Default background color for new dates
  if (!isNewDate) {
    cardBackgroundColor = isExcluded ? 'bg-[#46DC8C]' : 'bg-[#D76565] text-white';
  }

  // Card content
  const cardContent = (
    <div className={`h-20 sm:h-28 flex items-center justify-center shadow-lg p-4 rounded-lg  ${cardBackgroundColor}`}>
      <h5 className={`text-xs lg:text-lg md:text-base sm:text-sm font-medium tracking-tight`}>
        {formattedDate}
      </h5>
    </div>
  );

  // Construct the URL with the date and siteName as parameters
  const url = `/mealCount?site=${encodeURIComponent(siteName)}&date=${encodeURIComponent(date)}`;


  return (
    <>
      {isWithinLastWeek && (
        !isExcluded && !isNewDate ? (
          // Wrap with Link only if it's a valid date and not a new default date
          <Link href={url}>
            {cardContent}
          </Link>
        ) : (
          // Render without Link for excluded dates or new default dates
          cardContent
        )
      )}
    </>
  );
};

export default WelcomeCard;
