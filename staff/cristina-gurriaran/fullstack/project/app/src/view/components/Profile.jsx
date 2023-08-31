import updateUserAvatar from '../../logic/updateUserAvatar'
import updateUserPassword from '../../logic/updateUserPassword'
import { context } from '../../ui'
import retrieveUser from '../../logic/retrieveUser'
import { useState, useEffect} from "react"
import { useAppContext , useHandleErrors} from '../hooks'
import { Container, Form, Input, Button } from '../library'
import FavWorkspots from './FavWorkspots'
import logoutUser from '../../logic/logoutUser'




export default function Profile({ onUserAvatarUpdated, onUpdatedUserPassword }) {
    const { alert } = useAppContext()
    const handleErrors = useHandleErrors()
    const { navigate } = useAppContext()

    const [view, setView] = useState('fav-workspots')
    const [user, setUser] = useState()

    useEffect(() => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }, [])

    const handleUpdateAvatar = event => {
        event.preventDefault()

        const avatar = event.target.url.value

        handleErrors(async () => {
            await updateUserAvatar(avatar)

            onUserAvatarUpdated()
        })
    }

    function handleUpdatePassword(event){
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        handleErrors(async () => {
            await updateUserPassword(password, newPassword, newPasswordConfirm)

            onUpdatedUserPassword()
        })
    }

    const handleLogout = () => {
        logoutUser()

        navigate('/login')
    }

    console.log('Profile -> render')

    return <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">

        {user && <div>
            <section className="mx-auto max-w-xl">
                <div className="flex flex-col items-center gap-2">
                    <img 
                        className="w-1/4 rounded-full border-4 border-gray-light" 
                        src={user.avatar} 
                        alt="" 
                    />
                    <h1 className="text-2xl text-gray-dark font-bold sm:text-3xl">{user.name}</h1>
                </div>
            </section>

            <section className="mx-auto max-w-xl m-10 flex flex-col gap-10">
                <div className="">
                    <h1 className="text-xl text-gray-dark">Update avatar</h1>
                        <form 
                            onSubmit={handleUpdateAvatar}>
                            <Input 
                                type='url' 
                                name='url'
                                placeholder="Url image"
                                />
                        <Button type='submit'>Update</Button>
                        </form>
                </div>

                <div>
                    <h1 className="text-xl text-gray-dark">Update password</h1>
                        <form 
                            onSubmit={handleUpdatePassword}
            
                        >
                            <Input type='password' name='password' placeholder='Old password*'/>
                            <Input type='password' name='newPassword' placeholder='New password*'/>
                            <Input type="password" name='newPasswordConfirm' placeholder='Confirm new password*'/>
                            <Button type='submit'>Update</Button>
                        </form>
                </div>  
                <Button onClick={handleLogout}>Logout</Button>

            </section>
            
        </div>}
    </div>
}