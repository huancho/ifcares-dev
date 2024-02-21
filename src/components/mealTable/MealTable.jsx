import { Table } from 'flowbite-react';
import MealTableRow from '../mealTableRow/MealTableRow';
import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import MealTableCount from '../mealTableZCount/MealTableCount';
import './MealTable.css';
import dayjs from 'dayjs';
//date select
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//time select
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MealSiteContext } from '../mealSiteProvider/MealSiteProvider';
import axios from 'axios';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const MealTable = () => {
  const {
    studentData,
    selectedSite,
    lastTimeIn,
    lastTimeOut,
    datesBySite,
    selectedDate,
    setSelectedDate,
    selectedDateCache,
    setSelectedDateCache,
    selectedTime1,
    setSelectedTime1,
    selectedTime2,
    setSelectedTime2,
    globalCounts,
    dateError,
    setDateError,
    time1Error,
    setTime1Error,
    time2Error,
    setTime2Error,
    handleNextClick,
    dateValidationError,
    setDateValidationError,
    topRef,
  } = useContext(MealSiteContext);

  const validStudentData = Array.isArray(studentData) ? studentData : [];
  // const [isLoading, setIsLoading] = useState(false);

  // const minTime = dayjs().hour(8).minute(5).second(0).millisecond(0);
  // const maxTime = dayjs().hour(19).minute(0).second(0).millisecond(0);
  // console.log(datesBySite);

  useEffect(() => {
    if (lastTimeIn) {
      const timeInFormatted = formatTimeForPicker(lastTimeIn);
      setSelectedTime1(timeInFormatted);
      // console.log(timeInFormatted);
    }
    if (lastTimeOut) {
      const timeOutFormatted = formatTimeForPicker(lastTimeOut);
      setSelectedTime2(timeOutFormatted);
      // console.log(timeOutFormatted);
    }
  }, [lastTimeIn, lastTimeOut]);

  function formatTimeForPicker(dateTimeStr) {
    // Extract the time part using a regular expression
    const timeMatch = dateTimeStr.match(/\d{2}:\d{2}:\d{2}/);
    if (!timeMatch) return null;

    let [hours, minutes] = timeMatch[0].split(':').map(Number);

    // Create a dayjs object with the time, assuming the date is today
    const date = dayjs().hour(hours).minute(minutes).second(0);

    return date;
  }

  // post request with the dates
  // const postSelectedDate = async (date) => {
  //   setIsLoading(true);
  //   if (selectedSite && date) {
  //     setSelectedDate(date);

  //     const formattedDate = date.toISOString(); // Format the date

  //     // console.log(formattedDate);
  //     // console.log(selectedSite);

  //     const dataObject = {
  //       actionType: 'dates', // Set the action type for your API
  //       values: {
  //         site: selectedSite,
  //         date: formattedDate,
  //       },
  //     };

  //     const PROXY_URL = 'https://happy-mixed-gaura.glitch.me/';
  //     const gasUrl =
  //       'https://script.google.com/macros/s/AKfycbxwfq6r4ZHfN6x66x2Ew-U16ZWnt0gfrhScaZmsNpyKufbRj2n1Zc3UH8ZEFXbA-F8V/exec';

  //     try {
  //       const response = await axios.post(
  //         PROXY_URL + gasUrl,
  //         JSON.stringify(dataObject),
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'x-requested-with': 'XMLHttpRequest',
  //           },
  //         }
  //       );

  //       // Handle the response
  //       if (response.data.result === 'error') {
  //         // console.log('Error Response:', response.data.message);
  //         setDateValidationError(response.data.message);
  //       } else {
  //         // console.log('no error', response.data.array);
  //         setDateValidationError('');
  //       }
  //     } catch (error) {
  //       // Handle errors
  //       console.error(error);
  //       setDateValidationError('Error occurred while validating the date');
  //     }
  //   }
  //   setIsLoading(false);
  // };

  const shouldDisableDate = (date) => {
    if (!selectedSite || !datesBySite[selectedSite]) {
      // If no site is selected or if there's no data for the selected site
      return false; // Do not disable any dates
    }

    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const validDatesForSite = Object.keys(datesBySite[selectedSite].validDates);
    return !validDatesForSite.includes(formattedDate);
  };

  useEffect(() => {
    if (selectedDate !== selectedDateCache) {
      setSelectedDateCache(selectedDate);
    }
  }, [selectedDate]);

  return (
    <>
      <div ref={topRef}></div>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="uppercase text-left text-black text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] p-4 pl-6">
              Date
            </th>
            <th className="uppercase text-left text-black text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] p-4 pl-6">
              In
            </th>
            <th className="uppercase text-left text-black text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] p-4 pl-6">
              Out
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <td className="bg-[#FFFFFF] p-6 pl-6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div
                        className={
                          dateError || dateValidationError
                            ? 'border border-[#EA4336] rounded-md'
                            : ''
                        }
                      >
                        <DatePicker
                          className="w-full"
                          value={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                            setDateError(false); // reset error when a date is selected
                            // postSelectedDate(date); // Make the POST request with the new date
                          }}
                          shouldDisableDate={shouldDisableDate}
                          required
                          error={Boolean(dateValidationError)}
                          helperText={dateValidationError}
                          disableFuture
                          disabled={!datesBySite[selectedSite]}
                        />
                      </div>
                      {(dateError || dateValidationError) && (
                        <span style={{ color: '#EA4336' }}>
                          {dateValidationError || 'Date is required'}
                        </span>
                      )}
                    </div>
                    {/* {isLoading && (
                      <div  className='ml-4'>
                        <LoadingSpinner />
                      </div>
                    )} */}
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </td>
            <td className="bg-[#FFFFFF] p-6 pl-6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <div className="flex flex-col">
                    <div
                      className={
                        time1Error ? 'border border-[#EA4336] rounded-md' : ''
                      }
                    >
                      <TimePicker
                        className="w-full"
                        value={selectedTime1}
                        onChange={(time) => {
                          setSelectedTime1(time);
                          setTime1Error(false); // reset error when a time is selected
                        }}
                        required
                        // minTime={minTime}
                        // maxTime={maxTime}
                      />
                    </div>
                    {time1Error && (
                      <span style={{ color: '#EA4336' }}>
                        Time In is required
                      </span>
                    )}
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </td>
            <td className="bg-[#FFFFFF] p-6 pl-6">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <div className="flex flex-col">
                    <div
                      className={
                        time2Error ? 'border border-[#EA4336] rounded-md' : ''
                      }
                    >
                      <TimePicker
                        className="w-full"
                        value={selectedTime2}
                        onChange={(time) => {
                          setSelectedTime2(time);
                          setTime2Error(false); // reset error when a time is selected
                        }}
                        required
                        // minTime={minTime}
                        // maxTime={maxTime}
                      />
                    </div>
                    {time2Error && (
                      <span style={{ color: '#EA4336' }}>
                        Time Out is required
                      </span>
                    )}
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <table className="w-full">
        <thead className="p-6">
          <tr>
            <th className="uppercase text-black md:text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] px-4 pl-6">
              #
            </th>
            <th className="uppercase text-black md:text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] p-4 pl-6 text-left">
              Name of Participant
            </th>
            <th className="uppercase text-black md:text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] w-[150px] p-4">
              At
            </th>
            <th className="uppercase text-black md:text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] w-[150px] p-4">
              Brk
            </th>
            <th className="uppercase text-black md:text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] w-[150px] p-4">
              Lu
            </th>
            <th className="uppercase text-black md:text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] w-[150px] p-4">
              Snk
            </th>
            <th className="uppercase text-black md:text-base font-semibold leading-relaxed bg-[#C7F4DC] border-b-2 border-[#CACACA] w-[150px] p-4">
              Sup
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {validStudentData.map((student) => (
            <MealTableRow
              student={student}
              selectedSite={selectedSite}
              selectedDate={selectedDate}
              datesBySite={datesBySite}
              key={student.id}
            />
          ))}
        </tbody>
      </table>
      <br />

      <MealTableCount
        attendanceCount={globalCounts.attendance}
        breakfastCount={globalCounts.breakfast}
        lunchCount={globalCounts.lunch}
        snackCount={globalCounts.snack}
        supperCount={globalCounts.supper}
      />
      <br />
      <div className='w-full flex justify-end'>
        <button
          className='text-black font-bold bg-[#46DC8C] text-sm'
          style={{
            borderRadius: '13px',
            minWidth: '140px',
            minHeight: '40px',
            boxShadow: 'none',
            marginBottom: '100px',
            marginTop: '10px',
          }}
          onClick={() => handleNextClick(validStudentData)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MealTable;
