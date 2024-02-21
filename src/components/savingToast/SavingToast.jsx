import React from 'react';
import { Toast } from 'flowbite-react';
import { HiCheck, HiX } from 'react-icons/hi';
import './SavingToast.css';

const SavingToast = ({ type, message }) => {
  if (type === 'success') {
    return (
      <Toast className="text-center container">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">
          Student edited successfully.
        </div>
      </Toast>
    );
  } else if (type === 'error') {
    let errorMessage =
      'Student could not be updated. Full name must be unique.';

    // Check for specific error messages
    if (message === 'Student already exists') {
      errorMessage = 'Student could not be updated. Full name must be unique.';
    }
    return (
      <Toast className="text-center container">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{errorMessage}</div>
      </Toast>
    );
  }
  return null;
};

export default SavingToast;
