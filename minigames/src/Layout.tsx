import { Outlet,Link } from "react-router-dom"



const Layout = ()=>{
    return(
        <div>
            
            <header className="text-center text-4xl font-bold py-8"><Link to='/'>Minigames</Link></header>
            <div  className="px-40 py-10">
                <Outlet />
            </div>

        </div>
    )
}

export default Layout