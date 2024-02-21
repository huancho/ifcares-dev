import React from 'react';

const RequestToast = ({ type }) => {
  return (
    <div
      className={`flex items-center p-2 mb-4 ml-4 text-gray-500 bg-white rounded-lg shadow ${
        type === 'success' ? 'bg-green-100' : 'bg-red-100'
      }`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-lg">
        {type === 'success' ? (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-500 bg-green-100 rounded-lg">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
        ) : (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-red-500 bg-red-100 rounded-lg ">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
        )}
      </div>
      <div className="ml-2 text-xs font-normal">
        {type === 'success'
          ? 'Request submitted successfully.'
          : 'Request submission failed'}
      </div>
    </div>
  );
};

export default RequestToast;
