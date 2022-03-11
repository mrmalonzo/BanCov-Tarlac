import { sumValues } from "../../utils/middleware.js";

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

        //comment for testing
        if(lastDateUploaded.getTime() !== currentDate.getTime() && currentDate.getTime() >= lastDateUploaded.getTime()){//current date uploaded should not be the same and should be further than the previous data uploaded
        // if(true){    
        //upload previous current data to history covid data
            const recordDate = lastDateUploaded;
            const newCases = data.currentTotalNewCases;
            const newDeaths = data.currentTotalDeaths;
            const newRecoveries = data.currentTotalRecoveries;
            const activeCases =  data.overallActiveCases;

            covidData.updateOne({}, {$push:{historyCovidData:{recordDate:recordDate, newCases:newCases, newDeaths:newDeaths, newRecoveries:newRecoveries, activeCases:activeCases}}})
            .then(console.log("Previous current covid data uploaded to history"));

            //find the overall counts of the ff
            const currentTotalNewCases = sumValues(body.currentNewCasesBreakdown);
            const currentTotalRecoveries = sumValues(body.currentRecoveriesBreakdown);
            const currentTotalDeaths = sumValues(body.currentDeathsBreakdown);
            const overallActiveCases = sumValues(body.overallActiveCasesBreakdown);

            covidData.findOneAndUpdate({}, 
                // set all attributes
                {$set: 
                    {currentDateUploaded:currentDate,currentTotalNewCases: currentTotalNewCases,
                         currentTotalRecoveries:currentTotalRecoveries,
                          currentTotalDeaths:currentTotalDeaths,
                           overallActiveCases:overallActiveCases,
                            currentNewCasesBreakdown: body.currentNewCasesBreakdown,
                             currentRecoveriesBreakdown: body.currentRecoveriesBreakdown, 
                             currentDeathsBreakdown: body.currentDeathsBreakdown,
                            overallActiveCasesBreakdown: body.overallActiveCasesBreakdown
                            }
                }, 
                // ensures that it will update existing entries and create a new one if there is none yet
                {upsert: true})
                .then(() => {
                    return res.status(200).json(`Successfully added and updated the current covid Data today: ${currentDate}!`);
                }).catch(()=>{ return res.status(500).json("Failed to update your covid database")})
        }
        else{
            return res.status(400).json("You've already uploaded today! Go to the Modify Page if you want to change the Covid data for today");
        }
    }).catch(error => res.status(500).json("Failed to load database"));
}

//Change Overall covidData
export async function changeOverallCovidData(req, res){
    const covidData = req.app.locals.covidData;
    const body = req.body;


    covidData.findOne({})
    .then(data => { 
        
        covidData.findOneAndUpdate({}, //first find the main data changed and set them
            {$set: 
                {overallDeaths: (body.overallDeaths ? body.overallDeaths:data.overallDeaths),
                overallRecoveries: (body.overallRecoveries ? body.overallRecoveries:data.overallRecoveries),
                currentTotalNewCases: (body.currentTotalNewCases ? body.currentTotalNewCases:data.currentTotalNewCases), 
                currentTotalRecoveries: (body.currentTotalRecoveries ? body.currentTotalRecoveries:data.currentTotalRecoveries),
                currentTotalDeaths: (body.currentTotalDeaths ? body.currentTotalDeaths:data.currentTotalDeaths), 
                overallActiveCases: (body.overallActiveCases ? body.overallActiveCases:data.overallActiveCases),  
                overallTotalCases: (body.overallTotalCases ? body.overallTotalCases:data.overallTotalCases),
                historyCovidData: (body.historyCovidData ? body.historyCovidData:data.historyCovidData),//this should be changed 
                currentNewCasesBreakdown: (body.currentNewCasesBreakdown ? body.currentNewCasesBreakdown:data.currentNewCasesBreakdown),
                currentRecoveriesBreakdown: (body.currentRecoveriesBreakdown ? body.currentRecoveriesBreakdown:data.currentRecoveriesBreakdown),
                currentDeathsBreakdown: (body.currentDeathsBreakdown ? body.currentDeathsBreakdown:data.currentDeathsBreakdown),
                overallActiveCasesBreakdown: (body.overallActiveCasesBreakdown ? body.overallActiveCasesBreakdown:data.overallActiveCasesBreakdown),
            }} )
            .then(res.json("Data change uploaded successfully!"))
           
          // now upload the changes in the history covid data if there are any  
        // if(body.covidData){
        //     let toCreate = body.historyCovidData.map(historyCovidData =>{
        //         replaceOne:{
        //             filter:{recordDate: historyCovidData.recordDate}
        //             replacement:{newCases: historyCovidData.newCases }
        //         }
        //     })
        // }

    }).catch(error => res.status(500).json("Failed to load database"));
}