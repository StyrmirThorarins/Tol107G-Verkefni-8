const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;    
            
    items.querySelectorAll('.item').forEach(element => {
      element.querySelector('.item__checkbox').addEventListener('change', finish);
      element.querySelector('.item__text').addEventListener('click', edit);
      element.querySelector('.item__button').addEventListener('click', deleteItem);      
    });

    document.querySelector('.form__button').addEventListener('click', add);
    document.addEventListener('keypress', commit);

    _form.addEventListener('submit', formHandler);
  }

  function formHandler(e) {
    e.preventDefault();

    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentElement.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {    
    let content = e.target.innerHTML;    

    let textBox = document.createElement("input");
    textBox.classList.add('item__edit');    
    textBox.value = content;
    
    e.target.parentElement.replaceChild(textBox, e.target);
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {    
    if (e.code == 'Enter') {      
      let content = e.target.value;      
  
      let text = document.createElement("span");
      text.classList.add('item__text');
      text.innerHTML = content;

      text.addEventListener('click', edit);
      
      e.target.parentElement.replaceChild(text, e.target);      
    }        
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    let content = document.querySelector('.form__input').value;

    // create elements
    const listItem = el('LI', 'item');

    const checkBox = el('INPUT', 'item__checkbox', finish);
    checkBox.setAttribute("type", "checkbox");

    const itemText = el('SPAN', 'item__text', edit);    
    itemText.innerHTML = content;

    const deleteButton = el('BUTTON', 'item__button', deleteItem);
    deleteButton.innerHTML = "Eyða";

    // add elements to page
    items.appendChild(listItem);
    listItem.appendChild(checkBox);
    listItem.appendChild(itemText);
    listItem.appendChild(deleteButton);    
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentElement.remove(); 
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);

    if (className != null) {
      element.classList.add(className);
    }
    if (clickHandler != null) {
      element.addEventListener('click', clickHandler);
    }

    return element;
  }

  return {
    init: init
  }
})();
