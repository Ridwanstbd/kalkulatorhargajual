export const Footer = () => {
  return (
    <footer className="bg-gray-600 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">
            Made with <span className="text-red-500">❤️</span>by{" "}
            <a
              href="https://www.linkedin.com/in/ridwansetiobudi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 font-extrabold hover:text-indigo-300 transition-colors duration-200"
            >
              Ridwan Setio Budi
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            © {new Date().getFullYear()} KalkuPrice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
