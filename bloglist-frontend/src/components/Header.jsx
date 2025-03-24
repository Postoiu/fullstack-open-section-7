import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import { logout } from '../reducers/authReducer'

const Header = () => {
  const user = useSelector(({ auth }) => auth)
  const dispatch = useDispatch()

  return (
    <>
      <Notification />
      <h1>blogs app</h1>
    </>
  )
}

export default Header
