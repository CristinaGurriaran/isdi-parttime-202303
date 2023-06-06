const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateCallback } } = require('com')


module.exports = function deletePost(userId, postId, callback){
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    readFile('./data/users.json', 'utf8', (error, json) => {
        if(error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error(`user with id ${userId} not found`))
            return
        } 

        readFile('./data/posts.json', 'utf8', (error, json) => {
            if(error){
                callback(error)
                return
            }
    
            const posts = JSON.parse(json)
            const index = posts.findIndex(post => post.id === postId)

            posts.splice(index, 1)
            json = JSON.stringify(posts, null, 4)

            writeFile('./data/posts.json', json, 'utf8', error => {
                if(error){
                    callback(error)
                    return
                }
                callback(null)
            })
        })
    })
}