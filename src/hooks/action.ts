import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { chatActions } from '../store/chat'
import { loginAction } from '../store/login'
import { nicknameAction } from '../store/nickname'

const actions = {
  ...chatActions,
  ...loginAction,
  ...nicknameAction
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
