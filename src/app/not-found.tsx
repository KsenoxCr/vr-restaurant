import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex fixed inset-0 flex-col justify-center items-center text-white background bg-neutral-700">
      <h1 className="text-3xl font-bold">404</h1>
      <h1 className="text-lg font-bold">Page not found</h1>
      <Link
        href="/"
        className="py-3 px-5 mt-10 text-white bg-green-600 rounded-lg transition-colors active:bg-green-700 disabled:bg-neutral-400"
      >
        Back to Home
      </Link>
    </div>
  );
}
