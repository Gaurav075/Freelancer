import bcrypt from "bcryptjs";

// Replace "yourPlainTextPassword" with the password you want to hash
const plainPassword = "john@@12345";

const hashPassword = async (password) => {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

hashPassword(plainPassword);
