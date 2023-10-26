module.exports=({
    LoanController,
    router,
    makeExpressCallback
})=>{
    router.get('/viewAll', makeExpressCallback(LoanController.getLoan));
    router.delete('/:id',makeExpressCallback(LoanController.deleteLoan));
    router.put('/status/:id', makeExpressCallback(LoanController.updateLoanStatus));
    router.post('/search', makeExpressCallback(LoanController.searchLoan));
    router.post('/requrie', makeExpressCallback(LoanController.requrieLoan));
    router.get('/viewloanType', makeExpressCallback(LoanController.getloantype));


    return router;
}