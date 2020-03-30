const params = new URLSearchParams(window.location.search)
const id = params.get('id')

fetch(`http://localhost:3000/dogs/${id}`)
    .then(response => response.json())
    .then(showDescription)

function showDescription(dog){
    const $dogSpan = document.querySelector('.breed-span')
    $dogSpan.textContent = dog.breed + " "

    const $dogDescription = document.querySelector('.dog-description')
    $dogDescription.textContent = dog.description

    const $dogPic = document.querySelector('.dogs-pic')
    $dogPic.src = dog.image_url
}



fetch('http://localhost:3000/comments')
    .then(response => response.json())
    .then(response => {
        response.comments
        .map(commentToLi)
        .forEach(appendComment($commentList))
        addComments()
    })


function commentToLi(comment){
    const $li = document.createElement('li')
    $li.textContent = comment.content
    return $li
}
    
const $commentList = document.querySelector('.comment-list')
function appendComment($list){
    return $li => $list.append($li)
}
  


const $commentForm = document.querySelector('.comment-form')
function addComments(){
    $commentForm.addEventListener('submit', event => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const comment = {
            content: formData.get('content')
        }

    
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                'content': comment.content,
                'dog_id': `${id}`,
                'user_id': `${comment.user_id}`
            })
        }).then(response => response.json())
        .then(response => {
            console.log(response)
            const $li = commentToLi(response.comment.content)
            appendComment($commentList)($li)

            const li = response.comment.content
            $commentList.append(li)
        })
        
    })
}



