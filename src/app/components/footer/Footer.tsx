"use client";

const Footer = () => {
    return (
        <>
        <footer className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
            <p className="text-sm">&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
            <ul className="flex space-x-4">
            <li>
                <a
                href="#"
                className="hover:text-yellow-300 transition duration-300 text-sm"
                >
                Privacy Policy
                </a>
            </li>
            <li>
                <a
                href="#"
                className="hover:text-yellow-300 transition duration-300 text-sm"
                >
                Terms of Service
                </a>
            </li>
            </ul>
        </div>
        </footer>
        </>
    )
}

export default Footer;