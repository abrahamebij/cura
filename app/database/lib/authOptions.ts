import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Patient from "../models/Patient";

interface Credentials {
  email: string;
  password: string;
}

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) throw new Error("Missing credentials");

        const { email, password } = credentials;

        const patient = await Patient.findOne({ email });
        if (!patient) {
          throw new Error("Patient does not exist");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          patient.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: patient._id.toString(),
          email: patient.email,
          name: patient.name,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
