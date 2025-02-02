import React from "react";
import { Link } from "react-router-dom";
import Benefits from "../components/Benefits";
// import {Heroimage} from "../assets/home1.png";
import Navbar from "../components/Navbar";

const Home = () => {
    return(
        <div className="w-full flex flex-col items-center mt-16">
            <Navbar />
            <div>
                <img src='/home1.png' alt="" className="w-full w-[2000px] h-[600px] mx-auto"/>
            </div>
            <Benefits />
        </div>
            
    )
}

export default Home;