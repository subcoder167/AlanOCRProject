import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker, Breadcrumb, Card, Icon, Typography, TimePicker, Modal, Tabs, Row, Col, Dropdown, Menu, Button, Input, Form, Table } from "antd";
import Column from "antd/lib/table/Column";
// import MobileView from "./";
const { Title } = Typography;

const MobileView =() => {
    // const [resourceType, setResourceType] = useState('all');
    // const [items, setItems] = useState([]);
    // useEffect(()=>{fetch(`https://alan.dojoapi.co.in/img_upl/mobile_image_upl/${resourceType}/`).then((result)=>{
    //     result.json().then(json => setItems(json))
    // })},[resourceType]);
    return(
        <Fragment>
            <div className="gx-mb-10">
                <Title level={3}>Add  File</Title>
                {/* <section className="Filter" style={{background:"#F7F7F7",display:"flex",alignItems: "center",justifyContent: "space-evenly"}}>
                    <span className="tab active" style={{color:"green"}} id="inbox"  onClick={()=>setResourceType('all')}>Inbox</span>
                    <span className="tab" id="review" onClick={()=>setResourceType('review')}>Not Reviewed</span>
                    <span className="tab" id="processed" onClick={()=>setResourceType('process')}>Processing</span>
                    <span id="trash" onClick={()=>setResourceType('trash')}>Trash</span>
        
                </section>
                <Table style={{background:"#fff",color:"green"}} dataSource={items} pagination={false}>
                    <Column align="center" title="Status" dataIndex="image_status" key="status" />
                    <Column align="center" title="Vendor" dataIndex="uploaded_by" key="vendor" />
                    <Column align="center" title="Invoice Date" dataIndex="uploaded_at" key="invoiceDate" />
                    <Column align="center" title="Amount" dataIndex="amount" key="amount" />
                </Table> */}
                <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",marginTop:"100px"}}>
                    <div style={{width:"80%",border:"1px solid green",textAlign:"left",padding:"20px",fontWeight:"bold",margin:"20px",borderRadius:"5px"}}><Link to="/camera">Capture</Link></div>
                    <div style={{width:"80%",border:"1px solid green",textAlign:"left",padding:"20px",fontWeight:"bold",margin:"20px",borderRadius:"5px"}}>Upload Photos</div>
                    <div style={{width:"80%",border:"1px solid green",textAlign:"left",padding:"20px",fontWeight:"bold",color:"white",backgroundColor:"green",margin:"20px",borderRadius:"5px"}}>Manual Entry</div>
                </div>
                <div className="footer" style={{background:"#fff",width:"100%",height:"50px",borderRadius:"25px 25px 0 0",boxShadow:"0 0 5px #e5e5e5",position:"fixed",bottom:"0px",left:"0px",marginLeft:"0px",padding:"10px",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                <Link to="/mobileview">
                        <Icon type="menu" style={{color:"black"}}/>
                    </Link>
                    <Link to="/mobileimageview">
                        <Icon type="file-image" style={{color:"black"}}/>
                    </Link>
                    <Link to="/mobileview">
                        <Icon type="caret-left" style={{color:"green",transform:"scale(1.7)"}}/>
                    </Link>
                    <Link to="/settings">
                        <Icon type="align-center" style={{color:"black"}}/>
                    </Link>
                    <Link to="/superadmin">
                        <Icon type="search" style={{color:"black"}}/>
                    </Link>
                </div>
            </div>
        </Fragment >
    );
};

export default MobileView;