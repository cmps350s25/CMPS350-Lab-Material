import accountRepo from "@/app/repo/accounts-repo";

export async function POST(request, { params }) {
    const accountNo = params.id
    const transaction = await request.json()
    console.log(transaction);
    const response = await accountRepo.addTransaction(accountNo, transaction)
    return Response.json(response)
}
export async function GET(request, { params }) {
    const accountNo = params.id
    const transactions = await accountRepo.getTransactions(accountNo)
    return Response.json(response)
}