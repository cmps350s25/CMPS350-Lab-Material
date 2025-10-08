'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import accountsRepo from '@/app/repo/accounts-repo'


export const handleUpsertAccountAction = async function (formData) {
    console.log('handleUpsertAccountAction', formData);

    const account = Object.fromEntries(formData)
    if (account.accountNo.length > 2)
        await accountsRepo.updateAccount(account.accountNo, account)
    else
        await accountsRepo.addAccount(account)

    redirect('/')
}