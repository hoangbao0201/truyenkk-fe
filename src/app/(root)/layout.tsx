import Footer from "@/components/Partials/Footer";
import Header from "@/components/Partials/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>  
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
