const navBtns = [...document.querySelectorAll('.tabbed-btn')]
navBtns.map(btn => btn.classList.toggle('active', document.title.indexOf(btn.title) > -1))

// const taskCategories = 
const taskCategories = [...document.querySelector('#task-categories').children]
taskCategories.map(cat =>  cat.innerText = cat.innerText.charAt(0).toUpperCase() + cat.innerText.slice(1))

//modal
const catDialog = document.querySelector('#catDialog')
const modalTrigger = document.querySelector('#modalTrigger')

modalTrigger.addEventListener('click', e => {
    e.preventDefault()
    catDialog.showModal()
})

catDialog.addEventListener("click", e => {
    const dialogDimensions = catDialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      catDialog.close()
    }
})

const catBtn = document.querySelector('#catDialog form')
catBtn.addEventListener('submit', e=>{
    e.preventDefault()
    const newCatName = e.target.querySelector('#newCatName')
    location.href = '/' + newCatName.value.toLowerCase()
})