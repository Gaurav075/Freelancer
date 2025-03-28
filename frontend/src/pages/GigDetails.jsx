import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const GigDetails = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enlargedSample, setEnlargedSample] = useState(null);

  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice Johnson", rating: 5, comment: "Great work! Highly recommend." },
    { id: 2, name: "Mark Smith", rating: 4, comment: "Good quality, will work again!" },
    { id: 3, name: "Sophia Williams", rating: 5, comment: "Excellent service, very professional." },
    { id: 4, name: "David Brown", rating: 4, comment: "Delivered on time with great results!" }
  ]);

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://animated-engine-69v4xxvpw45355j9-5001.app.github.dev/api/gigs/${gigId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch gig details");

        const data = await response.json();
        setGig(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGigDetails();
  }, [gigId]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wide">FreelancerHub</h1>
        <button 
          onClick={() => navigate("/dashboard")}
          className="bg-gray-600 px-5 py-2 rounded-lg text-black font-bold hover:bg-gray-700 transition"
        >
          Back to Dashboard
        </button>
      </nav>

      {/* Gig Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
          {/* Left Side - Thumbnail & Work Samples */}
          <div className="md:w-2/5">
            <img
              src={gig.thumbnail}
              alt={gig.title}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />

            <h3 className="text-2xl font-bold text-blue-300 mt-6 mb-4">Work Samples</h3>
            <div className="h-64 overflow-y-auto border border-gray-700 rounded-lg p-2 space-y-2">
              {gig.workSamples?.map((sample, index) => (
                <div 
                  key={index} 
                  className="border border-gray-700 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition"
                  onClick={() => setEnlargedSample(sample)} // Open Enlarged View
                >
                  {sample.endsWith(".mp4") ? (
                    <video controls className="w-full h-40">
                      <source src={sample} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={sample} alt="Work Sample" className="w-full h-40 object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Gig Details */}
          <div className="md:w-3/5 flex flex-col">
            <h2 className="text-4xl font-extrabold text-blue-400">{gig.title}</h2>
            <p className="text-gray-400 text-lg">{gig.category}</p>
            <p className="text-green-400 font-bold text-2xl mt-2">${gig.price}</p>
            <p className="text-gray-300 mt-4 text-lg">{gig.description}</p>
            <p className="text-gray-300 mt-2 text-sm">
              <strong>Delivery Time:</strong> {gig.deliveryTime}
            </p>

            {/* Reviews Section */}
            <h3 className="text-2xl font-bold text-blue-300 mt-8">Client Reviews</h3>
            <div className="h-40 overflow-y-auto mt-4 space-y-4 border border-gray-700 rounded-lg p-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                  <p className="font-semibold text-blue-300">{review.name}</p>
                  <p className="text-yellow-400">⭐ {review.rating}/5</p>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Edit Gig Button */}
            <button
              onClick={() => navigate(`/edit-gig/${gigId}`)}
              className="mt-6 w-full bg-blue-600 px-5 py-2 text-black rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Edit Gig
            </button>
          </div>
        </div>
      </div>

      {/* Enlarged Work Sample Modal */}
      {enlargedSample && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4"
          onClick={() => setEnlargedSample(null)}
        >
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <p className="text-right text-red-500 cursor-pointer" onClick={() => setEnlargedSample(null)}>
              Close ✖
            </p>
            {enlargedSample.endsWith(".mp4") ? (
              <video controls className="w-full rounded-lg">
                <source src={enlargedSample} type="video/mp4" />
              </video>
            ) : (
              <img src={enlargedSample} alt="Enlarged Work Sample" className="w-full rounded-lg" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GigDetails;
