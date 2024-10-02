const cards = document.querySelectorAll(".card")
const columns = document.querySelectorAll(".column_cards")

let draggedCard;

const dragStart = (event)=>{
    draggedCard = event.target;
    console.log(draggedCard);
    event.dataTransfer.effectAllowed = "move";
}
const dragOver=(event)=>{
    event.preventDefault();
}

const dragEnter = ({target})=>{
    if(target.classList.contains("column_cards")){
        target.classList.add("column_highlight")
    }
}

const dragLeave = ({target})=>{
    target.classList.remove("column_highlight")
}
const drop = ({target})=>{
    if(target.classList.contains("column_cards")){
        target.classList.remove("column_highlight")
        target.append(draggedCard)
    }
}
const createCard = ({target})=>{
    if(!target.classList.contains("column_cards"))return;

    const card = document.createElement("section");
    card.className = 'card';
    card.draggable= 'true';
    card.contentEditable = 'true';

    card.addEventListener('focusout',()=>{
        card.contentEditable ='false';
        if(!card.textContent) card.remove();
    })

    card.addEventListener('dragstart', dragStart);
    target.append(card);

    card.focus();
}

cards.forEach((card)=>{
    card.addEventListener("dragstart", dragStart)
})

columns.forEach((column)=>{
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener('dblclick', createCard);
})