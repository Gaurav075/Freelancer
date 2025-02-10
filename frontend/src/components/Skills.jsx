import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const SkillInput = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === " " && skill.trim()) {
      e.preventDefault();
      const newSkill = skill.trim().toLowerCase();
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setSkill(""); // Clear input field
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div>
      {/* Skill Input Field */}
      <input
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press space..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Display Added Skills */}
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((s, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-full text-sm"
          >
            {s}
            <button
              type="button"
              className="ml-2 text-white bg-transparent p-1 focus:outline-none"
              onClick={() => removeSkill(s)}
            >
              <FaTimes size={3} className="text-white"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillInput;
