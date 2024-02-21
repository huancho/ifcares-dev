import React from 'react';
import WelcomeCard from '../welcomeCard/WelcomeCard';
import './WelcomeCalendar.css';

const WelcomeCalendar = ({ siteName, siteData }) => {

  const getDatesInRange = () => {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const datesInRange = [];
    for (let date = lastWeek; date <= today; date.setDate(date.getDate() + 1)) {
      datesInRange.push(new Date(date));
    }
    return datesInRange;
  };

  const renderDates = () => {
    const validDates = Object.keys(siteData.validDates || {}).map(date => ({ date, isExcluded: false }));
    const excludedDates = (siteData.excludedDates || []).map(date => ({ date, isExcluded: true }));
    const combinedDatesSet = new Set([...validDates, ...excludedDates].map(dateObj => dateObj.date));
    const lastWeekDates = getDatesInRange();

    const allDateCards = lastWeekDates.map(date => {
      const dateString = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
      if (!combinedDatesSet.has(dateString)) {
        // Date is neither valid nor excluded
        return (
          <WelcomeCard
            key={dateString}
            date={dateString}
            siteName={siteName}
            isExcluded={false}
            isNewDate={true} // Additional prop to style new dates differently if desired
          />
        );
      }
      return null;
    });

    const validAndExcludedDateCards = [...validDates, ...excludedDates].sort((a, b) => new Date(a.date) - new Date(b.date)).map((dateObj, index) => (
      <WelcomeCard
        key={index}
        date={dateObj.date}
        siteName={siteName}
        isExcluded={dateObj.isExcluded}
      />
    ));

    // Combine and sort all cards by date
    return [...allDateCards, ...validAndExcludedDateCards].filter(Boolean).sort((a, b) => new Date(a.props.date) - new Date(b.props.date));
  };

  return (
    <div className="w-11/12 sm:w-full flex flex-col justify-center items-center lg:w-4/5 ">
      <h3 className="self-start mt-20 mb-4 font-bold text-2xl">{siteName}</h3>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">{renderDates()}</div>
    </div>
  );
};

export default WelcomeCalendar;
