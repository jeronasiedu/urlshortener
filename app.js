const menu = document.querySelector('.menu')
const nav = document.querySelector('nav')
const form = document.querySelector('form')
const input = document.querySelector('input')
const results = document.querySelector('.results')
const loader = document.querySelector('.loader')
menu.addEventListener('click', () => {
  menu.classList.toggle('open')
  nav.classList.toggle('active')
})
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = input.value

  getShort(url)
})

async function getShort(url) {
  try {
    loader.style.display = 'block'
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    const data = await response.json()
    console.log(data)
    if (data.ok === false) {
      loader.style.display = 'none'
      if (data.error_code === 2) {
        alert('This is not a valid url')
      } else {
        alert('Check your connection and try again')
      }
    } else {
      loader.style.display = 'none'

      const urlItem = document.createElement('div')
      urlItem.classList.add('item')
      urlItem.innerHTML = `
      <p>${data.result.original_link}</p>
      <p>${data.result.short_link}</p>
      <button class="copy">Copy</button>
     `
      results.prepend(urlItem)
      const copyBtn = document.querySelectorAll('.copy')
      copyBtn.forEach((item) => {
        item.addEventListener('click', (e) => {
          const text = item.previousElementSibling.textContent
          navigator.clipboard.writeText(text)
          item.textContent = 'copied!'
          setTimeout(() => {
            item.textContent = 'copy'
          }, 3000)
        })
      })
    }
    input.value = ''
  } catch (error) {
    console.log(error.response)
  }
}
