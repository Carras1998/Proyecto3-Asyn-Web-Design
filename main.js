import './style.css'

const accesKey = 'CdW4yg-StMfWuTPIWXY1SeOJ24n7jT9sek52CaWvj0E'

const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('search-box')
const searchResult = document.getElementById('search-result')
const showMoreBtn = document.getElementById('show-more-btn')

let keyword = ''
let page = 1

async function searchImages() {
  keyword = searchBox.value
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesKey}&per_page=12`

  const response = await fetch(url)
  const data = await response.json()

  if (page === 1) {
    searchResult.innerHTML = ''
  }

  const results = data.results

  if (results.length === 0) {
    const noResultsMessage = document.createElement('p')
    noResultsMessage.textContent = 'No se encontraron resultados.'
    noResultsMessage.id = 'no-results-message'
    searchResult.appendChild(noResultsMessage)
    showMoreBtn.style.display = 'none'
    return
  }

  results.map((result) => {
    const image = document.createElement('img')
    image.src = result.urls.small
    const imageLink = document.createElement('a')
    imageLink.href = result.links.html
    imageLink.target = '_blank'

    imageLink.appendChild(image)
    searchResult.appendChild(imageLink)
  })
  showMoreBtn.style.display = 'block'
}

async function getRandomImages() {
  const url = `https://api.unsplash.com/photos/random?count=12&client_id=${accesKey}`

  const response = await fetch(url)
  const data = await response.json()

  searchResult.innerHTML = ''

  data.forEach((imageData) => {
    const image = document.createElement('img')
    image.src = imageData.urls.small
    const imageLink = document.createElement('a')
    imageLink.href = imageData.links.html
    imageLink.target = '_blank'

    imageLink.appendChild(image)
    searchResult.appendChild(imageLink)
  })
}

document.addEventListener('DOMContentLoaded', getRandomImages)

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  page = 1
  searchImages()
})

showMoreBtn.addEventListener('click', () => {
  page++
  searchImages()
})

document.addEventListener('DOMContentLoaded', () => {
  const homeIcon = document.getElementById('home-icon')
  homeIcon.addEventListener('click', () => {
    location.reload()
  })
})
