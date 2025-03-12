import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Header: React.FC = ()=> {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className='bg-black p-4 sticky z-1 top-0 text-white'>
            <div className='container mx-auto flex justify-between items-center'>
                <a className="flex gap-3 items-center cursor-pointer" onClick={()=> navigate('/')}>
                    <img src='/logo.png' alt="icon" className='w-20 object-cover'/>
                    <p>Empty</p>
                </a>
                <button className='md:hidden text-xl cursor-pointer' onClick={()=> setIsOpen(!isOpen)}>
                    {isOpen ? 'x' : '☰'}
                </button>
                <ul className='hidden md:flex space-x-4'>
                    <li onClick={()=> navigate('/')} className={`p-4 transition-all cursor-pointer duration-300 ${location.pathname=='/' ? 'text-indigo-300' : ''} hover:text-indigo-500`}>Inicio</li>
                    <li onClick={()=> navigate('/products')} className={`p-4 transition-all cursor-pointer duration-300 ${location.pathname=='/products' ? 'text-indigo-300' : ''} hover:text-indigo-500`}>Productos</li>
                    <li onClick={()=> navigate('/about')} className={`p-4 transition-all cursor-pointer duration-300 ${location.pathname=='/about' ? 'text-indigo-300' : ''} hover:text-indigo-500`}>Sobre Empty</li>

                </ul>                
            </div>
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                <ul className='flex flex-col items-center p-4 space-y-2'>
                    <li onClick={()=> navigate('/')} className={`p-2 pr-4 pl-4 cursor-pointer hover:text-indigo-500 transition-all duration-300 ${location.pathname=='/' ? 'text-indigo-300' : ''}`}>Inicio</li>
                    <li onClick={()=> navigate('/products')} className={`p-2 pr-4 pl-4 cursor-pointer hover:text-indigo-500 transition-all duration-300 ${location.pathname=='/products' ? 'text-indigo-300' : ''}`}>Productos</li>
                    <li onClick={()=> navigate('/about')} className={`p-2 pr-4 pl-4 cursor-pointer hover:text-indigo-500 transition-all duration-300 ${location.pathname=='/about' ? 'text-indigo-300' : ''}`}>Sobre Empty</li>
                </ul>           
            </div>         
        </nav>
    );
}

export default Header