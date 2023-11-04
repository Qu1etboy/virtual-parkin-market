import NextAuth from "next-auth";
import { User, CustomerProfile, Address } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      customerProfile: CustomerProfile | null;
      addresses: Address[] | null;
      accounts: {
        provider: string;
      }[];
    };
  }
}
