import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';
import React, { useContext, useEffect } from 'react';

const MealCountMobile = () => {
  const { globalCounts, selectedDate, selectedDateCache, resetGlobalCounts } =
    useContext(MealSiteContext);

    useEffect(() => {
        if (selectedDate !== selectedDateCache) {
          resetGlobalCounts()
        }
      }, [selectedDate])

  return (
    <div className="w-full rounded-lg bg-white my-4 shadow p-4">
      <div className="flex justify-between">
        <p className="font-bold text-lg"> Total Program Participants</p>
        <p className="text-lg">{globalCounts.attendance}</p>
      </div>

      <div className="flex justify-between">
        <p className="font-bold text-lg">Total breakfasts</p>
        <p className="text-lg">{globalCounts.breakfast}</p>
      </div>

      <div className="flex justify-between">
        <p className="font-bold text-lg"> Total Lunches</p>
        <p className="text-lg">{globalCounts.lunch}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-bold text-lg">Total Snacks</p>
        <p className="text-lg">{globalCounts.snack}</p>
      </div>
      <div className="flex justify-between">
        <p className="font-bold text-lg">Total Suppers</p>
        <p className="text-lg">{globalCounts.supper}</p>
      </div>
    </div>
  );
};

export default MealCountMobile;
