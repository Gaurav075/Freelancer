import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountTypeSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');

  const handleSelection = (type) => {
    setSelected(type);
    setTimeout(() => navigate(`/setup-profile?type=${type}`), 500);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800">
      {/* Title - Centered */}
      <h1 className="text-white text-5xl font-extrabold mb-12 tracking-wide font-mono text-center">
        Choose Your Account Type
      </h1>

      {/* Box Container - Centered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full justify-center">
        {/* Freelancer Card */}
        <div
          className={`p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-300 cursor-pointer hover:scale-105 
          ${selected === "Freelancer" ? "border-4 border-green-500 scale-110" : ""}`}
          onClick={() => handleSelection("Freelancer")}
        >
          <h2 className="text-2xl font-bold text-center text-green-600">I am a Freelancer</h2>
          <p className="text-gray-600 mt-2 text-center">
            Create gigs, showcase your skills, and connect with potential clients.
          </p>
        </div>

        {/* Client Card */}
        <div
          className={`p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-300 cursor-pointer hover:scale-105 
          ${selected === "Client" ? "border-4 border-purple-500 scale-110" : ""}`}
          onClick={() => handleSelection("Client")}
        >
          <h2 className="text-2xl font-bold text-center text-purple-600">Hire a Freelancer</h2>
          <p className="text-gray-600 mt-2 text-center">
            Browse gigs, find talented freelancers, and get work done efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;
