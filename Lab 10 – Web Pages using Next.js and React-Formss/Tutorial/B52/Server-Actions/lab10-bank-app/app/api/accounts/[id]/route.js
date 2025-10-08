import accountRepo from "@/app/repo/accounts-repo";
export async function GET(request, { params }) {
    const accountNo = params.id;
    const account = await accountRepo.getAccount(accountNo)
    return Response.json(account, { status: 200 });
}

export async function PUT(request, { params }) {
    const accountNo = params.id;
    const account = await request.json()
    const updatedAccount = await accountRepo.updateAccount(accountNo, account)
    return Response.json(updatedAccount)
}
export async function DELETE(request, { params }) {
    const { id } = params;
    const account = await accountRepo.deleteAccount(id)
    return Response.json(account, { status: 200 });
}