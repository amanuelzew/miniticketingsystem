import { Link } from "react-router"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="/">
          <span className="font-bold text-lg">TicketDesk</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/signup">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Welcome to TicketDesk Support
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Get help with your issues by creating a support ticket. Our team will respond as soon as possible.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  to="/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6">
        <p className="text-xs text-gray-500">© 2025 TicketDesk. All rights reserved.</p>
      </footer>
    </div>
  )
}

