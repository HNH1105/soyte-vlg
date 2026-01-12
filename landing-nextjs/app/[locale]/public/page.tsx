// app/drive/page.tsx
import Link from "next/link";
import FooterSection from "~/app/zapply-components/footer";
import { VendexHeaderWithUserDropdown } from "~/app/zapply-components/menu";

export default function DrivePage() {
  return (
    <>
    < VendexHeaderWithUserDropdown/>
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Google Drive Link
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        This page contains a link that redirects you to a Google Drive file or folder.
      </p>
      <Link
        href="https://drive.google.com/drive/folders/1zG94chUz3SxM1CQnBz2MP7i4H_TDe1vb?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Open Google Drive
      </Link>
    </main>
     <FooterSection />
     </>
  );
}
