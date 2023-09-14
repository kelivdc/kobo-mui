import { NextAuthProvider } from "@/components/Provider";

export const metadata = {
  title: "CMS",
};
export default function DashboardLayout({ children }) {
  return (
    <>
      <NextAuthProvider>{children}</NextAuthProvider>
    </>
  );
}
