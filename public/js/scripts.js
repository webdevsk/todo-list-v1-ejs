const navBtns = document.querySelectorAll('.tabbed-btn')
// console.log(document.title)
navBtns.forEach(btn => {
    // console.log(btn.title)
    btn.classList.toggle('active', document.title.indexOf(btn.title) > -1)
})

// const chckComp = document.querySelectorAll('.checkCompleted')
// console.log(chckComp)

// document.addEventListener('change', e => {
//     if (!e.target.matches('.checkCompleted')) return
//     console.log(e.target.checked)
// })

// async function changeTaskStatus(data){

// }