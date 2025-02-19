import { Routes, Route } from "react-router"
import MainLayout from "./pageLayout/MainLayout"
import ProductsPage from "./ProductsPage/ProductsPage"
import ProductDetail from "./ProductsPage/ProductDetail"

const App: React.FC = ()=> {
  return (
    <>
    <MainLayout>
      <Routes>
        <Route path='/'/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
      </Routes>
    </MainLayout>
    
    </>
  )
}

export default App
