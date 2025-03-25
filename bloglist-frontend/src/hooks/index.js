import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'

export const useNotification = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useSetNotification = () => {
  const [, dispatch] = useContext(NotificationContext)
  return (action, timeout) => {
    dispatch(action)

    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout * 1000)
  }
}

export const useUser = () => {
  const [user] = useContext(UserContext)
  return user
}

export const useSetUser = () => {
  const [, dispatch] = useContext(UserContext)
  return dispatch
}
