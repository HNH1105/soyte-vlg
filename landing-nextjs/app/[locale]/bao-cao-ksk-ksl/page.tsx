
"use client";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M10.29 3.86l-8.18 14a2 2 0 001.73 3h16.32a2 2 0 001.73-3l-8.18-14a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        {/* Nội dung */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Chức năng đang được thực hiện
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
          Chức năng này hiện đang trong quá trình xây dựng và hoàn thiện.
          <br />
          Vui lòng quay lại sau.
           <br />
          SỞ Y TẾ VĨNH LONG
               <br />
        </p>
      </div>
    </div>
  );
}

