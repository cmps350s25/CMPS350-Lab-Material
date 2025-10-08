'use server'
import accountsRepo from "@/app/repo/accounts-repo"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const handleAddOrUpdateAccountAction = async (formData) => {
    const account = Object.fromEntries(formData)
    if (account.accountNo.length == 0)
        await accountsRepo.addAccount(account)
    else
        await accountsRepo.updateAccount(account.accountNo, account)
    redirect('/')
}

export const handleDeleteAccountAction = async (formData) => {
    const accountNo = formData.get('accountNo')


    await accountsRepo.deleteAccount(accountNo)
    redirect('/?')
}