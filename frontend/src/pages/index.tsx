import { List, PlusCircle, ArrowRight } from "lucide-react";
import "../App.css";

export function HomePage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col border my-10">
      <section id="center" className="p-10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-van-icon lucide-van"
        >
          <path d="M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3" />
          <path d="M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2" />
          <path d="M9 18h5" />
          <circle cx="16" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </svg>
        <div className="flex items-center flex-col">
          <h1 className="text-2xl">Car Management</h1>
          <p className="text-gray-600">
            Create, update, and manage your car inventory
          </p>
        </div>
      </section>

      <div className="ticks"></div>

      {/* Dashboard */}
      <section id="next-steps">
        {/* View all cars*/}
        <div id="docs">
          <div className="inline-flex p-3 rounded-sm bg-blue-100 text-blue-600 mb-3">
            <List className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Manage Cars</h2>
          <p className="text-gray-500 mt-1">
            View, edit, and remove vehicles from the database
          </p>
          <a
            href="/cars"
            className="group mt-4 inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Manage inventory
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* create a new car */}
        <div>
          <div className="inline-flex p-3 rounded-sm bg-emerald-100 text-emerald-600 mb-3">
            <PlusCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Insert New Car
          </h2>
          <p className="text-gray-500 mt-1">
            Add a new vehicle record to the database
          </p>
          <a
            href="/cars/new"
            className="group mt-4 inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
          >
            Insert car
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      <div className="ticks"></div>

      <footer className="p-10 text-center text-xs text-gray-400 border-t">
        <p>
          &copy; {new Date().getFullYear()} Car Management. Built with React.js
          + Nest.js
        </p>
      </footer>
    </div>
  );
}
