import { Table } from 'flowbite-react';
import React, { useContext, useEffect } from 'react';
import './MealTableCountRow.css';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';

const MealTableCountRow = ({
  attendanceCount,
  breakfastCount,
  lunchCount,
  snackCount,
  supperCount,
}) => {
  const { globalCounts, selectedDate, selectedDateCache, resetGlobalCounts } =
    useContext(MealSiteContext); // Use context

  useEffect(() => {
    if (selectedDate !== selectedDateCache) {
      resetGlobalCounts();
    }
  }, [selectedDate]);

  return (
    <tr>
      <td className="text-black text-lg font-semibold leading-7 bg-[#ffffff] p-4 pl-6">
        {globalCounts.attendance}
      </td>
      <td className="text-black text-lg font-semibold leading-7 bg-[#ffffff] p-4 pl-6">
        {globalCounts.breakfast}
      </td>
      <td className="text-black text-lg font-semibold leading-7 bg-[#ffffff] p-4 pl-6">
        {globalCounts.lunch}
      </td>
      <td className="text-black text-lg font-semibold leading-7 bg-[#ffffff] p-4 pl-6">
        {globalCounts.snack}
      </td>
      <td className="text-black text-lg font-semibold leading-7 bg-[#ffffff] p-4 pl-6">
        {globalCounts.supper}
      </td>
    </tr>
  );
};

export default MealTableCountRow;
