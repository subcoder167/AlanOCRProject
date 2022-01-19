import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker, Breadcrumb, Card, Icon, Typography, TimePicker, Modal, Tabs, Row, Col, Dropdown, Menu, Button, Input, Form, Table } from "antd";
import Column from "antd/lib/table/Column";
// import MobileView from "./";
const { Title } = Typography;

const MobileImageView =() => {
    const [resourceType, setResourceType] = useState('all');
    const [imgSrc, setImgSrc] = useState(imgurl);
    var imgurl=`https://alan.dojoapi.co.in/media/images/${imgSrc}`;
    const [counter,setcounter]= useState(0);
    const [dataindex, setdataindex] = useState(0);
    const [items, setItems] = useState([]);

    const [dataset,setDataset]= useState({});
    useEffect(()=>{fetch(`https://alan.dojoapi.co.in/img_upl/mobile_image_upl/${resourceType}/`).then((result)=>{
        result.json().then(json => setItems(json))
        if(items.length<1)
        setcounter(counter+1);
        console.log(items);
    })},[resourceType,imgSrc,counter])

    
    return(
        <Fragment>
            <div className="gx-mb-10">
                {/* <Breadcrumb>
                    <Breadcrumb.Item>
                        <span className="gx-link">
                            <Icon type="home" />
                        </span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span className="gx-link">
                            <span>Expense</span>
                        </span>
                    </Breadcrumb.Item>
                </Breadcrumb> */}
                <Title level={3}>Expenses</Title>
                <section className="Filter" style={{background:"#F7F7F7",display:"flex",alignItems: "center",justifyContent: "space-evenly"}}>
                    <span className="tab active" style={{color:"green"}} id="inbox"  onClick={()=>setResourceType('all')}>Inbox</span>
                    <span className="tab" id="review" onClick={()=>setResourceType('review')}>Not Reviewed</span>
                    <span className="tab" id="processed" onClick={()=>setResourceType('process')}>Processing</span>
                    {/* <span id="trash" onClick={()=>setResourceType('trash')}>Trash</span> */}
                    {/* <span onClick={() => setResourceType('all')}>All</span>
                    <span onClick={() => setResourceType('review')}>Review</span>
                    <span onClick={() => setResourceType('trash')}>Trash</span> */}
        
                </section>
                        
                  

                
                <section style={{position:"relative"}}>
                    <span>Vendor: {dataset.vendor} </span>
                    <img style={{width:"90vw",height:"90vw"}} src={`https://alan.dojoapi.co.in/media/images/${imgSrc}`}/>
                    <section className="imageBottomWrapper" style={{position:"relative",width:"100%",display:"flex",alignItems:"flex-start",justifyContent:"space-evenly"}}>
                    <span> Invoice Number: {dataset.invoice} </span> <span>Amount: {dataset.amount} </span> 
                    </section>
                </section>
                <Table style={{background:"#fff",color:"green"}} dataSource={items} pagination={false}
                onRow={(r,rowIndex) => ({
                    onClick: (e) => {setImgSrc(items[rowIndex].image_name)
                             // console.log(items.image_id);
                             // setdataindex(items.findIndex(obj => obj.image_name===imgSrc))
                             document.body.scrollTop = 0;
                            
                            console.log("Curent src",imgSrc);
                                console.log(items[rowIndex].information.shipping_address)
                                setdataindex(rowIndex)
                                setDataset(
                                    {
                                        "vendor":items[rowIndex].information.shipping_address[0][0][0]+" "+items[rowIndex].information.shipping_address[0][1][0],
                                        "invoice":items[rowIndex].information.invoice_number[0],
                                        "amount":items[rowIndex].information.total[0]
                                    }
                                )
                            
                             
                            //  console.log(items[dataindex].information.lines[0]);
                            //  console.log("ordereed items ",items[dataindex]);
                }})}
                    >
                    {/* <div className="table-wrapper">  */}
                    <Column align="center" title="Status" dataIndex="image_status" key="status" />
                    <Column align="center" title="Vendor" dataIndex="information.shipping_address[0][0][0]" key="vendor" />
                    <Column align="center" title="Invoice Date" dataIndex="uploaded_at" key="invoiceDate" />
                    {/* <Column align="center" title="Invoice Number" dataIndex="image_id" key="invoiceNumber" /> */}
                    <Column align="center" title="Amount" dataIndex="information.total[0]" key="total" />
                    {/* <Column align="center" title="Posted By" dataIndex="uploaded_by" key="postedBy" /> */}
                    {/* <Column align="center" title="Actions" dataIndex="ot" key="actions" /> */}
                    {/* <Column align="center" title="DOT" dataIndex="dot" key="dot" />
                    <Column align="center" title="U.Breaks" dataIndex="uBreaks" key="uBreaks" />
                    <Column align="center" title="P.Breaks" dataIndex="pBreaks" key="pBreaks" />
                    <Column align="center" title="T.P.Breaks" dataIndex="tpBreaks" key="tpBreaks" />
                    <Column align="center" title="Est. Wages" dataIndex="estWages" key="estWages" /> */}
                    {/* <Column
                        align="center"
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(value, record) => (
                            record.date !== "Total" &&
                            <Fragment>
                                <Icon className="cursor-pointer gx-mr-2" type="camera" theme="filled" style={{ fontSize: "18px", color: "#757575" }} />
                                <Icon className="cursor-pointer gx-mr-2" type="clock-circle" style={{ fontSize: "18px", color: "#757575" }} onClick={(e) => addTimeFunc(e)} />
                                <Icon className="cursor-pointer" type="delete" style={{ fontSize: "18px", color: "#757575" }} />
                            </Fragment>
                        )}
                    /> */}
                    {/* </div> */}
                </Table>
                <div className="footer" style={{background:"#fff",width:"100%",height:"50px",borderRadius:"25px 25px 0 0",boxShadow:"0 0 5px #e5e5e5",position:"fixed",bottom:"0px",left:"0px",marginLeft:"0px",padding:"10px",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                <Link to="/mobileview">
                        <Icon type="menu" style={{color:"black"}}/>
                    </Link>
                    <Link to="/mobileimageview">
                        <Icon type="file-image" style={{color:"black"}}/>
                    </Link>
                    <Link to="/mobileoverview">
                        <Icon type="plus-circle" style={{color:"green",transform:"scale(1.7)"}}/>
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

export default MobileImageView;