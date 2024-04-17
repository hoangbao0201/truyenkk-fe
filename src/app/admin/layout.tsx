import AdminLayout from "@/components/Layouts/AdminLayout";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);

    if (!session || (session?.user.role.roleName !== "admin")) {
        redirect('/');
    }

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
};

export default Layout;
