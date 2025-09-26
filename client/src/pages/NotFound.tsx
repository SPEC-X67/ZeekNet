export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">404 - Page not found</h1>
        <p className="text-gray-600">The page you are looking for does not exist.</p>
        <p className="mt-4"><a href="/" className="text-blue-600 underline">Go to Home</a></p>
      </div>
    </div>
  )
}
