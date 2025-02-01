import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
    return(
        <div>
            <Navbar />
            <div>
                <h1 className="bg-green-300">Welcome to Freelancer Website</h1>
                {/* <Link to="/about">About</Link> */}
            </div>
        </div>
            
    )
}

export default Home;