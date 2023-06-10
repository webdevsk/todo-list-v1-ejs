const navBtns = [...document.querySelectorAll('.tabbed-btn')]
navBtns.map(btn => btn.classList.toggle('active', document.title.indexOf(btn.title) > -1))

// const taskCategories = 
const taskCategories = [...document.querySelector('#task-categories').children]
taskCategories.map(cat =>  cat.innerText = cat.innerText.charAt(0).toUpperCase() + cat.innerText.slice(1))
// const chckComp = document.querySelectorAll('.checkCompleted')
// console.log(chckComp)

// document.addEventListener('change', e => {
//     if (!e.target.matches('.checkCompleted')) return
//     console.log(e.target.checked)
// })

// async function changeTaskStatus(data){

// }