require('dotenv').config()
const { readFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')

module.exports = function retrieveFavPosts(userId, callback){
    validateId (userId, 'user id')
    validateCallback(callback)

    readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        const user = users.find(user => user.id === userId)
        
        if(!user){
            callback(error)
            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, 'utf8', (error, json) => {
            if(error){
                callback(error)
                return
            }

            const posts = JSON.parse(json)
            const _posts = posts.filter(post => user.favs.includes(post.id))

            callback(null, _posts)
        })
    })
}