import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default AdminLayout;
