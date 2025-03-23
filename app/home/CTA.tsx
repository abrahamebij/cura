import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-center">
            <span className="block">
              Ready to transform your healthcare operations?
            </span>
            <span className="block text-blue-200 mt-1">
              Experience Cura today.
            </span>
          </h2>
          <div className="mt-8 flex justify-center lg:mt-0 lg:flex-shrink-0 gap-4">
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Admin Portal
            </Link>
            <Link
              href="/patient/login"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 hover:bg-opacity-70"
            >
              Patient Portal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
