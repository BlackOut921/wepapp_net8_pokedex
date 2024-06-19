"use strict";

//To get first 151 pokemon, use: pokemon?limit=151
//To get specific pokemon, use: pokemon/{name}

const txtName = document.getElementById("txtName");
const txtInput = document.getElementById("txtInput");
const imgSprite = document.getElementById("imgSprite");
const btnSearch = document.getElementById("btnSearch");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

let currentIndex = 1;

//##### function declarations #####

async function FetchPokemon(searchString) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon${searchString.toLowerCase()}`);

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();
        currentIndex = data.id;

        //Keeps ids to 3 digit numbers
        let test = currentIndex >= 100 ? "" : currentIndex >= 10 ? "0" : "00";
        //Capitalise first letter (converted to lower case for search)
        let name = (data.name).charAt(0).toUpperCase() + data.name.slice(1);

        //Change title
        txtName.innerHTML = `#${test + currentIndex} - ${name}`;
        //Change sprite image
        imgSprite.src = data.sprites.front_default;

        const table = document.getElementById("moveListTable");
        const moveList = data.moves; //JSON
        const m = data.moves.map(i => i.move.name).sort(); //Get names and sort
        const count = m.length; //Length

        //TABLE ROWS NEED CLEARING FIRST!!!!!

        for (let c = 0; c < count; c++) {
            //Create row
            const row = document.createElement("tr");

            //Create table cells
            const cellMoveId = document.createElement("td");
            cellMoveId.innerText = c;
            row.appendChild(cellMoveId);

            const cellMoveName = document.createElement("td");
            cellMoveName.innerText = m[c];
            row.appendChild(cellMoveName);

            table.appendChild(row);
        }
    }
    catch (e) {
        console.error(e);
    }
}

function PrevPokemon() {
    if (currentIndex <= 1) {
        return;
    }

    currentIndex--;
    FetchPokemon(`/${currentIndex}`)
}

function NextPokemon() {
    if (currentIndex >= 151) {
        return;
    }

    currentIndex++;
    FetchPokemon(`/${currentIndex}`)
}


//##### main #####

FetchPokemon(`/${currentIndex}`); //id=1

btnSearch.addEventListener("click", () => FetchPokemon("/" + txtInput.value));
btnPrev.addEventListener("click", () => PrevPokemon());
btnNext.addEventListener("click", () => NextPokemon());