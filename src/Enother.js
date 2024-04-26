import React, { useState } from "react";

const Enother = () => {
  const [lists, setList] = useState([
    { id: 1, order: 3, text: "Карточка 3" },
    { id: 2, order: 1, text: "Карточка 1" },
    { id: 3, order: 2, text: "Карточка 2" },
    { id: 4, order: 4, text: "Карточка 4" },
  ]);
  const [cards, setCards] = useState(null)

  const dragOnStart = (e, list) => {
    setCards(list)
  }

  const dragOnEnd = (e) => {
    e.target.style.backgroundColor = 'white'
  }

  const onDragOver = (e) => {
    e.preventDefault()
    e.target.style.backgroundColor = 'lightgrey'
  };

  const dropHandler = (e, list) => {
    e.preventDefault()
    setList(lists.map(c => {
        if (c.id === list.id) { //TODO усли id равны то меняем порядок карточек но ничего не изменяется 
          return {...c, order: cards.order} 
        }
        if (c.id === cards.id) {
          return {...c, order: list.order}
        }
        return c;
      }))
    e.target.style.backgroundColor = 'white'
  }

  const sort = (a, b) => {
    if (a.order > b.order) {
        return 1
    }else {
        return -1
    }
  }

  return (
    <div className='app'>
      {lists.sort(sort).map((list) => (
        <div
          className="card"
          key={list.id}
          onDragStart={(e) => dragOnStart(e, list)}
          onDragLeave={(e) => dragOnEnd(e)}
          onDragEnd={(e) => dragOnEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => dropHandler(e, list)}
          draggable={true}
        >
          {list.text}
        </div>
      ))}
    </div>
  );
};

export default Enother;
