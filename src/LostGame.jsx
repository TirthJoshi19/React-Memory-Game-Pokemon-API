

export default function LostGame(props){
    return (
        <div className="lost-game" style={{display: props.display}}>
            <div className="restart-h2-container">

            <h2>You Lose!</h2>
            </div>
            <div id="restart-btn-div">

            <button className="restart-game" onClick={()=> {
                props.restartOnclick()
            }}>Restart The Game</button>
            </div>
        </div>
    )
}