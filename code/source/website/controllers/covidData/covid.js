export async function viewAllData(req, res){
    const covidData = req.app.locals.covidData;

    covidData.findOne({}) //we need to find so the returned data to the frontend will be updated to the recent data in the database
    .then(data =>{
        return res.json(data);
    }).catch(error => res.status(500).json("Failed to load database"));

    
}

export async function viewCurrentData(req, res){ //view all the covid data for today
    const covidData = req.app.locals.covidData;

    covidData.findOne({}) //we need to find so the returned data to the frontend will be updated to the recent data in the database
    .then(data =>{
        return res.json({currentDateUploaded: data.currentDateUploaded, overallActiveCases: data.overallActiveCases,currentTotalNewCases: data.currentTotalNewCases, currentTotalRecoveries: data.currentTotalRecoveries, currentTotalDeaths: data.currentTotalDeaths, currentNewCasesBreakdown:data.currentNewCasesBreakdown,currentRecoveriesBreakdown:data.currentRecoveriesBreakdown, currentDeathsBreakdown:data.currentDeathsBreakdown });
    }).catch(error => res.status(500).json("Failed to load database"));
}

export async function viewOverallData(req, res){ //view all the covid data for today
    const covidData = req.app.locals.covidData;

    covidData.findOne({}) //we need to find so the returned data to the frontend will be updated to the recent data in the database
    .then(data =>{
        return res.json({overallActiveCases: data.overallActiveCases, overallTotalCases: data.overallTotalCases, overallDeaths: data.overallDeaths, overallRecoveries: data.overallRecoveries, overallActiveCasesBreakdown:data.overallActiveCasesBreakdown});
    }).catch(error => res.status(500).json("Failed to load database"));
}

export async function uploadCurrentData(req,res){
    const covidData = req.app.locals.covidData;
    const body = req.body;


    covidData.findOne({}) //we need to find so the returned data to the frontend will be updated to the recent data in the database
    .then(data =>{ //the if statement should be turned off when testing the app
        const lastDateUploaded = new Date(data.currentDateUploaded);
        const currentDate = new Date(body.currentDateUploaded);

        if(lastDateUploaded.getTime() !== currentDate.getTime() && currentDate.getTime() >= lastDateUploaded.getTime()){//current date uploaded should not be the same and should be further than the previous data uploaded
            //upload previous current data to history covid data
            const recordDate = lastDateUploaded;
            const newCases = data.currentTotalNewCases;
            const newDeaths = data.currentTotalDeaths;
            const newRecoveries = data.currentTotalRecoveries;
            const activeCases =  data.overallActiveCases;

            covidData.updateOne({}, {$push:{historyCovidData:{recordDate:recordDate, newCases:newCases, newDeaths:newDeaths, newRecoveries:newRecoveries, activeCases:activeCases}}})
            .then(console.log("Previous current covid data uploaded to history"));

            covidData.findOneAndUpdate({}, 
                // set all attributes
                {$set: 
                    {currentDateUploaded:currentDate,currentTotalNewCases: body.currentTotalNewCases, currentTotalRecoveries:body.currentTotalRecoveries, currentTotalDeaths:body.currentTotalDeaths, overallActiveCases: body.overallActiveCases, currentNewCasesBreakdown: body.currentNewCasesBreakdown, currentRecoveriesBreakdown: body.currentRecoveriesBreakdown, currentDeathsBreakdown: body.currentDeathsBreakdown}
                }, 
                // ensures that it will update existing entries and create a new one if there is none yet
                {upsert: true})
                .then(() => {
                    return res.status(200).json(`Successfully added and updated the current covid Data today: ${currentDate}!`);
                }).catch(()=>{ return res.status(500).json("Failed to update your covid database")})
        }
        else{
            return res.status(400).json("Upload date should not be the same and should be greater than the previous upload date");
        }
    }).catch(error => res.status(500).json("Failed to load database"));
}