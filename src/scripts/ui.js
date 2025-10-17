import style from '../styles/notifications.module.css'

export function renderTodos(todos) {
    const renderedItemArray = todos.map(function (todo) {
        const className = todo.completed ? 'completed' : ''
        const completionClass = todo.completed ? 'checked' : ''
        return `
            <li data-id="${todo.id}" class="${className}">
                <span class="custom-checkbox">
                    <img class="check" src="./images/checkmark.svg" width="22" height="22"></img>
                    <input class="real-checkbox" type="checkbox" ${completionClass} />
                </span>
                <label>${todo.text}</label>
                <span class="delete"></span>
            </li>
        `
    })
    document.querySelector('.todo-list').innerHTML = renderedItemArray.join('')
}

export function clearNewTodoInput() {
    document.querySelector('.new-todo').value = ''
    showNotification()
    showNotification2()
}

export function getTodoId(element) {
    return parseInt(
        element.dataset.id
        || element.parentNode.dataset.id
        || element.parentNode.parentNode.dataset.id
        , 10)
}

export function showNotification() {
    const notificationHTML = `<div class="${style.notification}">Added New Todo!!</div>`
    document.body.insertAdjacentHTML('beforeend', notificationHTML)

    setTimeout(function () {
        const notificationElement = document.querySelector('.' + style.notification)
        notificationElement.parentNode.removeChild(notificationElement)
    }, 20000)
}

export function showNotification2() {
    const notificationElement = document.createElement('div')
    notificationElement.classList.add('alert', 'alert-success')
    notificationElement.id = '123'
    notificationElement.setAttribute('role', 'alert')
    notificationElement.innerHTML = "Bootstrap Todo Added!!"
    document.body.appendChild(notificationElement)

    setTimeout(function () {
        const notificationElement = document.querySelector('#123')
        notificationElement.parentNode.removeChild(notificationElement)
    }, 20000)
}