import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import '../guest.css';

export default function GuestLayout() {
   
        const { token } = useStateContext();
        if (token) {
            return <Navigate to='/users'/>
        }

        const location = useLocation();
        function renderView() {
            if(location.pathname === '/') {
                return (
                    <>
                    <section id="home">
                    <Outlet/>
                    <h2>Home Section</h2>
                    <p>This is the home section content. Enjoy your stay!</p> 
                    </section>
                    <section id="about">
                    <h2>About Section</h2>
                    <p>This section tells you about this website.</p>
                    </section>
                    <section id="contact">
                    <h2>Contact Section</h2>
                    <p>Get in touch with us!</p>
                    </section>
                    </>
                );
                console.log('dashboard');
            } else {
                return (
                <section id="home">
                    <Outlet/>
                </section>
                );
            }
        }
        

    return (
        <>        
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>My Home Page</title>
            <link rel="stylesheet" href="styles.css" />
            <header>
                <h1>Welcome to My Home Page</h1>
                <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <a href="#about">About</a>
                    </li>
                    <li>
                    <a href="#contact">Contact</a>
                    </li>
                </ul>
                </nav>
            </header>
            <main>
                {renderView()}
            </main>
            <footer>
                <p>© 2023 My Home Page</p>
            </footer>            
        </>
    );
}