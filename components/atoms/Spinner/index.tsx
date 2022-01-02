import Loader from 'react-loader-spinner'

export default function Spinner() {
  return (
    <Loader
      type='Oval'
      color='#fff'
      height={25}
      width={25}
      // timeout={3000}
    />
  )
}
