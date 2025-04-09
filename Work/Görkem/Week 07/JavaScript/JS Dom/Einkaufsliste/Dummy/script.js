function addTodo(){
    todoList.innerHTML += '<li><input type="checkbox">' + todoField.value + '</li>';
    todoField.value = '';
}
