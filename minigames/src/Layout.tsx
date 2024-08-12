import { Outlet } from "react-router-dom"



const Layout = ()=>{
    return(
        <div>
            <header className="text-center text-4xl font-bold">Minigames</header>
            <Outlet />
        </div>
    )
}

export default Layout