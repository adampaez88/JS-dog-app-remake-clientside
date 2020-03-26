// add dog
const $dogForm = document.querySelector('.dog-form')
$dogForm.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const dog = {
        breed: formData.get('breed'),
        info: formData.get('info'),
        image_url: formData.get('image_url'),
        description: formData.get('description')
    }

    fetch('http://localHost:3000/dogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dog)
    }).then(response => response.json())
})



const $dogContainer = document.querySelector('.dog-section')
fetch('http://localhost:3000/dogs')
.then(response => response.json())
.then(response => {
    response.dogs
    .forEach(dogToDiv)
})

function dogToDiv(dog){
    const $aDogsDiv = document.createElement('div')
    $aDogsDiv.className = 'dog-div'

    const $dogBreed = document.createElement('h1')
    const $dogPic = document.createElement('img')
    const $dogInfo = document.createElement('h4')
    const $dogDescription = document.createElement('h5')

    $dogBreed.textContent = dog.breed
    $dogPic.src = dog.image_url
    $dogInfo.innerHTML = `<a href=description.html?id=${dog.id}> ${dog.breed} Info</a>`
    $dogDescription.textContent = dog.description
    
    $aDogsDiv.append($dogBreed, $dogPic, $dogInfo, $dogDescription)
    $dogContainer.append($aDogsDiv)
}

// function appendDogToDiv($section){
//     return $dogDiv => $section.append($dogDiv)
// }

// sign up
const $signupForm = document.querySelector('.signup')
$signupForm.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const user = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    }

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        const $message = document.querySelector('.signup .message')
        $message.innerHTML = 'Welcome'
    })
})

// login
const $loginForm = document.querySelector('.login')
$loginForm.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const user = {
        username: formData.get('username'),
        password: formData.get('password')
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json())
    .then(response => {
        localStorage.setItem('token', response.token)
        checkLoginStatus()

        const $message = document.querySelector('.login .message')
        $message.innerHTML = 'Logged In'
    })
})

function checkLoginStatus(){
    const $loginStatus = document.querySelector('.login-status span')
    $loginStatus.textContent = localStorage.getItem('token')
    ? 'Yes'
    : 'No'
}
checkLoginStatus()

// logout
const $logout = document.querySelector('.logout')
$logout.addEventListener('click', event => {
    localStorage.removeItem('token')
    checkLoginStatus()
})