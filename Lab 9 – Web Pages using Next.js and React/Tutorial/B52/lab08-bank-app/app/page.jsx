import { Inter } from 'next/font/google'
import AccountsTable from './components/AccountsTable'
import accountRepo from '@/app/repo/accounts-repo'
// import accountRepo from '../app/repo/accounts-repo'
const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  // we will fetch the data here


  // we will get the data
  const accounts = await accountRepo.getAccounts('All')
  return (
    <>
      <AccountsTable initialAccounts={accounts}></AccountsTable>
    </>
  )
}


// Server componenet [server ]
// Client Componenets [any user interaction ] -- onclick, onchange, onsubmit
