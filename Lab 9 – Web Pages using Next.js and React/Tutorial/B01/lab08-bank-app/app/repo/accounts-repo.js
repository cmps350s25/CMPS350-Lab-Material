// npm i fs-extra
import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

class AccountsRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), 'app/data/accounts.json')
        this.transFilePath = path.join(process.cwd(), 'app/data/transactions.json')
    }

    async getAccounts(type) {
        const accounts = await fs.readJSON(this.filePath)
        if (type == 'Saving' || type == 'Current')
            return accounts.filter(account => account
                .acctType.toLowerCase() === type.toLowerCase())
        return accounts

    }
    async addAccount(account) {
        if (account.acctType == 'Savings' || account.acctType == 'Current') {
            account.balance = 0
        } else {
            account.balance = -1000
        }

        account.accountNo = nanoid().slice(0, 4)
        const accounts = await this.getAccounts()
        accounts.push(account)
        await fs.writeJSON(this.filePath, accounts)
        return account
    }

    async updateAccount(accountNo, account) {
        const accounts = await fs.readJson(this.filePath)
        const index = accounts.findIndex(acc => acc.accountNo == accountNo)
        if (index >= 0) {
            accounts[index] = account
            await fs.writeJson(this.filePath, accounts)
            return "updated successfully"
        }
        return "Unable to update account because it does not exist"
    }

    async getAccount(accNo) {
        const accounts = await fs.readJson(this.filePath)
        const account = accounts.find(acc => acc.accountNo == accNo)
        if (account)
            return account
        else
            return { errorMessage: 'Account does not exit' }
    }

    async deleteAccount(accNo) {
        const accounts = await fs.readJson(this.filePath)
        const filteredAccounts = accounts.filter(acc => acc.accountNo != accNo)
        await fs.writeJson(this.filePath, filteredAccounts)
        return "deleted successfully"
    }
    async addTransaction(accountNo, transaction) {

        // update the missing information of the transaction object
        transaction.accountNo = accountNo
        transaction.transId = nanoid().slice(0, 4)
        transaction.amount = parseInt(transaction.amount.toString());

        try {
            const accounts = await this.getAccounts();
            const account = accounts.find(account => account.accountNo == accountNo);
            if (transaction.transType == 'Deposit')
                account.balance += transaction.amount;
            else if (transaction.transType == 'Withdraw')
                if (account.balance < transaction.amount)
                    return "Insufficient balance";
                else
                    account.balance -= transaction.amount;


            // update the account
            await fs.writeJSON(this.filePath, accounts)



            // update the transaction file
            transaction.accountBalance = account.balance


            const transactions = await fs.readJson(this.transFilePath)
            transactions.push(transaction)
            await fs.writeJson(this.transFilePath, transactions)



            return { message: 'transaction successful' }
        } catch (err) {
            throw err;
        }
    }


}

export default new AccountsRepo()