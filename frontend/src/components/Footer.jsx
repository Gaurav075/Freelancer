import { FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Logo & About Section */}
          <div>
            <h2 className="text-2xl font-bold">Freelance Hub</h2>
            <p className="text-gray-400 mt-3">
              Connecting top freelancers with businesses worldwide. Work flexibly, get paid securely.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
            <a href="https://www.twitter.com/Gaurav007711" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
            <a href="https://www.linkedin.com/in/gaurav-gupta-097069261" className="text-gray-400 hover:text-white"><FaLinkedinIn size={20} /></a>
            <a href="https://www.instagram.com/gauravgupta7431/" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
            <a href="https://www.youtube.com/channel/UCJtTJKJ_bg7RB1ObHzKCRqw" className="text-gray-400 hover:text-white"><FaYoutube size={20} /></a>
            <a href="https://github.com/Gaurav075" className="text-gray-400 hover:text-white"><FaGithub size={20} /></a>
            </div>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} FreelancerHub. All Rights Reserved. Created by Gaurav Gupta</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  