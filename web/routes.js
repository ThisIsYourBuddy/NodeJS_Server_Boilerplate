module.exports = function(app, models){

    // Api code to register new user.
    app.post('/web/registerVisit', (req, res) => {
        const { 
            customerCompanyName,
            customerRegion,
            customerDetails,
            customerPurpose,
            startDate,
            endDate,
            createdBy
        } = req.body;
        if(typeof customerCompanyName === 'undefined' || typeof customerRegion === 'undefined' || typeof customerDetails === 'undefined' || typeof customerPurpose === 'undefined' || typeof startDate === 'undefined' || typeof endDate === 'undefined' || typeof createdBy === 'undefined'){
            res.status(400).send('Bad request');
            return;
        }
        models.registerVisit(customerCompanyName,customerRegion,customerDetails,customerPurpose,startDate,endDate,createdBy)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Internal server error');
        })
    })

}