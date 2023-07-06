import { validators } from 'com'
const { validateToken, validateId, validateUrl, validateText, validateCallback } = validators


export default function updatePost(token, postId, image, location, title, text, callback) {
    validateToken(token)
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)
    validateCallback(callback)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }

        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }


    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}`)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    const post = { postId , image, location, title, text }
    const json = JSON.stringify(post)

    xhr.send(json)

}


