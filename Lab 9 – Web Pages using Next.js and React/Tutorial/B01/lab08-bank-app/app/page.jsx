import { Inter } from 'next/font/google'
import AccountsTable from './components/AccountsTable'
const inter = Inter({ subsets: ['latin'] })
import accountRepo from '@/app/repo/accounts-repo'

export default async function Home() {

  const accounts = await accountRepo.getAccounts('all')
  return (
    <>
      <AccountsTable initialAccounts={accounts} />
    </>
  )
}

