let todoItems = []; //global object

// this happens when #3, #5 and #6 add, toggle and delete
function renderTodo(todo) { // function to render changes
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        // add this line to clear whitespace from the list container
        // when `todoItems` is empty
        if (todoItems.length === 0) list.innerHTML = '';
        return
      }
  
    const isChecked = todo.checked ? 'done': '';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon"></use></svg>
      </button>
    `;
  
    if (item) {
      list.replaceChild(node, item);
    } else {
      list.append(node);
    }
  }


// #2 thing to happen
function addTodo(text){ //fuction to creat and push object
    const todo = {
        text, //saving input text
        checked:false, //checked false
        id: Date.now(), //saving id as miliseconds
    };

    todoItems.push(todo);
    console.log(todoItems)
    renderTodo(todo);
} 

const form = document.querySelector('.js-form');

// in this case submit is sent by hitting enter when fillind the form
//#1 first thing to happen
form.addEventListener('submit', event => { //event submit form to capture user input

    event.preventDefault(); //prevent page loading
    const input = document.querySelector('.js-todo-input');

    const text = input.value.trim(); //trim eliminates white spaces
    if (text !==''){ //if not empty
        addTodo(text);
        input.value='';
        input.focus();
    }
});

const list = document.querySelector('.js-todo-list'); //ul 

//#4 thing to happen
list.addEventListener('click', event => { //click event 
    if (event.target.classList.contains('js-tick')) {
      const itemKey = event.target.parentElement.dataset.key;
      toggleDone(itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
      }
  });

//#5 thing to happen
  function toggleDone(key) {
    // findIndex is an array method that returns the position of an element
    // in the array.
    const index = todoItems.findIndex(item => item.id === Number(key));
    console.log(index)
    // Locate the todo item in the todoItems array and set its checked
    // property to the opposite. That means, `true` will become `false` and vice
    // versa.
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
  }

//#6 thing to happen
  function deleteTodo(key) {
    // find the corresponding todo object in the todoItems array
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Create a new object with properties of the current todo item
    // and a `deleted` property which is set to true
    const todo = {
      deleted: true,
      ...todoItems[index]
    };
    // remove the todo item from the array by filtering it out
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
  }

  

  



