import React, { useContext, useMemo, useEffect } from 'react';
import { Checkbox, Table } from 'flowbite-react';
import './MealTableRow.css';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';

const MealTableRow = ({ student, selectedSite, selectedDate, datesBySite }) => {
  const {
    selectedCheckboxData,
    handleCheckboxChange,
    updateGlobalCount,
    selectedDateCache,
  } = useContext(MealSiteContext);

  const checkboxState = selectedCheckboxData[student.id] || {
    attendance: false,
    breakfast: false,
    lunch: false,
    snack: false,
    supper: false,
  };

  // format date from js object to string
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Add this function to get the meal availability for the selected date and site
  const mealAvailability = useMemo(() => {
    const formattedDate = formatDate(selectedDate); // Format the selected date
    const siteData = datesBySite[selectedSite];
    return siteData?.validDates[formattedDate] || {};
  }, [selectedSite, selectedDate, datesBySite]);

  const handleLocalCheckboxChange = (category, checked) => {
    // If trying to update attendance, always allow
    if (category === 'attendance') {
      // Update the state for attendance checkbox
      updateCheckboxState(category, checked);
      // If attendance is unchecked, reset all other checkboxes
      if (!checked) {
        const resetCheckboxState = {
          attendance: false,
          breakfast: false,
          lunch: false,
          snack: false,
          supper: false,
        };
        handleCheckboxChange(student.id, resetCheckboxState);
        updateGlobalCountsBasedOnAttendance(checkboxState, resetCheckboxState);
      }
    } else {
      // For other categories, check if attendance is true
      if (checkboxState.attendance) {
        updateCheckboxState(category, checked);
      }
    }
  };

  const updateCheckboxState = (category, checked) => {
    const newCheckboxState = {
      ...checkboxState,
      [category]: checked,
    };
    handleCheckboxChange(student.id, newCheckboxState);
    updateGlobalCount(category, checked);
  };

  const updateGlobalCountsBasedOnAttendance = (
    previousCheckboxState,
    resetCheckboxState
  ) => {
    // Loop through each category except 'attendance'
    ['breakfast', 'lunch', 'snack', 'supper'].forEach((category) => {
      // Check if the checkbox was previously checked
      if (previousCheckboxState[category]) {
        // Decrement the global count only if it was checked
        updateGlobalCount(category, false);
      }
    });
  };

  // // Update the local state
  // setCheckboxState(updatedCheckboxState);

  // // Pass the updated state to the parent component
  // onCheckboxChange(student.number, updatedCheckboxState);

  useEffect(() => {
    if (selectedDate !== selectedDateCache) {
      // Reset the checkbox state when the selected date changes
      const resetCheckboxState = {
        attendance: false,
        breakfast: false,
        lunch: false,
        snack: false,
        supper: false,
      };
      handleCheckboxChange(student.id, resetCheckboxState);
    }
  }, [selectedDate]);

  return (
    <tr>
      <td className="text-black text-base leading-relaxed bg-[#FFFFFF] p-4 text-center">
        {student.number}
      </td>
      <td className="text-black text-base font-medium leading-relaxed bg-[#FFFFFF] p-4 pl-6 text-left">
        {student.name}
      </td>

      <td className="bg-[#FFFFFF] w-[150px] text-center">
        {/* <input
          type="checkbox"
          checked={checkboxState.attendance}
          className="checkbox checkbox-lg checkbox-primary"
          onChange={(event) =>
            handleLocalCheckboxChange('attendance', event.target.checked)
          }
        /> */}
        <Checkbox
          className="green-checkbox"
          style={{accentColor: '#6BE3A3'}}
          checked={checkboxState.attendance}
          onChange={(event) =>
            handleLocalCheckboxChange('attendance', event.target.checked)
          }
          disabled={selectedDate === null ? true : false}
        />
      </td>
      <td className="bg-[#FFFFFF] w-[150px] text-center">
        <Checkbox
          className="green-checkbox"
          style={{accentColor: '#6BE3A3'}}
          checked={checkboxState.breakfast}
          onChange={(event) =>
            handleLocalCheckboxChange('breakfast', event.target.checked)
          }
          disabled={!checkboxState.attendance || !mealAvailability.brk}
        />
      </td>
      <td className="bg-[#FFFFFF] w-[150px text-center">
        <Checkbox
          className="green-checkbox"
          style={{accentColor: '#6BE3A3'}}
          checked={checkboxState.lunch}
          onChange={(event) =>
            handleLocalCheckboxChange('lunch', event.target.checked)
          }
          disabled={!checkboxState.attendance || !mealAvailability.lunch}
        />
      </td>
      <td className="bg-[#FFFFFF] w-[150px] text-center">
        <Checkbox
          className="green-checkbox"
          style={{accentColor: '#6BE3A3'}}
          checked={checkboxState.snack}
          onChange={(event) =>
            handleLocalCheckboxChange('snack', event.target.checked)
          }
          disabled={!checkboxState.attendance || !mealAvailability.snk}
        />
      </td>
      <td className="bg-[#FFFFFF] w-[150px] text-center">
        <Checkbox
          className="green-checkbox"
          style={{accentColor: '#6BE3A3'}}
          checked={checkboxState.supper}
          onChange={(event) =>
            handleLocalCheckboxChange('supper', event.target.checked)
          }
          disabled={!checkboxState.attendance || !mealAvailability.sup}
        />
      </td>
    </tr>
  );
};

export default MealTableRow;
