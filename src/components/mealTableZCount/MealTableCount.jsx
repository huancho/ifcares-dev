import React from 'react';
import { Table } from 'flowbite-react';
import MealTableCountRow from '../mealTableZCountRow/MealTableCountRow';
import './MealTableCount.css';

const MealTableCount = ({
  attendanceCount,
  breakfastCount,
  lunchCount,
  snackCount,
  supperCount,
}) => {
  return (
    <table className="w-full text-left">
      <thead className="p-6">
        <tr>
          <th className="uppercase text-black md:text-sm lg:text-base font-semibold leading-relaxed md:max-w-[140px] bg-[#6BE3A3] border-b-2 border-[#CACACA] p-4 pl-6 w-1/4">
            Total Program Participants
          </th>
          <th className="uppercase text-black md:text-sm lg:text-base font-semibold leading-relaxed md:max-w-[140px] bg-[#6BE3A3] border-b-2 border-[#CACACA] p-4 pl-6">
            Total breakfasts
          </th>
          <th className="uppercase text-black md:text-sm lg:text-base font-semibold leading-relaxed md:max-w-[140px] bg-[#6BE3A3] border-b-2 border-[#CACACA] p-4 pl-6">
            Total lunches
          </th>
          <th className="uppercase text-black md:text-sm lg:text-base font-semibold leading-relaxed md:max-w-[140px] bg-[#6BE3A3] border-b-2 border-[#CACACA] p-4 pl-6">
            Total snacks
          </th>
          <th className="uppercase text-black md:text-sm lg:text-base font-semibold leading-relaxed md:max-w-[140px] bg-[#6BE3A3] border-b-2 border-[#CACACA] p-4 pl-6">
            Total suppers
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        <MealTableCountRow
          attendanceCount={attendanceCount}
          breakfastCount={breakfastCount}
          lunchCount={lunchCount}
          snackCount={snackCount}
          supperCount={supperCount}
        />
      </tbody>
    </table>
  );
};

export default MealTableCount;
