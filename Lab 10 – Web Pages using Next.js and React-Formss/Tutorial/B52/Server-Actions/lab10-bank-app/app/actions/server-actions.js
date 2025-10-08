'use server'

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import accountsRepo from "@/app/repo/accounts-repo"

export async function addOrEditAccountAction(formData) {
    const account = Object.fromEntries(formData)
    if (account.accountNo.length === 0)
        accountsRepo.addAccount(account)
    else
        accountsRepo.updateAccount(account.accountNo, account)
    redirect('/')
}

export async function deleteAccountAction(formData) {
    const accountNo = formData.get('accountNo')
    await accountsRepo.deleteAccount(accountNo)
    // revalidatePath('/')
    redirect('/')
}