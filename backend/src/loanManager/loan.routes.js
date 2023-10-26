module.exports=({
    LoanController,
    router,
    makeExpressCallback
})=>{
    router.get('/viewAll', makeExpressCallback(LoanController.getLoan));
   
    router.delete('/:id',makeExpressCallback(LoanController.deleteLoan));
    router.put('/status/:id', makeExpressCallback(LoanController.updateLoanStatus));
    router.post('/search', makeExpressCallback(LoanController.searchLoan));
    return router;
}