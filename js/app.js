let tasksList = {
    tasks: [],
    addTask: function(taskTitle){
        this.tasks.push({
            taskTitle: taskTitle,
            todos: []
        });
        view.displayTasks()
    },
    editTask: function(position, newTitle){
        newTitle = prompt("What is in your mind?");
        if( newTitle != null ){
            this.tasks[position].taskTitle = newTitle;
            view.displayTasks()
        }        
    },
    deleteTask: function(position){
        this.tasks.splice(position, 1);
        view.displayTasks()
    },
    addTodo: function(position, todoText){
        this.tasks[position].todos.push({
            todoText: todoText,
            completed: false
        });
        view.displayTodos( position )
    },
    deleteTodo: function(taskid, todoPosition){
        this.tasks[taskid].todos.splice(todoPosition, 1);
        view.displayTodos( taskid )
    },
    editTodo: function(taskid, todoPosition, newText){
        newText = prompt("What is in your mind?");
        if( newText != null ){
            this.tasks[taskid].todos[todoPosition].todoText = newText;
            view.displayTodos( taskid )
        }    
    },
    toggleTodo: function(taskid, todoPosition){
        this.tasks[taskid].todos[todoPosition].completed = !this.tasks[taskid].todos[todoPosition].completed;
        view.displayTodos( taskid )
    },
    toggleAll: function(taskid){
        let counter = 0;
        this.tasks[taskid].todos.forEach(function(todo){
            if( todo.completed === true ){
                counter++;
            }
        });
        this.tasks[taskid].todos.forEach(function(todo){
            if( counter === tasksList.tasks[taskid].todos.length ){
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
        view.displayTodos( taskid )
    }
}

let handlers = {
    addTask: function(){
        if ( document.getElementById("task_input").value != '' ){
            tasksList.addTask( document.getElementById("task_input").value );
            document.getElementById("task_input").value = "";
        }       
    },
    addTodo: function(position){
        if( document.getElementById("todo_input").value = "" ){
            tasksList.addTodo( position , document.getElementById("todo_input").value );
            document.getElementById("todo_input").value = "";
        }
    }
}


let view = {
    displayTasks: function(){
        let tasksUl = document.getElementById('tasklist');
        tasksUl.innerHTML = '';
        tasksList.tasks.forEach(function(task, position){
            let taskLi = document.createElement('li');
            let taskTitle = document.createElement('span');
            taskTitle.innerHTML = task.taskTitle;
            taskLi.appendChild( taskTitle );
            taskLi.id = position;
            taskLi.dataset.taskid = position;
            let buttonsHolder = document.createElement('div');
            buttonsHolder.className = "buttons-holder";
            taskLi.appendChild( buttonsHolder );
            buttonsHolder.appendChild( this.createUpButton() );
            buttonsHolder.appendChild( this.createDownButton() );
            buttonsHolder.appendChild( this.createDeleteButton() );
            buttonsHolder.appendChild( this.createEditButton() );
            tasksUl.appendChild( taskLi );
        }, this);
    },
    displayTodos: function(index){
        let taskTitle = document.getElementById('task-title');
        taskTitle.innerHTML = tasksList.tasks[index].taskTitle;
        let todoUl = document.getElementById('todolist');
        todoUl.innerHTML = '';
        tasksList.tasks[index].todos.forEach(function(todo, position){
            let todoLi = document.createElement('li');
            let todoText = document.createElement('span');
            todoText.innerHTML = todo.todoText;
            todoLi.appendChild( todoText );
            todoLi.className = todo.completed;
            todoLi.id = position;
            let buttonsHolder = document.createElement('div');
            buttonsHolder.className = "buttons-holder";
            todoLi.appendChild( buttonsHolder );
            buttonsHolder.appendChild( this.createUpButton() );
            buttonsHolder.appendChild( this.createDownButton() );
            buttonsHolder.appendChild( this.createToggleButton() );
            buttonsHolder.appendChild( this.createDeleteButton() );
            buttonsHolder.appendChild( this.createEditButton() );
            todoUl.appendChild( todoLi );
        }, this);
    },
    createEditButton : function(){
        let editButton = document.createElement('button');
        editButton.className = "edit-button";
        return editButton;
    },
    createDeleteButton : function(){
        let deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        return deleteButton;
    },
    createUpButton : function(){
        let upButton = document.createElement('button');
        upButton.className = "up-button";
        return upButton;
    },
    createDownButton : function(){
        let downButton = document.createElement('button');
        downButton.className = "down-button";
        return downButton;
    },
    createToggleButton : function(){
        let toggleButton = document.createElement('button');
        toggleButton.className = "toggle-button";
        return toggleButton;
    }
}


let container = document.getElementById("app");
container.addEventListener('click', function(event){
    if( event.target.id === "add-task" ){
        handlers.addTask();
    }
    if( event.target.id === "add-todo" ){
        let taskid = document.getElementById('todolist').dataset.taskid;
        handlers.addTodo( taskid );
    }
    if( event.target.dataset.taskid ){
        view.displayTodos( event.target.dataset.taskid );
        document.getElementById('todolist').dataset.taskid = event.target.dataset.taskid;
    }
    if( event.target.className === "up-button" ){
        let li = event.target.parentNode.parentNode;
        let prevLi = li.previousElementSibling;
        let ul = li.parentNode;
        if (prevLi) {
            ul.insertBefore(li, prevLi);
        }
    }
    if( event.target.className === "down-button" ){
        let li = event.target.parentNode.parentNode;
        let nextLi = li.nextElementSibling;
        let ul = li.parentNode;
        if (nextLi) {
            ul.insertBefore(nextLi, li);
        }
    }
    if( event.target.className === "delete-button" ){
        if(event.target.parentNode.parentNode.dataset.taskid){
            tasksList.deleteTask(event.target.parentNode.parentNode.id);
        } else {
            let taskid = document.getElementById('todolist').dataset.taskid;
            tasksList.deleteTodo(taskid, event.target.parentNode.parentNode.id);
        }        
    }
    if( event.target.className === "edit-button" ){
        if(event.target.parentNode.parentNode.dataset.taskid){
            tasksList.editTask(event.target.parentNode.parentNode.id);
        } else {
            let taskid = document.getElementById('todolist').dataset.taskid;
            tasksList.editTodo(taskid, event.target.parentNode.parentNode.id);
        }      
    }
    if( event.target.className === "toggle-button" ){
        let taskid = document.getElementById('todolist').dataset.taskid;
        tasksList.toggleTodo(taskid, event.target.parentNode.parentNode.id);
    }
    if( event.target.id === "toggle-all" ){
        let taskid = document.getElementById('todolist').dataset.taskid;
        tasksList.toggleAll(taskid, event.target.parentNode.parentNode.id);
    }
})