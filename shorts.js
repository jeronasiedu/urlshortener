const menu = document.querySelector('.menu')
const nav = document.querySelector('nav')
menu.addEventListener('click', () => {
  menu.classList.toggle('open')
  nav.classList.toggle('active')
})
const items = JSON.parse(localStorage.getItem('jshorts'))
console.log(items)
