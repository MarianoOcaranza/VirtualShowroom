import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

interface Props {
    children: ReactNode
}

const MainLayout: React.FC<Props> = (props)=> {
    return (
        <>
            <Header />
                {props.children}
            <Footer />
        </>
    )
}

export default MainLayout