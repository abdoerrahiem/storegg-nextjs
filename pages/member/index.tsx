import ContentHead from '../../components/atoms/ContentHead'
import OverviewContent from '../../components/organisms/OverviewContent'
import SideBar from '../../components/organisms/SideBar'
import store from '../../store'
import { getMemberOverview, getProfile } from '../../store/actions'

export default function MemberPage() {
  return (
    <>
      <ContentHead title='Overview' />
      <section className='overview overflow-auto'>
        <SideBar />
        <OverviewContent />
      </section>
    </>
  )
}

export const getServerSideProps = store.getServerSideProps(
  ({ dispatch, getState }) => async ({ req }): Promise<any> => {
    const token = req.cookies.token

    if (token) {
      await dispatch(getProfile(token))
      await dispatch(getMemberOverview(token))

      const { getProfileSuccess } = getState().playerReducer

      if (!getProfileSuccess) {
        return {
          redirect: {
            destination: '/login?page=member',
            permanent: false,
          },
        }
      }
    } else {
      return {
        redirect: {
          destination: '/login?page=member',
          permanent: false,
        },
      }
    }
  }
)
