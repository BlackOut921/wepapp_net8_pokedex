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

        //Keeps id to 3 digit numbers
        let test = currentIndex >= 100 ? "" : currentIndex >= 10 ? "0" : "00";
        //Capitalise first letter (converted to lower case for search)
        let name = (data.name).charAt(0).toUpperCase() + data.name.slice(1);
        //Change title
        txtName.innerHTML = `#${test + currentIndex} - ${name}`;
        //Change sprite image
        imgSprite.src = data.sprites.front_default;

        //Create table
        const table = document.createElement("table");
        table.classList = "table table-hover";
        const tableBody = table.createTBody(); //Add tbody

        //Get move names from JSON and sort A->Z and create rows for each
        const moveList = data.moves.map(m => m.move.name).sort();
        //Reverse for loop
        for (let r = moveList.length - 1; r > 0; r--) {
            const newRow = tableBody.insertRow(0);

            const cellId = newRow.insertCell(0);
            cellId.innerHTML = r;

            const cellName = newRow.insertCell(1);
            cellName.innerHTML = moveList[r];
        }

        const statsMovesInner = document.getElementById("statsMoves").firstElementChild;
        statsMovesInner.replaceChildren(table);
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