const params = new URLSearchParams(window.location.search)
const id = params.get('id')

fetch(`http://localhost:3000/dogs/${id}`)
    .then(response => response.json())
    .then(console.log)