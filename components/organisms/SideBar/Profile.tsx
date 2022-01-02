import { useSelector, RootStateOrAny } from 'react-redux'
import { IMAGE_API } from '../../../utils'

export default function Profile() {
  const { getProfileSuccess } = useSelector(
    (state: RootStateOrAny) => state.playerReducer
  )

  return (
    <div className='user text-center pb-50 pe-30'>
      <img
        src={`${IMAGE_API}/${getProfileSuccess?.avatar}`}
        width='90'
        height='90'
        className='img-fluid mb-20 rounded-circle'
      />
      <h2 className='fw-bold text-xl color-palette-1 m-0'>
        {getProfileSuccess?.name}
      </h2>
      <p className='color-palette-2 m-0'>{getProfileSuccess?.email}</p>
    </div>
  )
}
