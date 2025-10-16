/**
 * @page HomePage
 * @summary Welcome page for TODO List application
 * @domain core
 * @type page-component
 * @category home
 */

export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to TODO List App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Organize your tasks efficiently with our simple and powerful task management system.
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
          <p className="text-gray-600">
            The application is ready to receive feature implementations. Start by creating your
            first task!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
