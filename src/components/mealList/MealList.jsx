import useIsMobile from "../../hooks/useIsMobile";
import MealTable from "../mealTable/MealTable";
import React, { useContext } from 'react';
import MealTableModal from "../mealTableModal/MealTableModal";
import MealCountMobile from "../mealCountMobile/MealCountMobile";
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';
import MealCard from "../MealCard/MealCard";
import DateTimePickerMobile from "../DateTimePickerMobile/DateTimePickerMobile"
import { Button } from '@mui/material';

const MealList = () => {
  const isMobile = useIsMobile();
  const {
    studentData,
    selectedSite,
    datesBySite,
    handleNextClick,
    isModalOpen,
    setIsModalOpen,
    formattedData,
    selectedDate,
    selectedTime1,
    selectedTime2,
  } = useContext(MealSiteContext);

  const validStudentData = Array.isArray(studentData) ? studentData : [];

  return (
    <>
      {isMobile ? (
        <>
          <DateTimePickerMobile></DateTimePickerMobile>
          <div className="p-4 bg-[#C7F4DC] text-black rounded-t-lg flex justify-between items-center mb-2">
            <span className="header-item w-1/4 px-2 py-1 font-bold"> # </span>
            <span className="header-item w-2/3 px-2 py-1 font-bold">
              {" "}
              Name of Participant{" "}
            </span>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            {validStudentData.map((student) => (
              <MealCard student={student} selectedSite={selectedSite} selectedDate={selectedDate} datesBySite={datesBySite} key={student.id} />
            ))}
          </div>
          <MealCountMobile></MealCountMobile>
          <div className="button-container my-4">
            <Button
              variant="contained"
              style={{
                color: '#000000',
                textTransform: 'capitalize',
                fontWeight: 'bold',
                backgroundColor: '#46DC8C',
                borderRadius: '13px',
                minWidth: '140px',
                minHeight: '40px',
                boxShadow: 'none',
              }}
              onClick={() => handleNextClick(validStudentData)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <MealTable studentData={studentData} selectedSite={selectedSite} />
      )}
      {isModalOpen && (
        <MealTableModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          formattedData={formattedData}
          selectedDate={selectedDate}
          selectedTime1={selectedTime1}
          selectedTime2={selectedTime2}
          selectedSite={selectedSite}
        />
      )}
    </>
  )

}

export default MealList;