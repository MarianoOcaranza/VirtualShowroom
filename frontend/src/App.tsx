import { Routes, Route } from "react-router"
import MainLayout from "./pageLayout/MainLayout"
import ProductsPage from "./ProductsPage/ProductsPage"
import ProductDetail from "./ProductsPage/ProductDetail"
import LandingPage from "./LandingPage/LandingPage"
import AdminPanel from "./AdminPage/AdminPanel"
import Login from './AdminPage/Login.tsx'
import EditProduct from "./AdminPage/EditProduct.tsx"

const App: React.FC = ()=> {
  return (
    <>
    <MainLayout>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/edit/:id" element={<EditProduct/>}/>
      </Routes>
    </MainLayout>
    </>
  )
}

export default App
