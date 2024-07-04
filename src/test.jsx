import { useEffect, useRef, useState } from "react";
import Heading from "./Heading";

export function App() {
    const [numOfCards, setNumOfCards] = useState(0);
    const [showHeading, setShowHeading] = useState(true);
    const [urlArray, setUrlArray] = useState([]);
    
    useEffect(() => {
        fetchImages();
    }, []);

    async function fetchImages() {
        const promises = [];
        for (let i = 0; i < 6; i++) {
            const randomPokemon = random();
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`));
        }
        
        try {
            const responses = await Promise.all(promises);
            const data = await Promise.all(responses.map((res) => res.json()));
            
            const urls = data.map((pokemon) => pokemon.sprites.front_default);
            setUrlArray(urls);
        } catch (err) {
            console.error(err);
        }
    }

    function random() {
        const randomPokemons = ['pikachu', 'charizard', 'squirtle', 'meowth', 'raichu'];
        return randomPokemons[Math.floor(Math.random() * randomPokemons.length)];
    }

    return (
        <div className="difficulty">
            {showHeading && <Heading headNumber={2} text='Select a difficulty level:' />}
            <BtnDiv setNumOfCards={setNumOfCards} setShowHeading={setShowHeading} />
            <div className="card-container">
                <Cards numOfCards={numOfCards} urlArray={urlArray} />
            </div>
        </div>
    );
}

function BtnDiv({ setNumOfCards, setShowHeading }) {
    const div = useRef(true);
    return (
        <div className="difficulty-btn-div" ref={div}>
            <DifficultyButton setNumOfCards={setNumOfCards} difficulty='Easy' num={3} setShowHeading={setShowHeading} />
            <DifficultyButton setNumOfCards={setNumOfCards} difficulty='Medium' num={5} setShowHeading={setShowHeading} />
            <DifficultyButton setNumOfCards={setNumOfCards} difficulty='Hard' num={7} setShowHeading={setShowHeading} />
        </div>
    );

    function DifficultyButton({ setNumOfCards, difficulty, num, setShowHeading }) {
        return <button onClick={handleClick}>{difficulty}</button>;

        function handleClick() {
            setNumOfCards(num);
            div.current.style.display = 'none';
            setShowHeading(false);
        }
    }
}

function Cards({ numOfCards, urlArray }) {
    const cardRefs = useRef([]);

    useEffect(() => {
        cardRefs.current.forEach(card => {
            if (card) {
                card.classList.add('pokecard');
            }
        });
    }, [numOfCards, urlArray]);

    return (
        <>
            {generateCards(numOfCards, urlArray, cardRefs)}
        </>
    );
}

function generateCards(numOfCards, urlArray, cardRefs) {
    if (numOfCards === 0) {
        return [];
    }
    const cards = generateCards(numOfCards - 1, urlArray, cardRefs);
    const cardStyle = {
        backgroundImage: `url(${urlArray[numOfCards - 1]})`
    };

    const cardRef = el => {
        cardRefs.current[numOfCards - 1] = el;
    };

    return [...cards, <div key={numOfCards} className={`card ${numOfCards}`} style={cardStyle} ref={cardRef}></div>];
}
