import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(9);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=2&limit=100`
        );
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          console.error("Error fetching images:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;

  // Extract the first image (images[0]) as the header image
  const headerImage = images.length > 0 ? images[0] : null;

  // Create a new array excluding the first image (images[0])
  const gridImages = images.slice(1).slice(indexOfFirstImage, indexOfLastImage);

  const totalImages = images.length;
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-10">
      <NavBar />
      <div className="w-full h-full flex flex-col items-center justify-center sm400:p-10 sm300:p-10 sm600:p-10 p-16">
        {/* Display the first image as a header */}
        {headerImage && (
          <img
            src={headerImage.download_url}
            className="w-[60%]  sm600:w-[90%] sm400:w-[100%] lg1100:w-[60%] h-[10%] -mt-10 mb-8 rounded-lg shadow-md"
            alt=""
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gridImages.map((image, index) => (
            <div
              key={image.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img src={image.download_url} alt={image.author} />
            </div>
          ))}
        </div>
      </div>

      <ul className="flex justify-center space-x-4 mt-4">
        <li
          onClick={() => paginate(currentPage - 1)}
          className={`cursor-pointer ${
            currentPage === 1
              ? "text-gray-400"
              : "text-blue-500 hover:text-blue-700"
          }`}
        >
          Previous
        </li>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`cursor-pointer ${
              pageNumber === currentPage
                ? "text-blue-700 font-semibold"
                : "text-blue-500 hover:text-blue-700"
            }`}
          >
            {pageNumber}
          </li>
        ))}
        <li
          onClick={() => paginate(currentPage + 1)}
          className={`cursor-pointer ${
            currentPage === totalPages
              ? "text-gray-400"
              : "text-blue-500 hover:text-blue-700"
          }`}
        >
          Next
        </li>
      </ul>
    </div>
  );
}

export default App;
