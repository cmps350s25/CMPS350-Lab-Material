
// This is a copy do not use

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const baseUrl = '/api/accounts'

class AccountRepo {
    //returns all the accounts depending on the type the user selected
    async getAccounts(acctType) {
        const response = await fetch(
            `http://localhost:3000/api/accounts?type=${acctType}`
        )
        return response.json()
    }
    async deleteAccount(accountNo) {
        const response = await fetch(
            `http://localhost:3000/api/accounts/${accountNo}`,
            { method: 'DELETE' }
        )
        return response.json()
    }

    async addAccount(account) {
        const response = await fetch(`http://localhost:3000/api/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        }
        )
        return response.json()
    }

    async updateAccount(account) {
        const response = await fetch(`http://localhost:3000/api/accounts/${account.accountNo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        })
        return response.json()
    }

    async addTrans(trans) {
        const response = await fetch(`http://localhost:3000/api/accounts/${trans.accountNo}/trans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trans)
        })
        return response.json()
    }
}

export default new AccountRepo()
