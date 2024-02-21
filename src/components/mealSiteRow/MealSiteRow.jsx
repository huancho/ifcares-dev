import React from 'react';
import { Table } from 'flowbite-react';
import './MealSiteRow.css';

const MealSiteRow = ({ siteData }) => {
  return (
    // if (!siteData) {
    //   return null; // You can render some loading or default content here
    // }

    <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <td className="text-left text-black text-base font-semibold leading-6 bg-[#ffffff] h-12 px-4 pl-6">
        {siteData.name}
      </td>
      <td className="text-black text-base font-semibold leading-6 bg-[#ffffff] h-12 p-4">
        {siteData.ceId}
      </td>
      <td className="text-black text-base font-semibold leading-6 bg-[#ffffff] h-12 p-4">
        {siteData.siteName}
      </td>
      <td className="text-black text-base font-semibold leading-6 bg-[#ffffff] h-12 p-4">
        {siteData.siteNumber}
      </td>
    </tr>
  );
};

export default MealSiteRow;
