export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-lg w-full">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Thank You!
        </h1>

        <p className="text-gray-600 mb-8">
          Your enquiry has been submitted successfully.
          Our team will contact you shortly.
        </p>

        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold"
        >
          Back to Home
        </a>
      </div>
    </main>
  )
}