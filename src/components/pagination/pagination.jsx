import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';

const PaginationButton = ({ children, onClick, isCurrent }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center border-t-2 mt-2 px-4 text-sm font-medium ${
      isCurrent
        ? 'bg-indigo-500 text-white rounded-full w-8 h-8 flex justify-center items-center' // Set the width and height to make it a circle
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`}
    //   style={{
    //     lineHeight: '32px', // Adjust line height to ensure vertical centering
    //     textAlign: 'center', // Center the text horizontally
    //   }}
  >
    {children}
  </button>
);

const Pagination = ({
  studentsPerPage,
  totalStudents,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalNumberOfPages = Math.ceil(totalStudents / studentsPerPage);
  const maxPageNumberVisible = 10; // Adjust based on how many buttons you want to show
  const pageBuffer = Math.floor(maxPageNumberVisible / 2);

  let lowerLimit = currentPage - pageBuffer;
  let upperLimit = currentPage + pageBuffer;

  if (lowerLimit < 1) {
    upperLimit += 1 - lowerLimit;
    lowerLimit = 1;
  }
  if (upperLimit > totalNumberOfPages) {
    lowerLimit -= upperLimit - totalNumberOfPages;
    upperLimit = totalNumberOfPages;
  }
  lowerLimit = Math.max(lowerLimit, 1);

  for (let i = lowerLimit; i <= upperLimit; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      {/* Previous Button */}
      {
        <PaginationButton
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </PaginationButton>
      }

      {/* Page Numbers */}
      {/* Page Numbers */}
      <div className="hidden md:-mt-px md:flex">
        {currentPage > 1 + pageBuffer && (
          <>
            <PaginationButton onClick={() => paginate(1)}>1</PaginationButton>
            {currentPage > 2 + pageBuffer && <span className="px-2 flex items-center justify-center">...</span>}
          </>
        )}
        {pageNumbers.map((number) => (
          <PaginationButton
            key={number}
            onClick={() => paginate(number)}
            isCurrent={number === currentPage}
          >
            {number}
          </PaginationButton>
        ))}
        {currentPage < totalNumberOfPages - pageBuffer && (
          <>
            {currentPage < totalNumberOfPages - (1 + pageBuffer) && <span className="px-2 flex items-center justify-center">...</span>}
            <PaginationButton onClick={() => paginate(totalNumberOfPages)}>
              {totalNumberOfPages}
            </PaginationButton>
          </>
        )}
      </div>

      {/* Next Button */}
      {
        <PaginationButton
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalNumberOfPages}
        >
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </PaginationButton>
      }
    </nav>
  );
};

export default Pagination;
