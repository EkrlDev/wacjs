var todoList = {
    todos: [],
    /*displayTodos: function() {
        if (this.todos.length === 0) {
            console.log("Your Todo list is empty!")    
        }
        else{
            console.log("My Todos:");
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].completed === true) {
                    console.log('(X)', this.todos[i].todoText);
                }
                else {
                    console.log('( )', this.todos[i].todoText);
                }
            }
        }      
    },*/
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText){
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position){
        this.todos.splice(position,1);
    },
    toggleCompleted: function(position){
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function(){
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        this.todos.forEach(function(todo) {
            if(todo.completed === true ) {
                completedTodos++;
            }
        });
        // Refraction 1
        /*if (completedTodos === totalTodos) {
            this.todos.forEach(function(todo) {
                todo.completed = false;
            });
        } else {
            this.todos.forEach(function(todo) {
                todo.completed = true;
            });
        }*/
        // Refraction 2
        this.todos.forEach(function (todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        })
        /*for(var i = 0; i < totalTodos; i++){
            if(this.todos[i].completed === true){
                completedTodos++;
            }
        }
        if(completedTodos === totalTodos){
            for(var i = 0; i < totalTodos; i++){
                this.todos[i].completed = false;
            }
        } else {
            for(var i = 0; i < totalTodos; i++){
                this.todos[i].completed = true;
            } 
        }*/
    }
};

/*
//debugger;-->for google dev tool inspecting
//1. We want to access ALL button
var displayTodosButton = document.getElementById("displayTodosButton");
//2. We want to run displayTodos() method
displayTodosButton.addEventListener("click", function() {
    todoList.displayTodos();
});
//3. We want to access ToggleAll button
var toggleAllButton = document.getElementById("toggleAllButton");
//4. We want to run toggleAll() method
toggleAllButton.addEventListener("click", function() {
    todoList.toggleAll();
});

*/

//Refractoring the code above, we have changed the index.html/buttons elements also..
var handlers = {
    displayTodos: function() {
        view.displayTodos();
    },
    addTodo: function(){
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
        var changeTodoTextInput = document.getElementById("changeTodoTextInput");
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoTextInput.value = "";
        changeTodoPositionInput.value = "";
        view.displayTodos();
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleTodoPositionInput = document.getElementById("toggleTodoPositionInput");
        todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
        toggleTodoPositionInput.value = "";
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },
};
var view = {
    displayTodos: function() {
        //var todosUl = document.querySelector("ul");
        var todosUl = document.getElementById("listOfTodos");
        todosUl.innerHTML = "";
        //listOfTodos.innerHTML = "";
        /*
        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement("li");
            var todo = todoList.todos[i];
            var todoTextWithCompletion = "";
            if(todo.completed === true) {
                todoTextWithCompletion = "( X ) " + todo.todoText;
            } else {
                todoTextWithCompletion = "(   ) " + todo.todoText;
            }
            //todoLi.textContent = todoList.todos[i].todoText;
            todoLi.id = i;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
            
            //listOfTodos.appendChild(todoLi);
        }*/
        //Refraction 1
        
        todoList.todos.forEach(function (todo, position) {
            var todoLi = document.createElement("li");
            var todoTextWithCompletion = "";
            if(todo.completed === true) {
                todoTextWithCompletion = "( X ) " + todo.todoText;
            } else {
                todoTextWithCompletion = "(   ) " + todo.todoText;
            }
            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },
    setUpEventListeners: function() {
        let todosUl = document.getElementById("listOfTodos");
        todosUl.addEventListener("click", function(event) {
            let elementClicked = event.target;
            if (elementClicked.className === "deleteButton") {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};

view.setUpEventListeners();
 
