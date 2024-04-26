import { useState } from "react";

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 3, text: "Карточка 3" },
    { id: 2, order: 1, text: "Карточка 1" },
    { id: 3, order: 2, text: "Карточка 2" },
    { id: 4, order: 4, text: "Карточка 4" },
  ]);
  const [currentCard, setCurrentCard] = useState(null) // TODO стайт для изменения мест карточек

  const dragStartHandler = (e, card) => { // TODO: функция срабатывает когда хочешь переташить каточку
    setCurrentCard(card)
  }

  const dragEndHandler = (e) => { 
    e.target.style.backgroundColor = 'white'
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'lightgrey';
  }

  const dropHandler = (e, card) => { // TODO: функция срабатывает когда отпустил карточку
    e.preventDefault();
    setCardList(cardList.map(c => {
      if (c.id === card.id) { //TODO усли id равны то меняем порядок карточек но ничего не изменяется 
        return {...c, order: currentCard.order} 
      }
      if (c.id === currentCard.id) {
        return {...c, order: card.order}
      }
      return c;
    }))
    e.target.style.backgroundColor = 'white'
  }

  const sortCards = (a, b) => { // TODO сартировка карточек
    if (a.order > b.order) {
      return 1;
    }else {
      return -1
    }
  }

  return (
    <div className="app">
      {cardList.sort(sortCards).map((card) => (
        <div
          key={card.id}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
          draggable={true} // TODO переташивания корточки
          className="card"
        >
          {card.text}
        </div>
      ))}
    </div>
  );
}

export default App;
