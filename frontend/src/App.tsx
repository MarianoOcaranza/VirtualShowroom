import { Routes, Route } from "react-router"
import MainLayout from "./pageLayout/MainLayout"
import ProductsPage from "./ProductsPage/ProductsPage"

const App: React.FC = ()=> {
  return (
    <>
    <MainLayout>
      <Routes>
        <Route path='/'/>
        <Route path='/products' element={<ProductsPage/>}/>
      </Routes>
    </MainLayout>
    
    </>
  )
}

export default App
