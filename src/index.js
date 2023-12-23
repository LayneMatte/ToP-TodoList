import './style.css'
import { format, addDays } from 'date-fns'
import edit from './projectEdit.png'
import del from './projectDelete.png'
import checkmark from './checkmark.png'
import cancel from './cancel.png'
import taskEdit from './edit.png'
import taskDelete from './delete.png'

let selectedFilter
let taskArray = []
let projectArray = []
let todayArray = []
let weekArray = []
let priorityArray = []
let projectFilterArray = []
let x = 0
let k = 0
let b = 0
const taskGenerator = (
    title,
    description = '',
    dueDate,
    priority,
    project = ''
) => {
    // console.log(dueDate)
    let newDate = dateReformat(dueDate)
    let uniqueID = (k += 1)
    return {
        title,
        description,
        dueDate,
        newDate,
        priority,
        project,
        uniqueID,
    }
}
;(function checkStorage() {
    window.addEventListener('load', () => {
        // console.log(localStorage.length)
        if (localStorage.getItem('taskArray') != null) {
            taskArray = JSON.parse(localStorage.getItem('taskArray'))
            // console.log(taskArray)
        }
        if (localStorage.getItem('projectArray') != null) {
            projectArray = JSON.parse(localStorage.getItem('projectArray'))
            projectOptionsWipe()
            addProjectToSelect().create()
            // console.log(projectArray)
        }
        console.log('page is fully loaded')
    })
})()
function storageEdit(array, arrayName) {
    localStorage.removeItem(arrayName)
    // console.log(array.length)
    if (array.length > 0) {
        localStorage.setItem(arrayName, JSON.stringify(array))
    }
}
function dateReformat(date) {
    let dateArray = date.split('-')
    let year = parseInt(dateArray[0])
    let day = parseInt(dateArray[2])
    let month = parseInt(dateArray[1])
    let inputDate = new Date(year, month - 1, day)
    let dateFormat = format(new Date(inputDate), 'MM-dd-yyyy')
    return dateFormat
}
function projectArrayPush(value) {
    projectArray.push(value)
    // console.log(projectArray)
    return
}
function projectArrayRemove(value) {
    let index = projectArray.indexOf(value)
    projectArray.splice(index, 1)
    // console.log(projectArray)
    return { projectArray }
}
function taskArrayRemove(value) {
    let index
    taskArray.filter((x) => {
        if (value == parseInt(x.uniqueID)) {
            index = taskArray.indexOf(x)
        }
    })
    // console.log(index)
    taskArray.splice(index, 1)
    // console.log(taskArray)
    return { taskArray }
}
function editArray(index, value) {
    projectArray[index] = value
}
function taskArrayPush(value) {
    taskArray.push(value)
    // return console.log(taskArray)
}
let taskArrayFilters = function () {
    const today = format(new Date(), 'MM-dd-yyyy')
    function todayFilter() {
        todayArray = []
        // console.log(taskArray[0].entries)
        for (let i = 0; i < taskArray.length; i++) {
            let tempArray = Object.entries(taskArray[i])
            // console.log(tempArray[3][1])
            if (tempArray[3][1] === today) {
                todayArray.push(taskArray[i])
            }
        }
        // console.log(todayArray)
        return todayArray
    }
    function nextSevenDays() {
        let nextWeek = []
        weekArray = []
        for (let i = 0; i < 7; i++) {
            let week = addDays(new Date(), i)
            nextWeek.push(format(week, 'MM-dd-yyyy'))
        }
        for (let b = 0; b < taskArray.length; b++) {
            let tempArray = Object.entries(taskArray[b])
            nextWeek.filter((x) => {
                if (tempArray[3][1] === x) {
                    weekArray.push(taskArray[b])
                }
            })
        }
        return weekArray
    }
    function priorityFilter() {
        priorityArray = []
        for (let i = 0; i < taskArray.length; i++) {
            let tempArray = Object.entries(taskArray[i])
            if (tempArray[4][1] === 'high') {
                priorityArray.push(taskArray[i])
            }
        }
        // console.log(priorityArray)
        return priorityArray
    }
    function projectFilter(value) {
        projectFilterArray = []
        if (value != '') {
            for (let i = 0; i < taskArray.length; i++) {
                let tempArray = Object.entries(taskArray[i])
                // console.log(tempArray)
                if (tempArray[5][1] === value) {
                    projectFilterArray.push(taskArray[i])
                }
                console.log(projectFilterArray)
            }
        } else return
        return projectFilterArray
    }
    return {
        todayFilter,
        nextSevenDays,
        priorityFilter,
        projectFilter,
        todayArray,
        weekArray,
        priorityArray,
        projectFilterArray,
    }
}

// LOGIC/DOM SPLIT HERE
let taskButton = document.querySelector('.addTask')
let dialog = document.querySelector('.addTaskWindow')
let close = document.querySelector('.close')
let addP = document.querySelector('.addProject')
let addPContainer = document.querySelector('.addProjectContainer')
let headerText = document.querySelector('.rightMainHeaderText')
let input = document.querySelector('.inputContainer')
let taskName = document.querySelector('#taskName')
let taskDescription = document.querySelector('#taskDescription')
let dueDate = document.querySelector('#dueDate')
let priorityEl = document.querySelector('#priority')
let projectOptions = document.querySelector('#projectSelect')
let editProjectOptions = document.querySelector('#editProjectSelect')
let submit = document.querySelector('.submit')
let taskrequired = document.querySelector('.tasknamerequired')
let duedaterequired = document.querySelector('.duedaterequired')
let priorityrequired = document.querySelector('.priorityrequired')
let taskContainer = document.querySelector('.taskContainer')
let editTaskDialog = document.querySelector('.editTaskWindow')
let editWindowClose = document.querySelector('.editClose')
let editWindowSubmit = document.querySelector('.editSubmit')
let editTaskName = document.querySelector('#editTaskName')
let editTaskNameRequired = document.querySelector('.editTaskNameRequired')
let editDueDate = document.querySelector('#editDueDate')
let editDueDateRequired = document.querySelector('.editDueDateRequired')
let editPriorityEl = document.querySelector('#editPriority')
let editPriorityElRequired = document.querySelector('.editPriorityRequired')
let editTaskDescription = document.querySelector('#editTaskDescription')
let priorityContainer = document.querySelector('.priorityContainer')
let projectItemContainer = document.querySelector('.projectItemContainer')

function createEl(
    eltype,
    element,
    className,
    text,
    id = '',
    imgSrc,
    href,
    placeHolderText
) {
    element = document.querySelector(`${element}`)
    let el = document.createElement(`${eltype}`)
    el.classList.add(`${className}`)
    el.id = `${id}`
    if (!text) {
    } else {
        el.textContent = `${text}`
    }
    if (eltype === 'img') {
        el.src = `${imgSrc}`
    } else if (eltype === 'a') {
        el.href = `${href}`
    } else if (eltype === 'input') {
        el.placeholder = `${placeHolderText}`
    }
    element.appendChild(el)
}

let addTaskDialog = (function () {
    taskButton.addEventListener('click', () => dialog.showModal())
    close.addEventListener('click', () => dialog.close())
})()
let projectInput = function () {
    if (input.children.length != 0) {
        return
    }
    createEl(
        'input',
        '.inputContainer',
        'projectInput',
        undefined,
        undefined,
        undefined,
        undefined,
        'Enter Project Name'
    )
    createEl('div', '.inputContainer', 'buttonContainer')
    createEl('div', '.buttonContainer', 'submitButton', 'Submit')
    createEl('div', '.buttonContainer', 'closeButton', 'Close')
    let projectInput = document.querySelector('.projectInput')
    projectInput.setAttribute('maxlength', 20)
    input.style.cssText = ''
    addPContainer.style.cssText = 'display:none'
}
let projectInputRemove = function () {
    if (input.children.length != 0)
        for (let i = 0; i < input.children.length; ) {
            input.removeChild(input.children[0])
        }
    input.style.cssText = 'display:none'
    addPContainer.style.cssText = ''
}
let projectInputClose = function () {
    document.addEventListener('click', (e) => {
        if (e.target.classList == 'closeButton') {
            projectInputRemove()
            addPContainer.style.cssText = ''
        }
    })
}
let projectInputValue
let addProjectToSelect = function () {
    // let x = 0
    function create() {
        projectOptionsWipe()
        createEl('option', '#projectSelect', `defaultOption`, ``)
        createEl('option', '#editProjectSelect', `defaultOption`, ``)
        if (projectArray.length > 0) {
            for (let i = 0; i < projectArray.length; i++) {
                // console.log(projectArray[i])
                createEl(
                    'option',
                    '#projectSelect',
                    `p${i}`,
                    `${projectArray[i]}`
                )
                createEl(
                    'option',
                    '#editProjectSelect',
                    `p${i}`,
                    `${projectArray[i]}`
                )
            }
        } else if (projectArray.length === 0) {
            projectOptionsWipe()
        }
    }
    return {
        create,
    }
}
function projectOptionsWipe() {
    let childCount = projectOptions.childElementCount
    for (let k = 0; k < childCount; k++) {
        projectOptions.remove(projectOptions.children)
    }
    let editChildCount = editProjectOptions.childElementCount
    for (let b = 0; b < editChildCount; b++) {
        editProjectOptions.remove(editProjectOptions.children)
    }
    k = 0
    b = 0
}
function projectAdd(arr) {
    projectWipe()
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i])
        createEl(
            'div',
            '.projectItemContainer',
            `project${(x += 1)}`,
            undefined,
            `${arr[i]}`
        )
        createEl('div', `.project${x}`, `project${x}TextContainer`, `${arr[i]}`)
        createEl('div', `.project${x}`, `project${x}ItemButtonContainer`)
        createEl(
            'img',
            `.project${x}ItemButtonContainer`,
            `project${x}itemEditA`,
            undefined,
            undefined,
            `${edit}`
        )
        createEl(
            'img',
            `.project${x}ItemButtonContainer`,
            `project${x}itemDelete`,
            undefined,
            undefined,
            `${del}`
        )
        createEl(
            'img',
            `.project${x}ItemButtonContainer`,
            `project${x}itemEditCheckMark`,
            undefined,
            undefined,
            `${checkmark}`
        )
        createEl(
            'img',
            `.project${x}ItemButtonContainer`,
            `project${x}itemEditCancel`,
            undefined,
            undefined,
            `${cancel}`
        )
        let itemEditCheckMark = document.querySelector(
            `.project${x}itemEditCheckMark`
        )
        let itemCancel = document.querySelector(`.project${x}itemEditCancel`)
        itemEditCheckMark.style.cssText = 'display:none'
        itemCancel.style.cssText = 'display:none'
    }
}
function projectWipe() {
    let childCount = projectItemContainer.children.length
    // console.log(childCount)
    if (childCount > 0) {
        for (let i = 0; i < childCount; i++) {
            projectItemContainer.removeChild(projectItemContainer.firstChild)
        }
    }
}
let addProjectSubmitButton = function () {
    document.addEventListener('click', (e) => {
        if (e.target.classList == 'submitButton') {
            let projectInputValue =
                document.querySelector('.projectInput').value
            if (projectInputValue != '') {
                projectArrayPush(projectInputValue)
                projectWipe()
                projectAdd(projectArray)
                localStorage.setItem(
                    'projectArray',
                    JSON.stringify(projectArray)
                )
                projectOptionsWipe()
                addProjectToSelect().create()
                projectInputRemove()
            } else {
                projectInputRemove()
            }
        }
    })
    return projectInputValue
}
let removeProject = (function () {
    document.addEventListener('click', (e) => {
        let itemDelete = String(e.target.classList)
        if (itemDelete.includes('itemDelete') == true) {
            let childValue =
                e.target.parentNode.parentNode.firstChild.firstChild.nodeValue
            let parentClass = e.target.parentNode.parentNode.parentNode
            let index = projectArray.indexOf(childValue)
            projectArrayRemove(childValue)
            storageEdit(projectArray, 'projectArray')
            parentClass.removeChild(parentClass.children[index])
            projectOptionsWipe()
            addProjectToSelect().create()
            if (
                headerText.firstChild.nodeValue ==
                e.target.parentNode.parentNode.id
            ) {
                headerText.firstChild.nodeValue = 'Inbox'
                taskDOMGeneration().create(taskArray)
            }
        }
    })
})()
let editProject = (function () {
    document.addEventListener('click', (e) => {
        let itemEdit = String(e.target.classList)
        if (itemEdit.includes('itemEditA') == true) {
            let childNode = e.target.parentNode.parentNode
            let newInput = document.createElement('input')
            newInput.classList.add('newInput')
            newInput.setAttribute('maxlength', 20)
            newInput.placeholder = 'New Project Name'
            childNode.firstChild.style.cssText = 'display:none'
            childNode.insertBefore(newInput, childNode.firstChild)
            e.target.parentNode.children[0].style.cssText = 'display:none'
            e.target.parentNode.children[1].style.cssText = 'display:none'
            e.target.parentNode.children[2].style.cssText = ''
            e.target.parentNode.children[3].style.cssText = ''
        }
    })
    function itemEditWipe(e) {
        let childValue = e.target.parentNode.parentNode
        childValue.children[1].style.cssText = ''
        childValue.removeChild(childValue.firstChild)
        e.target.parentNode.children[0].style.cssText = ''
        e.target.parentNode.children[1].style.cssText = ''
        e.target.parentNode.children[2].style.cssText = 'display:none'
        e.target.parentNode.children[3].style.cssText = 'display:none'
    }
    function itemEditCancelButton() {
        document.addEventListener('click', (e) => {
            let itemEditCancel = String(e.target.classList)
            if (itemEditCancel.includes('itemEditCancel') == true) {
                itemEditWipe(e)
            }
        })
    }
    itemEditCancelButton()
    function itemEditCheckMarkButton() {
        document.addEventListener('click', (e) => {
            let itemEditCheckMark = String(e.target.classList)
            if (itemEditCheckMark.includes('itemEditCheckMark') == true) {
                let pValue =
                    e.target.parentNode.parentNode.children[1].firstChild
                        .nodeValue
                let p = e.target.parentNode.parentNode.children[1].firstChild
                let index = projectArray.indexOf(pValue)
                let inputValue = e.target.parentNode.parentNode.firstChild.value
                if (inputValue != '') {
                    projectArray[index] = inputValue
                    storageEdit(projectArray, 'projectArray')
                    p.textContent = inputValue
                    e.target.parentNode.parentNode.id = `${inputValue}`
                    // console.log(projectArray)
                    itemEditWipe(e)
                    projectOptionsWipe()
                    addProjectToSelect().create()
                    if (
                        e.target.parentNode.parentNode.style[
                            'background-color'
                        ] == 'lightgrey'
                    ) {
                        updateTaskHeader(inputValue)
                        selectedFilter = inputValue
                    }
                }
            }
        })
    }
    itemEditCheckMarkButton()
})()
let addProject = (function () {
    addP.addEventListener('click', projectInput)
    projectInputClose()
    addProjectSubmitButton()
})()
let updateTaskHeader = function (value) {
    headerText.textContent = value
}
let projectSelect = (function () {
    document.addEventListener('click', (e) => {
        let projectSelect = String(e.target.classList)
        let regex =
            /^project\d+$|(project\d+TextContainer)|(inbox+\D+)|(today+\D+)|(week+\D+)|(important+\D+)/gi
        if (projectSelect.match(regex) != null) {
            let priorityContainerChildren = priorityContainer.children
            if (document.querySelector('.projectItemContainer') != null) {
                let projectContainer = document.querySelector(
                    '.projectItemContainer'
                )
                let projectContainerChildren = projectContainer.children
                let containerArray = new Array(
                    priorityContainerChildren,
                    projectContainerChildren
                )
                for (let i = 0; i < containerArray.length; i++) {
                    for (let b = 0; b < containerArray[i].length; b++) {
                        containerArray[i][b].style['background-color'] = ''
                    }
                    if (
                        e.target.parentNode.classList == 'priorityContainer' ||
                        e.target.parentNode.classList == 'projectItemContainer'
                    ) {
                        e.target.style.cssText =
                            'background-color:lightgrey;border-radius:5px'
                        updateTaskHeader(e.target.id)
                        selectedFilter = e.target.id
                    } else {
                        e.target.parentNode.style.cssText =
                            'background-color:lightgrey;border-radius:5px'
                        updateTaskHeader(e.target.parentNode.id)
                        selectedFilter = e.target.parentNode.id
                    }
                }
            } else {
                for (let i = 0; i < priorityContainerChildren.length; i++) {
                    priorityContainerChildren[i].style['background-color'] = ''
                }
                if (
                    e.target.parentNode.classList == 'priorityContainer' ||
                    e.target.parentNode.classList == 'projectItemContainer'
                ) {
                    e.target.style.cssText =
                        'background-color:lightgrey;border-radius:5px'
                    updateTaskHeader(e.target.id)
                    selectedFilter = e.target.id
                } else {
                    e.target.parentNode.style.cssText =
                        'background-color:lightgrey;border-radius:5px'
                    updateTaskHeader(e.target.parentNode.id)
                    selectedFilter = e.target.parentNode.id
                }
            }
        }
        return selectedFilter
    })
})()
let formReset = (function () {
    let resetButton = document.querySelector('.reset')
    let form = document.querySelector('#taskForm')
    resetButton.addEventListener('click', () => {
        form.reset()
        taskName.style.cssText = ''
        taskrequired.textContent = ''
        dueDate.style.cssText = ''
        duedaterequired.textContent = ''
        priorityEl.style.cssText = ''
        priorityrequired.textContent = ''
    })
})()
let taskNameStop
let dueDateStop
let priorityStop
function requiredCheck() {
    if (taskName.value === '') {
        taskName.style.cssText = 'border:solid red 2px; border-radius: 5px;'
        taskrequired.textContent = 'Please Input a Task Name'
        taskNameStop = 'stop'
    } else {
        taskName.style.cssText = ''
        taskrequired.textContent = ''
        taskNameStop = ''
    }
    if (dueDate.value === '') {
        dueDate.style.cssText = 'border:solid red 2px; border-radius: 5px;'
        duedaterequired.textContent = 'Please Input a Valid Due Date'
        dueDateStop = 'stop'
    } else {
        dueDate.style.cssText = ''
        duedaterequired.textContent = ''
        dueDateStop = ''
    }
    if (priorityEl.value === '') {
        priorityEl.style.cssText = 'border:solid red 2px; border-radius: 5px;'
        priorityrequired.textContent = 'Please Pick a Priority'
        priorityStop = 'stop'
    } else {
        priorityEl.style.cssText = ''
        priorityrequired.textContent = ''
        priorityStop = ''
    }
}
let taskDOMGeneration = function () {
    function wipe() {
        let childCount = taskContainer.childElementCount
        if (childCount > 0) {
            for (let i = 0; i < childCount; i++) {
                taskContainer.removeChild(taskContainer.children[0])
            }
        }
    }
    function create(array) {
        wipe()
        for (let i = 0; i < array.length; i++) {
            if (array.length > 0) {
                createEl('div', '.taskContainer', `taskNumber${i}`)
                createEl('div', `.taskNumber${i}`, `taskLeft${i}`)
                createEl('div', `.taskLeft${i}`, `toggle${i}`)
                createEl(
                    'div',
                    `.taskLeft${i}`,
                    `taskTitle${i}`,
                    `${array[i].title}`
                )
                createEl('div', `.taskNumber${i}`, `taskMid${i}`)
                createEl(
                    'div',
                    `.taskMid${i}`,
                    `taskDescription${i}`,
                    `${array[i].description}`
                )
                createEl('div', `.taskNumber${i}`, `taskRight${i}`)
                createEl(
                    'div',
                    `.taskRight${i}`,
                    `taskDueDate${i}`,
                    `${array[i].newDate}`
                )
                createEl(
                    'img',
                    `.taskRight${i}`,
                    `taskContainerEdit${i}`,
                    undefined,
                    undefined,
                    `${taskEdit}`
                )
                createEl(
                    'img',
                    `.taskRight${i}`,
                    `taskContainerDelete${i}`,
                    undefined,
                    undefined,
                    `${taskDelete}`
                )
                createEl('div', `.taskRight${i}`, `ID-${array[i].uniqueID}`)
                let uniqueID = document.querySelector(
                    `.ID-${array[i].uniqueID}`
                )
                let taskContainerBorderEdit = document.querySelector(
                    `.taskNumber${i}`
                )
                uniqueID.setAttribute('display', 'none')
                switch (array[i].priority) {
                    case 'high':
                        taskContainerBorderEdit.style.cssText = `border-style: solid;
                      border-color: black black black darkred;
                      border-width: 2px 2px 2px 10px;`
                        break
                    case 'medium':
                        taskContainerBorderEdit.style.cssText = `border-style: solid;
                      border-color: black black black darkgoldenrod;
                      border-width: 2px 2px 2px 10px;`
                        break
                    case 'low':
                        taskContainerBorderEdit.style.cssText = `border-style: solid;
                      border-color: black black black darkgreen;
                      border-width: 2px 2px 2px 10px;`
                        break
                }
            }
        }
    }
    return {
        create,
        wipe,
    }
}
function taskContainerSwitchboard(value) {
    // console.log(value)
    switch (true) {
        case value == 'Inbox':
            // console.log('poop')
            taskDOMGeneration().create(taskArray)
            break
        case value === 'Today':
            taskDOMGeneration().create(taskArrayFilters().todayFilter())
            break
        case value === 'Next 7 Days':
            taskDOMGeneration().create(taskArrayFilters().nextSevenDays())
            break
        case value === 'Important':
            taskDOMGeneration().create(taskArrayFilters().priorityFilter())
            break
        case projectArray.includes(value):
            taskDOMGeneration().create(taskArrayFilters().projectFilter(value))
            break
    }
}
let taskContainerAdd = (function () {
    submit.addEventListener('click', (e) => {
        requiredCheck()
        if (
            taskNameStop == 'stop' ||
            dueDateStop == 'stop' ||
            priorityStop == 'stop'
        ) {
            return
        }
        const newTask = taskGenerator(
            taskName.value,
            taskDescription.value,
            dueDate.value,
            priorityEl.value,
            projectOptions.value
        )
        taskArrayPush(newTask)
        taskDOMGeneration().wipe()
        taskContainerSwitchboard(headerText.firstChild.nodeValue)
        localStorage.setItem('taskArray', JSON.stringify(taskArray))
        // console.log(taskArray)
        dialog.close()
    })
})()
let taskContainerRemove = (function () {
    document.addEventListener('click', (e) => {
        let select = String(e.target.classList)
        if (select.includes('taskContainerDelete')) {
            let parentNode = e.target.parentNode.parentNode.parentNode
            let childNode = e.target.parentNode.parentNode
            let index = String(e.target.parentNode.children[3].classList).split(
                '-'
            )[1]
            taskArrayRemove(index)
            storageEdit(taskArray, 'taskArray')
            parentNode.removeChild(childNode)
        }
    })
})()
let editIndex
let taskContainerEdit = (function () {
    document.addEventListener('click', (e) => {
        let select = String(e.target.classList)
        if (select.includes('taskContainerEdit')) {
            editTaskDialog.showModal()
            let value = String(e.target.parentNode.children[3].classList).split(
                '-'
            )[1]
            taskArray.filter((x) => {
                if (value == parseInt(x.uniqueID)) {
                    editIndex = taskArray.indexOf(x)
                }
            })
            editTaskName.value = taskArray[editIndex].title
            editTaskDescription.value = taskArray[editIndex].description
            editDueDate.value = taskArray[editIndex].dueDate
            editPriorityEl.value = taskArray[editIndex].priority
            editProjectOptions.value = taskArray[editIndex].project
        }
    })
    return editIndex
})()
function editTaskWindowClose() {
    editWindowClose.addEventListener('click', () => {
        editTaskDialog.close()
    })
}
editTaskWindowClose()
let editTaskNameStop
let editDueDateStop
let editPriorityStop
function editRequiredCheck() {
    if (editTaskName.value === '') {
        editTaskName.style.cssText = 'border:solid red 2px; border-radius: 5px;'
        editTaskNameRequired.textContent = 'Please Input a Task Name'
        editTaskNameStop = 'stop'
    } else {
        editTaskName.style.cssText = ''
        editTaskNameRequired.textContent = ''
        editTaskNameStop = ''
    }
    if (editDueDate.value === '') {
        editDueDate.style.cssText = 'border:solid red 2px; border-radius: 5px;'
        editDueDateRequired.textContent = 'Please Input a Valid Due Date'
        editDueDateStop = 'stop'
    } else {
        editDueDate.style.cssText = ''
        editDueDateRequired.textContent = ''
        editDueDateStop = ''
    }
    if (editPriorityEl.value === '') {
        editPriorityEl.style.cssText =
            'border:solid red 2px; border-radius: 5px;'
        editPriorityElRequired.textContent = 'Please Pick a Priority'
        editPriorityStop = 'stop'
    } else {
        editPriorityEl.style.cssText = ''
        editPriorityElRequired.textContent = ''
        editPriorityStop = ''
    }
}
let editFormReset = (function () {
    let resetButton = document.querySelector('.editReset')
    let form = document.querySelector('#editTaskForm')
    resetButton.addEventListener('click', () => {
        form.reset()
        editTaskName.style.cssText = ''
        editTaskNameRequired.textContent = ''
        editDueDate.style.cssText = ''
        editDueDateRequired.textContent = ''
        editPriorityEl.style.cssText = ''
        editPriorityElRequired.textContent = ''
    })
})()
function editTaskWindowSubmit() {
    editWindowSubmit.addEventListener('click', (e) => {
        editRequiredCheck()
        // console.log(editTaskNameStop, editDueDateStop, editPriorityStop)
        if (
            editTaskNameStop == 'stop' ||
            editDueDateStop == 'stop' ||
            editPriorityStop == 'stop'
        ) {
            return
        } else {
            taskArray[editIndex].title = editTaskName.value
            taskArray[editIndex].description = editTaskDescription.value
            taskArray[editIndex].newDate = dateReformat(editDueDate.value)
            taskArray[editIndex].priority = editPriorityEl.value
            taskArray[editIndex].project = editProjectOptions.value
            // console.log(taskArray[editIndex])
            // console.log(taskArray)
            storageEdit(taskArray, 'taskArray')
            taskDOMGeneration().wipe()
            taskDOMGeneration().create(taskArray)
            editTaskDialog.close()
        }
    })
}
editTaskWindowSubmit()
let viewController = (function () {
    let priorityContainerChildren = priorityContainer.childNodes
    priorityContainerChildren.forEach((event) =>
        event.addEventListener('click', (e) => {
            let select = String(e.target.classList)
            switch (true) {
                case select.includes('inbox'):
                    taskDOMGeneration().create(taskArray)
                    break
                case select.includes('today'):
                    taskDOMGeneration().create(taskArrayFilters().todayFilter())
                    break
                case select.includes('week'):
                    taskDOMGeneration().create(
                        taskArrayFilters().nextSevenDays()
                    )
                    break
                case select.includes('important'):
                    taskDOMGeneration().create(
                        taskArrayFilters().priorityFilter()
                    )
                    break
            }
        })
    )
    document.addEventListener('click', (e) => {
        if (projectArray != null) {
            let select = e.target
            if (select.childNodes[0] != undefined) {
                if (
                    projectArray.includes(select.id, 0) &&
                    select.parentNode.classList.value == 'projectItemContainer'
                ) {
                    taskDOMGeneration().create(
                        taskArrayFilters().projectFilter(select.id)
                    )
                } else if (
                    projectArray.includes(select.childNodes[0].nodeValue, 0) &&
                    select.classList[0].includes('TextContainer')
                ) {
                    taskDOMGeneration().create(
                        taskArrayFilters().projectFilter(
                            select.childNodes[0].nodeValue
                        )
                    )
                } else return
            }
        }
    })
})()
let taskCheckmark = (function () {
    document.addEventListener('click', (e) => {
        let select = String(e.target.classList)
        if (select.includes('toggle')) {
            let toggle = e.target
            toggle.classList.toggle('on')
            let title = e.target.parentNode.parentNode.children[0].children[1]
            title.classList.toggle('on')
            let description =
                e.target.parentNode.parentNode.children[1].children[0]
            description.classList.toggle('on')
        }
    })
})()
let viewOnLoad = (function () {
    window.addEventListener('load', () => {
        if (taskArray != null) {
            taskDOMGeneration().create(taskArray)
        }
        if (projectArray != null) {
            projectAdd(projectArray)
        }
    })
})()
