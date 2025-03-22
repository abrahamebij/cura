import CredentialsProvider from "next-auth/providers/credentials";
import Patient from "../models/Patient";
import bcrypt from "bcryptjs";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        const patient = await Patient.findOne({ email });
        if (!patient) {
          throw new Error("Patient does not exist");
        }
        const isPasswordValid = await bcrypt.compare(
          password,
          patient.password
        );
        console.log(patient);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return patient;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
