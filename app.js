const menu = document.querySelector('.menu')
const nav = document.querySelector('nav')
const form = document.querySelector('form')
const input = document.querySelector('input')
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
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    const data = await response.json()

    if (data.ok === false) {
      Toastify({
        text: 'There was an error processing your link',
        duration: 5000,
        position: 'left',
      }).showToast()
      return
    } else {
      navigator.clipboard.writeText(data.result.short_link)
      const linkProps = {
        original: data.result.original_link,
        short: data.result.short_link,
      }
      Toastify({
        text: 'Link copied to clipboard',
        duration: 5000,
        position: 'left',
      }).showToast()
    }
    input.value = ''
  } catch (error) {
    console.log(error.response)
  }
}
