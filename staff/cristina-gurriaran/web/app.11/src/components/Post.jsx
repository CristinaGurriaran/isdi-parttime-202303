import { context } from '../ui'
import toggleLikePost from '../logic/toggleLikePost'
import deletePost from '../logic/deletePost'
import toggleSavePost from '../logic/toggleSavePost'

export default function Post({ post: { id, image, text, date, likes, author }, onEditPost, onToggledLikePost, onPostDeleted, onToggledSavedPost}) {
    
    const handleEditPost = () => onEditPost(id)

    const handleToggleLikePost = () => {
        try {
            toggleLikePost(context.userId, id)

            onToggledLikePost()
        } catch(error) {
            alert(error.message)
        }
    }

    const handleDeletePost = () => {
        try {
            deletePost(context.userId, id)

            onPostDeleted()
        } catch(error) {
            alert(error.message)
        }
    }

    const handleToggleSavePost = () => {
        try {
            toggleSavePost(context.userId, id)

            onToggledSavedPost()
        } catch(error) {
            alert(error.message)
        }
    }

    console.log('Post -> render')
    
    return <article>
        <img src={image} width="400px" />
        <p>{text}</p>
        <time>{date.toLocaleString()}</time>
        <button onClick={handleToggleLikePost}>{likes && likes.includes(context.userId) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
        {author === context.userId && <button onClick={handleEditPost}>📝</button>}
        {author === context.userId && <button onClick={handleDeletePost}>🗑</button>}
        {author === context.userId && <button onClick={handleToggleSavePost}>🔰</button>}
    </article>
}