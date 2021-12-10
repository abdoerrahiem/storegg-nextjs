import SideBar from '../../../components/organisms/SideBar'
import TransactionContent from '../../../components/organisms/TransactionContent'

export default function TransactionsPage() {
  return (
    <section className='transactions overflow-auto'>
      <SideBar />
      <TransactionContent />
    </section>
  )
}
