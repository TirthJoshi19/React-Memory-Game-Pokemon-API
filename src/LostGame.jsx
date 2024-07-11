

export default function LostGame(props){
    return (
        <div className="lost-game" style={{display: props.display}}>
            <h2>You Lose!</h2>
            <div id="restart-btn-div">

            <button className="restart-game" onClick={()=> {
                props.restartOnclick()
            }}>Restart Game</button>
            </div>
        </div>
    )
}