module.exports = (config, MongoClient, ObjectId) => {
    const models = {};

    MongoClient.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}`, { useNewUrlParser: true }, (error, client) => {
        if(error){
            console.log("Not able to connect to database");
            process.exit(1);
        }

        // Code for specifying collection.
        const db = client.db(config.mongodb.database);

        // Database model for registering new Visit.
        models.registerVisit = (customerCompanyName,customerRegion,customerDetails,customerPurpose,startDate,endDate,createdBy) => new Promise((resolve, reject) => {
            var date = new Date();
            var time = date.getTime();
            const userObj = {
                customerCompanyName,
                customerRegion,
                customerDetails,
                customerPurpose,
                startDate,
                endDate,
                createdBy,
                timestamp: time,
                isCheckIn: false
            }
            db.collection('vms_visits').insertOne(userObj, (err, result) => {
                if(err){
                    reject(err);
                } else{
                    resolve({status: true, _id: result.insertedId});
                }
            })
        });

        // Database model for login existing user.
        // models.loginUser = (emailId, password) => new Promise((resolve, reject) => {
        //     const userObj = {
        //         emailId,
        //         password
        //     }
        //     db.collection('tspace_users').findOne(userObj, { projection: { password: 0 } }, (err, result) => {
        //         if(err){
        //             reject(err);
        //         } else{
        //             if(result === null){
        //                 resolve({status: "Invalid Credentials"})
        //             } else{
        //                 resolve(result);
        //             }
        //         }
        //     })
        // });

    })

    return models;
}