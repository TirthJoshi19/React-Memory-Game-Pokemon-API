export function ScoreCard(props){

    return (
        <div className="score-div" style={{display: props.display}}>
            <div>Score: {props.score}</div>
            <div>Best Score: {props.bestScore}</div>
        </div>
    )
}