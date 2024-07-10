let form = document.forms[0]

let table = document.getElementById('data_table')
let modal = document.querySelector('.modal')
let modalClose = document.querySelectorAll('[data-close]')
let newName = document.querySelector('#edit_name')
let newAge = document.querySelector('#edit_age')
let savedBtn = document.querySelector('#saved_btn')

let data = []

let regex = {
    name: /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/,
    age: /^(0?[1-9]|[1-9][0-9]+)$/,
}

let obj = {}

form.onsubmit = (e) => {
    e.preventDefault()

    let fn = new FormData(form)
    fn.forEach((value, key) => {
        obj[key] = value
    })
    validate()

    let name = document.getElementById('name_surname').value
    let age = document.getElementById('year_of_birth').value

    data.push({ name, age })
    reload()
    form.reset()
}

function validate() { 
    let inputs = document.querySelectorAll('.required') 
     
    inputs.forEach(inp => { 
        let name = inp.getAttribute('name') 
        if (regex[name].test(inp.value)) {
            inp.previousElementSibling.style.color = 'green' 
            inp.style.border = '1px solid green'
        } else {    
            inp.previousElementSibling.style.color = 'red' 
            inp.style.border = '1px solid red' 
        }
    }) 
}

function reload() {
    table.innerHTML = ''

    data.forEach((item, index) => {
        let currentYear = new Date().getFullYear()
        let yearOfBirth = currentYear - item.age

        let newRow = table.insertRow()

        newRow.insertCell(0).innerText = index + 1
        newRow.insertCell(1).innerText = item.name
        newRow.insertCell(2).innerText = yearOfBirth

        let editBtn = document.createElement('button')
        editBtn.className = 'edit'
        editBtn.id = 'edit_btns'
        editBtn.setAttribute('data-index', index)
        let editImg = document.createElement('img')
        editImg.src = './images/8666681_edit_icon (1).png'
    
    
        let deleteBtn = document.createElement('button')
        deleteBtn.className = 'delete'
        deleteBtn.id = 'edit_btns'
        deleteBtn.setAttribute('data-index', index)
        let deleteImg = document.createElement('img')
        deleteImg.src = './images/8666597_trash_2_icon (1).png'
    
        editBtn.append(editImg)
        deleteBtn.append(deleteImg)
        let boxBtns = newRow.insertCell(3)
        boxBtns.append(editBtn, deleteBtn)


    editBtn.onclick = () => {
        modal.style.display = 'block'
    }

    deleteBtn.onclick = () => {
        data.splice(index, 1)
        reload()
    }

    modalClose.forEach(btn => {
        btn.onclick = () => {
            modal.style.display = 'none'
        }
    })


    
    savedBtn.onclick = () => {
        data[index].name = newName.value
        data[index].age = newAge.value
        modal.style.display = 'none'
        reload() 
    }
    })
}

let formChange = document.forms[1]

formChange.onsubmit = (e) => {
    e.preventDefault()
}