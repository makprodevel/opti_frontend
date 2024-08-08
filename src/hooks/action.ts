import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { userAction } from '../store/user.slice'
import { chatActions } from '../store/chat.slice'

const actions = {
  ...userAction,
  ...chatActions
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
