const navBtns = document.querySelectorAll('.tabbed-btn')
console.log(document.title)
navBtns.forEach(btn => {
    console.log(btn.title)
    btn.classList.toggle('active', document.title.indexOf(btn.title) > -1)
})