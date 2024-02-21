import React from 'react';

const FormToast = ({ type, message }) => {
  if (type === 'success') {
    return (
      <div
        id="toast-success"
        className="flex items-center p-2 mb-2 text-gray-500 bg-white rounded-lg shadow max-w-52 md:p-4"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 text-green-500 bg-green-100 rounded-lg md:w-8 md:h-8">
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-xs font-normal md:text-sm">
          Student added successfully!
        </div>
      </div>
    );
  } else if (type === 'error') {
    let errorMessage = 'Student could not be added. Try again later.';

    // Check for specific error message
    if (message === 'Student already exists') {
      errorMessage = 'Student could not be added. Full name must be unique.';
    }

    return (
      <div
        id="toast-danger"
        className="flex items-center p-2 mb-2 text-gray-500 bg-white rounded-lg shadow max-w-52 md:p-4"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 text-red-500 bg-red-100 rounded-lg md:w-8 md:h-8">
          <svg
            className="w-4 h-4 md:w-5 md:h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div className="ms-3 text-xs font-normal md:text-sm">{errorMessage}</div>
      </div>
    );
  }
  return null;
};

export default FormToast;
