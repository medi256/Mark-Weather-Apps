import Navbar from "./Navbar/Navbar.jsx";

const Layout = ({ children }) => {
    return (
        <section>
            <Navbar />
            <main>{children}</main>
        </section>
    );

};

export default Layout;