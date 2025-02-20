import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

interface Props {
    children: ReactNode
}

const MainLayout: React.FC<Props> = (props)=> {
    return (
        <>
        <div className="flex flex-col min-h-screen">
            <Header />
                <main className="flex-grow">{props.children}</main>
            <Footer />
        </div> 
        </>
    )
}

export default MainLayout