import { useState } from "react";
import { useLocation } from "react-router";

const Header: React.FC = ()=> {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    return (
        <nav className='bg-black p-4 sticky z-1 top-0 text-white'>
            <div className='container mx-auto flex justify-between items-center'>
                <h1 className='text-xl font-bold'>Logo</h1>
                <button className='md:hidden text-xl cursor-pointer' onClick={()=> setIsOpen(!isOpen)}>
                    {isOpen ? 'x' : '☰'}
                </button>
                <ul className='hidden md:flex space-x-4'>
                    <li><a href="/" className={`p-4 transition-all duration-300 ${location.pathname=='/' ? 'text-indigo-300' : ''} hover:text-indigo-500`}>Inicio</a></li>
                    <li><a href="/products" className={`p-4 transition-all duration-300 ${location.pathname=='/products' ? 'text-indigo-300' : ''} hover:text-indigo-500`}>Productos</a></li>
                    <li><a href="/about" className={`p-4 transition-all duration-300 ${location.pathname=='/about' ? 'text-indigo-300' : ''} hover:text-indigo-500`}>Sobre Empty</a></li>
                </ul>                
            </div>
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                <ul className='flex gap-5 flex-col items-center p-4 space-y-2'>
                    <li><a href="/" className={`p-2 pr-4 pl-4 hover:text-indigo-500 transition-all duration-300 ${location.pathname=='/' ? 'text-indigo-300' : ''}`}>Inicio</a></li>
                    <li><a href="/products" className={`p-2 pr-4 pl-4 hover:text-indigo-500 transition-all duration-300 ${location.pathname=='/products' ? 'text-indigo-300' : ''}`}>Productos</a></li>
                    <li><a href="/contact" className={`p-2 pr-4 pl-4 hover:text-indigo-500 transition-all duration-300 ${location.pathname=='/about' ? 'text-indigo-300' : ''}`}>Sobre Empty</a></li>
                </ul>           
            </div>         
        </nav>
    );
}

export default Header