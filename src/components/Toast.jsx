export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in z-50">
      {message}
    </div>
  );
}