
interface gameCardType {
    title:string,
    children:React.ReactNode
}

const GameCard = ({title,children}:gameCardType)=>{
    return(
        <div>
            {children}
            <p>{title}</p>
        </div>
    )
}

export default GameCard
