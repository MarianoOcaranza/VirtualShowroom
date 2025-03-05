const Banner: React.FC = ()=> {
    return (
        <>
        <div className='relative w-full md:h-[400px] h-[500px]'>
            <div
                className="absolute inset-0 md:bg-contain bg-cover bg-center"
                style={{
                    backgroundImage: "url('bannertest.webp')",
                }}/>
        
            <div className='absolute inset-0 bg-black opacity-70'/>

            <div className='relative flex flex-col items-center justify-center h-full text-center text-white px-4'>
                <h1 className='lg:text-3xl text-2xl font-bold'>Bienvenido a Empty</h1>
                <p className='lg:text-xl mb-4'>¡Volvimos con novedades! Ahora podés consultar por todos los productos directamente desde nuestra web.</p>     
                <a href='/products' className='p-4 bg-white text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>Ver productos</a>
                <a href='/about' className='p-2 mt-5 underline text-white hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>Consultas</a>
                <div className='absolute bottom-0 left-0 text-xs'>
                    <p>AI generated image using ChatGPT</p>
                </div>
                
            </div>
        </div>
        </>
    )
}


export default Banner