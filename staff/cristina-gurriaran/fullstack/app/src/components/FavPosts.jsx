import retrieveFavPosts from "../logic/retrieveFavPosts";
import FavPost from "./FavPost"
import { context } from "../ui";
import { useState, useEffect } from "react";
import { useAppContext } from '../hooks'


export default function FavPosts(user){
    const { alert, freeze, unfreeze } = useAppContext()
    const [favPosts, setFavPosts] = useState()

    useEffect(() => renderFavPosts(), [])

    const renderFavPosts = () => {
        freeze()

        try{ 
            retrieveFavPosts(context.token, (error, posts) => {
                unfreeze()
                if(error){
                    alert(error.message)
                    return
                }
                setFavPosts(posts)    
            })
            
        } catch(error) {
            alert(error.message)
        }
    }

    return  <section>
    {favPosts && favPosts.map((post) => <FavPost 
        key={post._id} 
        post={post} 
        user={user} 
    />)}
    </section> 
}