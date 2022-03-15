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

export default function ManageAdmin({userInfo, setUserInfo}){

    const [adminList, setAdminList] = useState("");
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: 'Name',
            field: 'name',    
        },
        {
            title: 'Username',
            field: 'username',
        },
        {
            title: 'Password',
            field: 'password',
        },
        {
            title: 'Email',
            field: 'email',
            width: '20%',
            editable: 'onAdd',
        }

    ]

    useEffect(()=>{
        async function viewAllAdmins(){
            setLoading(true);
            try{
                const {data} = await httpServices.viewAllAdmins();
                setAdminList(data);
            }catch (error) {
                console.error(error.message);
              }
              setLoading(false);
        }
        viewAllAdmins();
    }, []);

    const addAdmin = async (data) =>{

        try{
           await httpServices.addAdmin(data);
           message.success(`Admin ${data.name} Added Successfully!`);
           setTimeout(1000)
           window.location.reload(); //reload after modifying data to get the new database data
        }catch (error) {
            message.error(`${error.response.data}`);
          }

    }

    const updateAdmin = async (data) =>{

        try{
           await httpServices.updateAdmin(data);
           message.success(`Admin ${data.name} Updated!`);
           setTimeout(1000)
           window.location.reload(); //reload after modifying data to get the new database data
        }catch (error) {
            message.error(`${error.response.data}`);
          }

    }

    const deleteAdmin = async (data) =>{

        try{
           await httpServices.deleteAdmin(data);
           message.success(`Admin ${data.name} Deleted!`);
           setTimeout(1000)
           window.location.reload(); //reload after modifying data to get the new database data
        }catch (error) {
            message.error(`${error.response.data}`);
          }

    }

    

    return(
        <div className="manage-main">
            <NavBar userInfo={userInfo} setUserInfo={setUserInfo}/>
            {!loading && <div className="table-container">
                <MaterialTable title="List of Admins"
                    data = {adminList}
                    columns = {columns}
                    icons={tableIcons}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10,
                        pageSizeOptions: [],
                        tableLayout: "fixed",
                    }}

                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  {
                                    let clone = [];
                                    Object.assign(clone, adminList.data);
                                    const index = adminList.indexOf(oldData);
                                       clone[index] = newData;
                                       console.log(clone[index]);
                                       updateAdmin(clone[index]); //pass the email            
                                       resolve();
                                  }
                                  resolve();
                            }, 1000);
                          }),
                          onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    console.log(newData);
                                    addAdmin(newData);
                                    resolve();
                                }, 1000);
                            }),
                          onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    console.log(oldData);
                                    deleteAdmin(oldData)
                                    resolve();
                                }, 1000);
                            })
                    }}
                />
            </div>}
            <Footer />
        </div>
    );
}