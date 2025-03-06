const AboutPage: React.FC = ()=> {
    return (
        <div className="flex flex-col lg:max-w-1/2 mx-auto justify-center items-center mt-3 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Puntos de encuentro</h1>
        <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-center">
                <span className="mr-2">📍</span> Línea Sarmiento (cualquier estación)
            </li>
            <li className="flex items-center">
                <span className="mr-2">📍</span> Línea Mitre (estación Retiro)
            </li>
            <li className="flex items-center">
                <span className="mr-2">📍</span> Shopping Abasto
            </li>
            <li className="flex items-center">
                <span className="mr-2">📍</span> Obelisco
            </li>
            <li className="flex items-center">
                <span className="mr-2">📍</span> Mariano Acosta (totalmente gratis)
            </li>
        </ul>
    
        <h3 className="font-bold text-2xl text-gray-800 mb-4">Horarios de puntos de encuentro:</h3>
        <p className="text-lg text-gray-700 mb-4">10 am hasta 18 pm ¡SIN EXCEPCIÓN!</p>
        <p className="text-gray-600 mb-6 text-center">
            Por favor, es importante que respeten los horarios de punto de encuentro porque no solo me atraso yo, sino a más personas después de la entrega del producto.
        </p>
    
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Medios de contacto</h1>
        <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-center">
                <span className="mr-2">📧</span> Email:<a href="mailto:comunicadoempty@gmail.com" className="text-blue-500 hover:underline"> comunicadoempty@gmail.com</a>
            </li>
            <li className="flex items-center">
                <span className="mr-2">📸</span> Instagram:<a href="https://instagram.com/_clothesempty" className="text-blue-500 hover:underline" target='_blank' rel='noopener noreferrer'> @_clothesempty</a>
            </li>
        </ul>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">¿Cómo realizo una compra?</h1>
        <div className="space-y-4 text-gray-700">
            <p>Desde la sección de productos, podés seleccionar el producto que te interese</p>
            <p>Desde allí, vas a ver un botón de 'Consultar por el producto!'</p>
            <p>Ese botón te redireccionará al chat de Instagram con Empty, donde podrás coordinar la venta</p>
        
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Preguntas frecuentes</h1>
        <div className="space-y-4 text-gray-700">
            <div>
                <h2 className="font-bold text-xl">¿Formas de pago?</h2>
                <p>Transferencias + 5% IVA o efectivo.</p>
            </div>
            <div>
                <h2 className="font-bold text-xl">¿Nuestros talles?</h2>
                <p>Prendas de talle único.</p>
            </div>
        </div>
    </div>
    )
}


export default AboutPage;