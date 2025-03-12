import { useNavigate } from "react-router"
import Banner from "./Banner"
import FeaturedProducts from "./FeaturedProducts"


const LandingPage: React.FC = ()=> {
    const navigate = useNavigate();
    return (
        <>
            <Banner/>
            <div className='text-center flex flex-col'>
                <h1 className='text-3xl text-gray-800 font-extralight p-3 mb-5'>Productos destacados</h1>
                <FeaturedProducts/>
                <a className='bg-gray-800 p-4 text-white hover:bg-gray-300 hover:text-black text-xl mt-4 transition-all duration-300' onClick={()=> navigate('/products')}>Ver más productos</a>
            </div>
        </>
    )
}

export default LandingPage