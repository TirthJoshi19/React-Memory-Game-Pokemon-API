import { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import { ScoreCard } from "./score";

export function App() {
    const [numOfCards, setNumOfCards] = useState(0);
    const [showHeading, setShowHeading] = useState(true);
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0)
    const [isFetching, setIsFetching] = useState(null)
    
    const [recentPokemons, setRecentPokemons] = useState([])

    useEffect(() => {
        fetchInitialImages();
    }, []);

    async function fetchInitialImages() {
        const promises = Array.from({ length: 7 }, fetchRandomPokemon);
        try {
            const data = await Promise.all(promises);
            const initialCards = data.map(pokemon => ({
                url: pokemon.sprites.front_default,
                name: capFirst(pokemon.name),
                type: capFirst(pokemon.types[0].type.name)
            }));
            setCards(initialCards);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchRandomPokemon() {
        setIsFetching(true)
        const pokemons = [
             "Pikachu", "Squirtle", "Charmander", "Bulbasaur", "Jigglypuff", "Meowth", "Psyduck", "Eevee", "Snorlax",
        "Gengar", "Machop", "Mankey", "Onix", "Pidgey", "Rattata", "Vulpix", "Abra", "Geodude", "Gyarados",
        "Lapras", "Magikarp", "Growlithe", "Poliwag", "Oddish", "Diglett", "Doduo", "Seel", "Grimer", "Voltorb",
        "Sandshrew", "Clefairy", "Zubat", "Ekans", "Nidoran", "Vaporeon", "Jolteon", "Flareon", "Ponyta",
        "Magnemite", "Dewgong", "Cubone", "Hitmonlee", "Hitmonchan", "Koffing", "Rhyhorn",
        "Horsea", "Staryu", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Ditto", "Aerodactyl",
        "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
        ].map(pokemon => pokemon.toLowerCase())
       
        
        
        
    
        let randomPokemon;
        do {
            randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
        
        } while(recentPokemons.includes(randomPokemon))
            setRecentPokemons([...recentPokemons.slice(-4), randomPokemon])


        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`).then(setIsFetching(false))
        setIsFetching(false)
        return response.json();
        
    }

    function capFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className="difficulty">
            {showHeading && <Heading headNumber={2} text="Select a difficulty level:" />}
            <BtnDiv setNumOfCards={setNumOfCards} setShowHeading={setShowHeading} />
            <div className="card-container">
                <Cards numOfCards={numOfCards} cards={cards} fetchRandomPokemon={fetchRandomPokemon} setCards={setCards} setScore={setScore} bestScore={bestScore}setBestScore={setBestScore} fetchInitialImages={fetchInitialImages} isFetching={isFetching} />
            </div>
            <ScoreCard score={score} bestScore={bestScore} />
        </div>
    );
}

function BtnDiv({ setNumOfCards, setShowHeading }) {
    const div = useRef(true);
    return (
        <div className="difficulty-btn-div" ref={div}>
            <DifficultyButton setNumOfCards={setNumOfCards} difficulty="Easy" num={3} setShowHeading={setShowHeading} />
            <DifficultyButton setNumOfCards={setNumOfCards} difficulty="Medium" num={5} setShowHeading={setShowHeading} />
            <DifficultyButton setNumOfCards={setNumOfCards} difficulty="Hard" num={7} setShowHeading={setShowHeading} />
        </div>
    );

    function DifficultyButton({ setNumOfCards, difficulty, num, setShowHeading }) {
        return <button onClick={handleClick}>{difficulty}</button>;

        function handleClick() {
            setNumOfCards(num);
            div.current.style.display = "none";
            setShowHeading(false);
        }
    }
}



function Cards({ numOfCards, cards, fetchRandomPokemon, setCards, setScore, bestScore, setBestScore, fetchInitialImages, isFetching}) {
    const cardRefs = useRef([]);
    const [clickedPokemon, setClickedPokemon] = useState([]);

    useEffect(() => {
        cardRefs.current.forEach((card, i) => {
            if (card) {
                card.onclick = null;
                card.onclick = ()=>{
                    if(isFetching){
                        setTimeout(() => {
                            handleCardClick(i)
                        }, 2000);
                    } else {
                        handleCardClick(i)
                    }
                } 
            }
        });
    }, [numOfCards, cards]);

    async function handleCardClick(index) {
        
       
        const clickedName = cards[index].name;

        if (clickedPokemon.includes(clickedName)) {
            alert("YOU LOSE");
            setScore(0);
            setClickedPokemon([]);
            setBestScore(bestScore);
            resetGame(setScore, setClickedPokemon, fetchInitialImages)
            
        } else {
            setClickedPokemon([...clickedPokemon, clickedName]);
            setScore((prevScore) =>{
               const scoreNow = prevScore + 1;
               if(scoreNow > bestScore){
                setBestScore(scoreNow);
                return scoreNow
               }
               return scoreNow
            } );

            // Add 'clicked' class to all cards
            cardRefs.current.forEach(card => card.classList.add("clicked"));

            setTimeout(async () => {
                const newPokemon = await fetchRandomPokemon();
                const newCard = {
                    url: newPokemon.sprites.front_default,
                    name: capFirst(newPokemon.name),
                    type: capFirst(newPokemon.types[0].type.name)
                };
                const updatedCards = cards.map((card, i) => (i === index ? newCard : card));
                setCards(updatedCards);

                // Remove 'clicked' class from all cards
                cardRefs.current.forEach(card => card.classList.remove("clicked"));
            }, 2000); // Adjust the delay as needed
        }
    }

    function capFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            {cards.slice(0, numOfCards).map((card, index) => (
                <div key={index} className={`card ${index}`} ref={el => (cardRefs.current[index] = el)}>
                    <div className="box-content">
                        <div className="box-back"></div>
                        <div className="box-front" style={{ backgroundImage: `url(${card.url})` }}>
                            <span><h4>{card.name}</h4></span>
                            <h5>{card.type} Type</h5>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
function resetGame(setScore, setClickedPokemon, fetchInitialImages){
        setScore(0);
        setClickedPokemon([]);
        fetchInitialImages();
    
}