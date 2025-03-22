import NextAuth from "next-auth";
import authOptions from "../../../database/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
