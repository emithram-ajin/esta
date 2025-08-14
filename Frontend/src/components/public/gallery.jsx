import React, { useState, useEffect } from "react";
import Breadcrumbs from "./Breadcrumbs";
const API_URL= import.meta.env.VITE_API


function Gallery() {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch gallery");
        return res.json();
      })
      .then((data) => {
        setMediaItems(data);
        if (data.length > 0) setSelectedMedia(data[0]); // Set first item as default
      })
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  // Convert YouTube URLs to embed format
  const convertToEmbedUrl = (url) => {
    const match =
      url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/) ||
      url.match(/v=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  // Get YouTube thumbnail if not provided
  const getVideoThumbnail = (url) => {
    const match =
      url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/) ||
      url.match(/v=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
    }
    return null;
  };

  return (
    <>
      <div className="py-3 md:pl-14 pl-5">
        <Breadcrumbs />
      </div>
      <div className="max-w-7xl mx-auto p-4 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Main Content */}
          {/* Main Content */}
          <div className="flex-1 lg:w-2/3 flex flex-col">
            <div className="rounded-xl overflow-hidden shadow-lg aspect-video w-full">
              {selectedMedia ? (
                selectedMedia.type === "image" ? (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={convertToEmbedUrl(selectedMedia.src)}
                    title={selectedMedia.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Loading...
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-white rounded-xl shadow-lg p-4 h-full">
              <h3 className="text-lg font-semibold mb-4 text-[#006F59] border-b pb-2">
                Gallery Items
              </h3>
              <div className="space-y-3 max-h-[500px] lg:max-h-[600px] overflow-y-auto">
                {mediaItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 border-2 ${
                      selectedMedia?._id === item._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedMedia(item)}
                  >
                    {/* Thumbnail */}
                    <div className="w-26 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                      <div className="relative w-full h-full">
                        <img
                          src={
                            item.thumbnail ||
                            (item.type === "video"
                              ? getVideoThumbnail(item.src)
                              : item.src)
                          }
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                              <div className="w-0 h-0 border-l-[6px] border-l-gray-800 border-y-[3px] border-y-transparent ml-[1px]"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Title */}
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {item.type}
                      </p>
                    </div>
                    {/* Active Indicator */}
                    {selectedMedia?._id === item._id && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;
