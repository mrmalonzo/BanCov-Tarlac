import React, { useEffect, useState, forwardRef } from "react";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import "../styles/ManageAdmin.css"
import httpServices from "../services/httpServices";
import 'antd/lib/message/style/index.css';
import { message } from "antd";

import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function UpdateHistory({userInfo, setUserInfo}){

    const [covidHistory, setCovidHistory] = useState("");
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: 'Record Date',
            field: 'recordDate',
            editable: 'onAdd',    
        },
        {
            title: 'New Cases',
            field: 'newCases',
            width: '5%',
        },
        {
            title: 'New Recoveries',
            field: 'newRecoveries',
            width: '5%',
        },
        {
            title: 'New Deaths',
            field: 'newDeaths',
            width: '5%',
        },
        {
            title: 'Active Cases',
            field: 'activeCases',
            width: '12%',
        }

    ]

    useEffect(()=>{
        async function viewMainData(){
            setLoading(true);
            try{
                const {data} = await httpServices.viewAllData();
                setCovidHistory(data.historyCovidData);
            }catch (error) {
                console.error(error.message);
              }
              setLoading(false);
        }
        viewMainData();
    }, []);

    const updateHistory = async (data) =>{

        try{
           await httpServices.updateHistory(data);
           message.success(`History Updated!`);
           setTimeout(1000)
           window.location.reload(); //reload after modifying data to get the new database data
        }catch (error) {
            message.error(`${error.response.data}`);
          }

    }
   

    return(
        <div className="manage-main">
            <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
            {!loading && <div className="table-container" id="table-history">
                <MaterialTable title="Update Covid History"
                    data = {covidHistory}
                    columns = {columns}
                    icons={tableIcons}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        pageSizeOptions: [],
                        tableLayout: "fixed",
                    }}

                    editable={{
                        onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  {
                                    // console.log("hello")
                                    let clone = [];
                                    Object.assign(clone, covidHistory);
                                    const index = covidHistory.indexOf(oldData);
                                       clone[index] = newData;
                                       console.log(clone[index]);
                                       updateHistory(clone[index]); //pass the history            
                                       resolve();
                                  }
                                  resolve();
                            }, 1000);
                          }),
                          
                    }}
                />
            </div>} 
            <Footer />
        </div>
    );
}