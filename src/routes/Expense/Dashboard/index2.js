import Slider from "react-slick";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { DatePicker, Breadcrumb, Card, Icon, Typography, TimePicker, Modal, Tabs, Row, Col, Dropdown, Menu, Button, Input, Form, Table } from "antd";
import Column from "antd/lib/table/Column";
import TimeCard from './TimeCardHistory'
import CustomArrows from './Slider'
import FusionCharts from "fusioncharts";
import MyComponent from './BarChart'
import ReactImageMagnify from "react-image-magnify";
import ReactImageZoom from 'react-image-zoom';
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { color } from "highcharts";
import { over } from "lodash";


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

// const [resourceType, setResourceType] = useState('posts');
// const [items, setItems] = useState([])

// useEffect(() => {
//     fetch(`http://127.0.0.1:8000/img_upl/mobile_image_upl/${resourceType}`)
//       .then(responses => responses.json())
//       .then(json => setItems(json))
//   }, [resourceType])

const { RangePicker } = DatePicker;
const { Title } = Typography;
charts(FusionCharts);

const getTimeStamp = () => {
    let d = new Date();
    let n = d.getTime();
    return n;
}

const tableData = [
    {
        status: "Good",
        vendor: "Sysco",
        invoiceDate: "12/01/2021",
        invoiceNumber: "0987654",
        amount: "$123.22",
        postedBy: "Dropbox",
        resolve: "resolved",
        archive: "archived",
        key:"1",
        uBreaks: "0",
        pBreaks: "0",
        tpBreaks: "9.2",
        estWages: "$102.40"
    },
    {
        status: "Good",
        vendor: "Individual Foods",
        invoiceDate: "12/01/2021",
        invoiceNumber: "N2345671",
        amount: "$240.10",
        postedBy: "Tim N.",
        resolve: "resolved",
        archive: "non_archived",
        key:"2",
        uBreaks: "0",
        pBreaks: "0",
        tpBreaks: "8",
        estWages: "$88"
    },
    {
        status: "Moderate",
        vendor: "Individual Foods",
        invoiceDate: "12/01/2021",
        invoiceNumber: "N2345671",
        amount: "$240.10",
        postedBy: "Tim N.",
        resolve: "not_resolved",
        archive: "non_archived",
        key:"3",
        uBreaks: "0",
        pBreaks: "0",
        tpBreaks: "6",
        estWages: "$66"
    },
    {
        status: "Good",
        vendor: "Sysco",
        invoiceDate: "12/01/2021",
        invoiceNumber: "0987654",
        amount: "$23.05",
        postedBy: "Thomas G.",
        resolve: "resolved",
        archive: "non_archived",
        uBreaks: "0",
        pBreaks: "0",
        tpBreaks: "4",
        key:"4",
        estWages: "$44"
    },
    // {
    //     date: "Total",
    //     reg: "26",
    //     ot: "1.2",
    //     dot: "0",
    //     uBreaks: "0",
    //     pBreaks: "0",
    //     key:"5",
    //     tpBreaks: "27.2",
    //     estWages: "$300.40"
    // }
];

const TableDataByDate = [
    {
        name: 'Jason Bourne',
        wadge_rate: '$11',
        Time_card: '01:00pm - 5:00pm',
        job_title: 'Manager',
        department: 'Back',
        reg: '8',
        ot: '1.2',
        uBreaks: '0',
        key:"6",
        paid_breaks: '2',
        tp_hours: '0',
        est_wages: '$102.68'
    },
    {
        name: 'Jason Bourne',
        wadge_rate: '$11',
        Time_card: '01:00pm - 5:00pm',
        job_title: 'Manager',
        department: 'Back',
        reg: '8',
        ot: '1.2',
        key:"7",
        uBreaks: '0',
        paid_breaks: '2',
        tp_hours: '0',
        est_wages: '$102.68'
    },
    {
        name: 'Jason Bourne',
        wadge_rate: '$11',
        Time_card: '01:00pm - 5:00pm',
        job_title: 'Manager',
        department: 'Back',
        reg: '8',
        key:"8",
        ot: '1.2',
        uBreaks: '0',
        paid_breaks: '2',
        tp_hours: '0',
        est_wages: '$102.68'
    },
    {
        name: 'Jason Bourne',
        wadge_rate: '$11',
        Time_card: '01:00pm - 5:00pm',
        job_title: 'Manager',
        department: 'Back',
        reg: '8',
        ot: '1.2',
        key:"9",
        uBreaks: '0',
        paid_breaks: '2',
        tp_hours: '0',
        est_wages: '$102.68'
    }
]


function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green", left: '-21px' }}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, right: '20px' }}
            onClick={onClick}
        />
    );
}

const Index = (props) => {
    const [imgSrc, setImgSrc] = useState(imgurl);
    const imgprops = {width: 400, height: 500, zoomWidth: 400, zoomPosition: 'original', img: `https://alan.dojoapi.co.in/media/images/${imgSrc}`};
    var imgurl=`https://alan.dojoapi.co.in/media/images/${imgSrc}`;
    
    const [dataindex, setdataindex] = useState(0);
      const [resourceType, setResourceType] = useState('all');

    const [items, setItems] = useState([])
    const [counter, setcounter] = useState(0)
     
   
    const [itemset,setItemset]=useState();
    useEffect(()=>{fetch(`https://alan.dojoapi.co.in/img_upl/mobile_image_upl/${resourceType}/`).then((result)=>{
        result.json().then(json => setItems(json))
        // setItemset(...items,...items)
        if(items.length<1)
        setcounter(counter+1);
        console.log(items);
    })},[resourceType,imgSrc,counter])
    // fetch("https://alan.dojoapi.co.in/img_upl/mobile_image_upl/all/?format=api").then((result)=>{
    //     result.json().then((resp)=>{
    //         console.warn("result",resp)
    //     })
    // }
    const [loader, setLoader] = useState(false);
    const [visible, setVisible] = useState(false)
    const [visibleAddTimeCard, setVisibleAddTimeCard] = useState(false)
    const [formTab, setFormTab] = useState("1");
    const [groupByDate, setGroupByDate] = useState(false)
    const [groupByUser, setGroupByUser] = useState(true)
    const [groupByGraph, setGroupByGraph] = useState(false)
    const [groupByUserWithoutGraph, setGroupByUserWithoutGraph] = useState(true)
    const [visibleOnclickRow, setVisibleOnclickRow] = useState(false)
    const [visibleOnclickGraph, setVisibleOnclickGraph] = useState(false)
    const [filter, SetFilter]= useState('Inbox');
    const handleMenuClick = value => {

    };
    function checkIndex()
    {
     items.find(function(item, i){
        if(item.image_name === imgSrc){
        setdataindex(i);
        }
       });
    }
const [dataSet,setdataSet] =useState(
        [
            // {
            //     "ItemNo":"",
            //     "Qtyordered":"",
            //     "unit":"",
            //     "description":"",
            //     "unitPrice":"",
            //     "Price":""
            // }
        ])
        
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        lazyLoad: true,
        centerMode: true,
        adaptiveHeight: true,
        fade: true,
        arrows: true,
        autoplaySpeed: 5000,
        className: 'slides'
    };

    const { getFieldDecorator } = props.form;

    const handleOk = (e) => {
        console.log(e)
    }

    const handleOkAddTimeCard = (e) => {
        console.log(e)
    }

    const handleCancelAddTimeCard = (e) => {
        setVisibleAddTimeCard(false)
        console.log(e)
    }

    const addTimeCardFunc = (e) => {
        setVisibleAddTimeCard(true)
        console.log(e)
    }

    const onChangeFormTab = (key) => {
        setFormTab(key);
    };

    const handleCancel = (e) => {
        setVisible(false)
        console.log(e)
    }

    const groupByDateFun = (e) => {
        setGroupByDate(true)
        setGroupByUser(false)
        console.log(e)
    }

    const groupByGraphFun = () => {
        setGroupByGraph(true)
        setGroupByUserWithoutGraph(false)
    }

    const groupByUserWithoutGraphFun = () => {
        setGroupByGraph(false)
        setGroupByUserWithoutGraph(true)
    }

    const groupByUserFun = (e) => {
        setGroupByDate(false)
        setGroupByUser(true)
        console.log(e)
    }

    const addTimeFunc = (e) => {
        console.log(e)
        e.stopPropagation();
        setVisible(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                // setLoader(true);
                console.log("values", values);
                const obj = {
                    job_title: values.job_title,
                    wage_rate: values.wage_rate,
                    phone: Number(values.phone),
                    punch_in_date: values.punch_in_date,
                    punch_in_time: values.punch_in_time,
                    punch_out_date: values.punch_out_date,
                    punch_out_time: values.punch_out_time,
                    break_in_date: values.break_in_date,
                    break_in_time: values.break_in_time,
                    break_out_date: values.break_out_date,
                    break_out_time: values.break_out_time,
                    break_type: values.break_type,
                    reason_for_change: values.reason_for_change,
                    address: {
                        street1: values.street1,
                        street2: values.street2,
                        city: values.city,
                        zip: values.zip,
                        state: values.state
                    }
                }
                // const result = await updatePersonalDetail(token, { ...obj, ...params, actionType: "employee" }, company, location);
                // setLoader(false);
                // if (result.status === 200) {
                //   updateSavedObj(result.data);
                //   handleCancel();
                // }
            }
        });
    };

    const menu = () => (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">Departments</Menu.Item>
            <Menu.Item key="2">Value - 1</Menu.Item>
            <Menu.Item key="3">Value - 2</Menu.Item>
        </Menu>
    );

    let addBreak = (e) => {
        console.log("called")
    }

    let deleteTimeCard = (e) => {
        console.log("called")
    }

    let popUpModalHistoryUser = () => {
        console.log('h hjh')
        setVisibleOnclickRow(true)
    }

    let handleCancelOnclickRow = () => {
        setVisibleOnclickRow(false)
    }

    let handleCancelOnclickGraph = () => {
        setGroupByGraph(false)
        setGroupByUserWithoutGraph(true)
    }

    // const dataSource = {
    //     tasks: {
    //         showlabels: "1",
    //         color: "#5D62B5",
    //         task: [
    //             {
    //                 processid: "EMP120",
    //                 start: "07:00:00",
    //                 end: "16:00:00",
    //                 label: "Morning Shift"
    //             },
    //             {
    //                 processid: "EMP121",
    //                 start: "14:00:00",
    //                 end: "22:00:00",
    //                 label: "Afternoon Shift"
    //             },
    //             {
    //                 processid: "EMP122",
    //                 start: "14:00:00",
    //                 end: "18:30:00",
    //                 label: "Half Day"
    //             },
    //             {
    //                 processid: "EMP123",
    //                 start: "07:00:00",
    //                 end: "16:00:00",
    //                 label: "Morning Shift"
    //             },
    //             {
    //                 processid: "EMP124",
    //                 start: "14:00:00",
    //                 end: "22:00:00",
    //                 label: "Afternoon Shift"
    //             },
    //             {
    //                 processid: "EMP125",
    //                 start: "00:00:00",
    //                 end: "08:00:00",
    //                 label: "Early Morning support"
    //             },
    //             {
    //                 processid: "EMP126",
    //                 start: "07:00:00",
    //                 end: "11:30:00",
    //                 label: "Half Day"
    //             }
    //         ]
    //     },
    //     processes: {
    //         fontsize: "12",
    //         isbold: "1",
    //         align: "Center",
    //         headertext: "Employee",
    //         headerfontsize: "14",
    //         headervalign: "middle",
    //         headeralign: "left",
    //         process: [
    //             {
    //                 label: "Betty",
    //                 id: "EMP120"
    //             },
    //             {
    //                 label: "William",
    //                 id: "EMP121"
    //             },
    //             {
    //                 label: "Emma",
    //                 id: "EMP122"
    //             },
    //             {
    //                 label: "Oliver",
    //                 id: "EMP123"
    //             },
    //             {
    //                 label: "Lucas",
    //                 id: "EMP124"
    //             },
    //             {
    //                 label: "Alex",
    //                 id: "EMP125"
    //             },
    //             {
    //                 label: "John",
    //                 id: "EMP126"
    //             }
    //         ]
    //     },
    //     categories: [
    //         {
    //             category: [
    //                 {
    //                     start: "00:00:00",
    //                     end: "23:59:59",
    //                     label: "Time"
    //                 }
    //             ]
    //         },
    //         {
    //             align: "center",
    //             category: [
    //                 {
    //                     start: "00:00:00",
    //                     end: "02:59:59",
    //                     label: "Midnight"
    //                 },
    //                 {
    //                     start: "03:00:00",
    //                     end: "05:59:59",
    //                     label: "3 AM"
    //                 },
    //                 {
    //                     start: "06:00:00",
    //                     end: "08:59:59",
    //                     label: "6 AM"
    //                 },
    //                 {
    //                     start: "09:00:00",
    //                     end: "11:59:59",
    //                     label: "9 AM"
    //                 },
    //                 {
    //                     start: "12:00:00",
    //                     end: "14:59:59",
    //                     label: "12 PM"
    //                 },
    //                 {
    //                     start: "15:00:00",
    //                     end: "17:59:59",
    //                     label: "3 PM"
    //                 },
    //                 {
    //                     start: "18:00:00",
    //                     end: "20:59:59",
    //                     label: "6 PM"
    //                 },
    //                 {
    //                     start: "21:00:00",
    //                     end: "23:59:59",
    //                     label: "9 PM"
    //                 }
    //             ]
    //         }
    //     ],
    //     chart: {
    //         dateformat: "dd/mm/yyyy",
    //         outputdateformat: "hh12:mn ampm",
    //         caption: "Shift Roster for June",
    //         subcaption: "Customer Success Team<br>Sensibill",
    //         ganttpaneduration: "22",
    //         ganttpanedurationunit: "h",
    //         scrolltodate: "09:00:00",
    //         useverticalscrolling: "0",
    //         theme: "fusion"
    //     }
    // };

    return (
        <Fragment>
            <div className="gx-mb-10">
                <Breadcrumb>
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
                </Breadcrumb>
            </div>
            <div>
                <Title level={3}>Expense</Title>
                <section className="Filter">
                                        <span id="inbox"  onClick={()=>setResourceType('review')}>InReview</span>            
                                        <span id="processed" onClick={()=>setResourceType('processing')}>Processing</span>
                                        <span id="review" onClick={()=>setResourceType('complete')}>Complete</span>
                                        <span id="trash" onClick={()=>setResourceType('trash')}>Trash</span>
                                        {/* <span onClick={() => setResourceType('all')}>All</span>
                                        <span onClick={() => setResourceType('review')}>Review</span>
                                        <span onClick={() => setResourceType('trash')}>Trash</span> */}
                            
                                    </section>
                <div className="flex-x align-center filter-wrapper">
                    <div className="flex-1 flex-x">
                        <div className="arrow-btn flex-x center gx-mr-1 cursor-pointer">
                            <Icon type="left" />
                        </div>
                        <div className="date-picker-wrapper">
                            <RangePicker />
                        </div>
                        <div className="arrow-btn flex-x center gx-ml-1 cursor-pointer">
                            <Icon type="right" />
                        </div>
                    </div>
                    <div className="flex-x align-center">
                        <div className="gx-mr-2 search-box-wrapper">
                            <Input placeholder="Search" prefix={<Icon type="search" style={{ color: "#252733" }} />} />
                        </div>
                        <div className="flex-x center combo-box-1 gx-mr-2">
                            <div className={`flex-1 flex-x center ` + (groupByUserWithoutGraph ? 'active' : '') + ` cursor-pointer`} onClick={(e) => { groupByUserWithoutGraphFun(e) }}>
                                {/* <span className={(groupByUserWithoutGraph ? 'color-white' : 'color-black')} style={{ fontSize: "16px" }} >123</span> */}
                                <Icon type="menu-fold" className={(groupByGraph ? 'color-black' : 'color-white')} style={{ fontSize: "16px" }} />
                            </div>
                            <div className={"flex-1 flex-x center " + (groupByGraph ? 'active' : '') + " cursor-pointer"} onClick={(e) => { groupByGraphFun(e) }}>
                                <Icon type="file-image" className={(groupByGraph ? 'color-white' : 'color-black')} style={{ fontSize: "16px" }} />
                            </div>
                        </div>
                        {/* <div className="flex-x center combo-box-1 gx-mr-2">
                            <div className="flex-1 flex-x center active cursor-pointer">
                                <Icon type="pause" rotate="90" style={{ fontSize: "16px", color: "#fff" }} />
                            </div>
                            <div className="flex-1 flex-x center cursor-pointer">
                                <Icon type="barcode" style={{ fontSize: "16px", color: "#303030" }} />
                            </div>
                        </div> */}
                        {/* <div className="flex-x center combo-box-1 gx-mr-2">
                            <div className={`flex-1 flex-x center ` + (groupByUser ? 'active' : '') + ` cursor-pointer`} onClick={(e) => { groupByUserFun(e) }}>
                                <Icon type="user" className={(groupByUser ? 'color-white' : 'color-black')} style={{ fontSize: "16px" }} />
                            </div>
                            <div className={"flex-1 flex-x center " + (groupByDate ? 'active' : '') + " cursor-pointer"} onClick={(e) => { groupByDateFun(e) }}>
                                <Icon type="calendar" className={(groupByDate ? 'color-white' : 'color-black')} style={{ fontSize: "16px" }} />
                            </div>
                        </div> */}
                        {/* <div className="gx-mr-2 department-drp">
                            <Dropdown overlay={menu}>
                                <Button>
                                    Departments <Icon type="down" />
                                </Button>
                            </Dropdown>
                        </div> */}
                        {/* <div className="setting-wrapper flex-x center gx-mr-2 cursor-pointer">
                            <Icon type="database" rotate="90" style={{ fontSize: "16px", color: "#757575" }} />
                        </div> */}
                        <Link to="/overview">
                        <div className="setting-wrapper flex-x center cursor-pointer" style={{ backgroundColor: "#6D9766", width: "fit-content", padding: "10px" }}>
                            <Icon type="plus" style={{ fontSize: "16px", color: "#fff" }} />
                            <span style={{ paddingLeft:"5px", fontSize: "16px", color: "#fff" }}>Add</span>
                        </div>
                        </Link>
                    </div>
                </div>

                {/* <div className="gx-mt-4 summary-wrapper">
                    <span>Total Paid Hours: &nbsp;81.6 </span>
                    <span>Estimated Wages: &nbsp;$917.40</span>
                </div> */}
                {
                    groupByDate ?
                        (groupByGraph ?

                            <div className="table-card">
                                <div className="flex-x align-center table-wrapper">
                                    <div className="flex-1">
                                        <Title level={4} className="gx-mb-0">Thu .May 21</Title>
                                    </div>
                                    <div className="flex-x center cursor-pointer" onClick={(e) => addTimeCardFunc(e)}>
                                        <Icon type="plus" style={{ color: "#fff" }} />
                                    </div>
                                </div>
                                {/* <div className="table-container">
                                    <MyComponent></MyComponent>
                                </div> */}
                            </div>
                            :
                            // Array(3).fill(3).map(x => (
                                <div className="table-card">
                                    <div className="flex-x align-center table-wrapper">
                                        {/* <div className="flex-1">
                                            <Title level={4} className="gx-mb-0">Thu .May 21</Title>
                                        </div> */}
                                        <div className="flex-x center cursor-pointer" onClick={(e) => addTimeCardFunc(e)}>
                                            <Icon type="plus" style={{ color: "#fff" }} />
                                        </div>
                                    </div>
                                    {/* <div className="table-container">
                                        <Table dataSource={tableData} pagination={false}>
                                            <Column align="center" title="Date" dataIndex="name" key="name" />
                                            <Column align="center" title="Wage Rate" dataIndex="wadge_rate" key="wadge_rate" />
                                            <Column align="center" title="Time Card" dataIndex="Time_card" key="Time_card" />
                                            <Column align="center" title="Job Title" dataIndex="job_title" key="job_title" />
                                            <Column align="center" title="Department" dataIndex="department" key="department" />
                                            <Column align="center" title="REG" dataIndex="reg" key="reg" />
                                            <Column align="center" title="OT" dataIndex="ot" key="ot" />
                                            <Column align="center" title="DOT" dataIndex="dot" key="dot" />
                                            <Column align="center" title="U.Breaks" dataIndex="uBreaks" key="uBreaks" />
                                            <Column align="center" title="P.Breaks" dataIndex="paid_breaks" key="paid_breaks" />
                                            <Column align="center" title="T.P.Breaks" dataIndex="tp_hours" key="tp_hours" />
                                            <Column align="center" title="Est. Wages" dataIndex="est_wages" key="est_wages" />
                                            <Column
                                                align="center"
                                                title="Actions"
                                                dataIndex="actions"
                                                key="actions"
                                                render={(value, record) => (
                                                    record.name !== "Total" &&
                                                    <Fragment>
                                                        <Icon className="cursor-pointer gx-mr-2" type="camera" theme="filled" style={{ fontSize: "18px", color: "#757575" }} />
                                                        <Icon className="cursor-pointer gx-mr-2" type="clock-circle" style={{ fontSize: "18px", color: "#757575" }} onClick={(e) => addTimeFunc(e)} />
                                                        <Icon className="cursor-pointer" type="delete-solid" style={{ fontSize: "18px", color: "#757575" }} />
                                                    </Fragment>
                                                )}
                                            />
                                        </Table>
                                    </div> */}
                                </div>
                            // ))
                        ) : (groupByGraph ? <div className="table-card">
                            {/* <div className="flex-x align-center table-wrapper">
                                <div className="flex-1">
                                    <Title level={4} className="gx-mb-0">Thu .May 21</Title>
                                </div>
                                <div className="flex-x center cursor-pointer" onClick={(e) => addTimeCardFunc(e)}>
                                    <Icon type="plus" style={{ color: "#fff" }} />
                                </div>
                            </div> */}
                            
                            <div className="table-container">
                                <div className="imgContainer">
                                    {/* <ReactImageMagnify {...{
                                        smallImage: {
                                            alt: 'InvoiceImage',
                                            isFluidWidth: false,
                                            src: `${imgurl}`,
                                            width: 430,
                                            height: 620   
                                        },
                                        largeImage: {                                            
                                            src: `${imgurl}`,
                                            width: 860,
                                            height: 620
                                        }
                                    }} style={{zIndex:99,overflow:'visible'}}/> */}
                                    <ReactImageZoom {...imgprops} />
                                    {/* <img className="imgPrev" src={imgurl} style={{ width:"200px",overflowX:"scroll"}}></img> */}
                                    <div className="details" style={{position:"relative"}}>
                                    <div className="metaData" style={{ textAlign:"left"}}>
                                    <div>Vendor : {items[dataindex].information.shipping_address[0][0][0]+" "+items[dataindex].information.shipping_address[0][1][0]}</div>

                                    <div><span style={{color:'red'}}>Invoice # </span>{items[dataindex].information.invoice_number[0]}</div>
                                    <div style={{display:"flex"}}>Order Date : 
                                    <>
                                                        
                                                        {(items[dataindex].information.order_date[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"green"}} defaultValue={items[dataindex].information.order_date[0]}></input>
                                                        :
                                                        <>
                                                        {(items[dataindex].information.order_date[1]>=60 && items[dataindex].information.order_date[1]<80)?
                                                        <input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"yellow"}} defaultValue={items[dataindex].information.order_date[0]}>
                                                        </input>

                                                        :
                                                        <input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"red"}} defaultValue={items[dataindex].information.order_date[0]}>
                                                        </input>
                                                        }
                                                        </>
                                                           }
                                                        </>
                                        {/* {items[dataindex].information.order_date[0]} */}
                                        </div>
                                    <div>Delivery Date : {items[dataindex].uploaded_at}</div>
                                    <div>Total :${items[dataindex].information.total[0]}</div>
                                    </div>
                                    <div className="ocrData" style={{height:"200px",overflowY:"scroll"}}>
                                    {/* <Table style={{background:"#e5e5e5"}} dataSource={dataSet}  pagination={false} style={{overflow:"scroll"}}> */}
                                            {/* <div className="table-wrapper">  */}
                                            {/* onClick={()=>setImgSrc({image_name})} */}
                                            {/* <Column align="center" title="ItemNo" dataIndex="ItemNo[0][0]" key="ItemNo" />
                                            <Column align="center" title="Quantity ordered" dataIndex="Qtyordered[0][0]" key="Qtyordered" />
                                            <Column align="center" title="unit" dataIndex="unit[0][0]" key="unit" />
                                            <Column align="center" title="Description" dataIndex="description[0]" key="description" />
                                            <Column align="center" title="Unit Price" dataIndex="unitPrice[0][0]" key="unitPrice"/>
                                            <Column align="center" title="Price" dataIndex="Price" key="Price" /> */}
                                            {/* <Column align="center" title="Posted By" dataIndex="postedBy" key="postedBy" /> */}
                                            {/* <Column align="center" title="Actions" dataIndex="ot" key="actions" /> */}
                                            {/* <Column align="center" title="DOT" dataIndex="dot" key="dot" />
                                            <Column align="center" title="U.Breaks" dataIndex="uBreaks" key="uBreaks" />
                                            <Column align="center" title="P.Breaks" dataIndex="pBreaks" key="pBreaks" />
                                            <Column align="center" title="T.P.Breaks" dataIndex="tpBreaks" key="tpBreaks" />
                                            <Column align="center" title="Est. Wages" dataIndex="estWages" key="estWages" /> */}
                                           
                                            {/* </div> */}
                                        {/* </Table> */}

                                        <table style={{width:"100%"}} className="detailTable">
                                            <thead>
                                            <tr><th>ItemNo</th> <th>Qt. Ord.</th> <th>Unit</th> <th>Desc.</th> <th>Unit Price</th> <th>Price</th></tr>
                                            </thead>
                                            <tbody style={{height:"100px",overflow:"scroll"}}>
                                            {dataSet.map(data=>(
                                                <tr style={{border:"1px solid black",margin:"5px"}}>
                                                    <td style={{width:"80px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                    
                                                    <>
                                                        
                                                        {(data.ItemNo[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.ItemNo[0]}></input>
                                                        :
                                                        <>
                                                        {(data.ItemNo[1]>=60&&data.ItemNo[1]<80)?
                                                        <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"yellow"}} defaultValue={data.ItemNo[0]}>
                                                        </input>

                                                        :
                                                        <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.ItemNo[0]}>
                                                        </input>
                                                        }</>
                                                           }
                                                        </>
                                                    </td>
                                                    <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}><>
                                                        
                                                        {(data.Qtyordered[1]>=80)?<input style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.Qtyordered[0]}></input>
                                                        :
                                                        <>
                                                        {(data.Qtyordered[1]>=60&&data.Qtyordered[1]<80)?
                                                        <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"yellow"}} defaultValue={data.Qtyordered[0]}>                                                         
                                                        </input>
                                                        :
                                                        <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={ data.Qtyordered[0]}>
                                                           
                                                        </input>
                                                        }</>
                                                           }
                                                        </>
                                                        </td>
                                                    <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                    <>
                                                        
                                                        {(data.unit[0][1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.unit[0][0]}></input>
                                                        :
                                                        <>
                                                        {(data.unit[0][1]>=60&&data.unit[0][1]<80)?
                                                        <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"yellow"}} defaultValue={data.unit[0][0]}>
                                                           
                                                        </input>
                                                        :
                                                        <input type="text"  style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.unit[0][0]}>
                                                           
                                                        </input>
                                                        }</>
                                                           }
                                                        </>
                                                    </td>
                                                    <td style={{width:"180px",border:"1px solid black",height:"100%",textAlign:"center"}}>{data.description.map(desc=>(
                                                        <>
                                                        
                                                        {(desc[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={desc[0]}></input>
                                                        :
                                                        <>
                                                        {(desc[1]>=60&&desc[1]<80)?
                                                        <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"yellow"}} defaultValue={desc[0]}>
                                                           
                                                        </input>
                                                        :
                                                        <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={desc[0]}>
                                                           
                                                        </input>
                                                        }
                                                        </>
                                                           }
                                                        </>
                                                    ))}
                                                    
                                                    </td>
                                                    <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}><>
                                                        
                                                        {(data.unitPrice[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.unitPrice[0]}></input>
                                                        :
                                                        <>
                                                        {(data.unitPrice[1]>=60&&data.unitPrice[1]<80)?
                                                        <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"yellow"}} defaultValue={ data.unitPrice[0]}>      
                                                        </input>
                                                        :
                                                        <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={ data.unitPrice[0]}>      
                                                        </input>
                                                        }</>
                                                           }
                                                        </>
                                                        </td>
                                                    <td style={{width:"80px",border:"1px solid black",height:"100%",textAlign:"center"}}>{data.unitPrice[0]}</td>

                                                </tr>
                                            ))}
                                            </tbody>
                                            
                                        </table>
                                    </div>
                                    </div>
                                </div>
                            {/* <Table dataSource={tableData.filter(td=>td.resolve===filter || (`${filter}`==="Inbox") && (td.archive!="archived") || td.archive===filter)} pagination={false}> */}
                            <Table  scroll={{y: 240}} dataSource={items}  onRow={(r,rowIndex) => ({
                                           onClick: (e) => {console.log(r);
                                               e.target.parentElement.style.backgroundColor="red";
                                               setImgSrc(items[rowIndex].image_name);
                                                    console.log(e.target.parentElement.firstElementChild.nextSibling);
                                                    // setdataindex(items.findIndex(obj => obj.image_name===imgSrc))
                                                    dataSet.splice(0,dataSet.length)
                                                    checkIndex();
                                                    
                                                    console.log(items[rowIndex].information.lines);
                                                    console.log("ordereed items ",items[rowIndex].information.lines[0][0].qty_order);
                                                    for(let i=0;i<items[rowIndex].information.lines.length;i++){
                                                    
                                                        dataSet.push(
                                                            
                                                                        {
                                                                            "ItemNo":items[rowIndex].information.lines[i][0].item_number,
                                                                            "Qtyordered":items[rowIndex].information.lines[i][0].qty_order,
                                                                            "unit":items[rowIndex].information.lines[i][0].uom,
                                                                            "description":items[rowIndex].information.lines[i][0].description,
                                                                            "unitPrice":items[rowIndex].information.lines[i][0].unit_price,
                                                                            "Price":items[rowIndex].information.lines[i][0].unit_price
                                                                            // parseFloat(items[dataindex].information.lines[i][0].qty_order[0])*parseFloat(items[dataindex].information.lines[i][0].unit_price[0])
                                                                        }
                                                                    )
                                                   
                                                
                                                    console.log("Dataset",dataSet);
                                                                    }      
                                                            },
                                                           
                                    })} pagination={false} >

                                            {/* <div className="table-wrapper">  */}
                                            <Column align="center" title="Status" dataIndex="image_status" key="status" />
                                            {/* <Column align="center" title="Invoice" dataIndex="image_name" key="vendor"/> */}
                                            <Column align="center" title="Vendor" dataIndex="information.shipping_address[0][0][0]" key="vendor" />
                                            <Column align="center" title="Invoice Date" dataIndex="uploaded_at" key="invoiceDate" />
                                            <Column align="center" title="Invoice Number" dataIndex="information.invoice_number[0]" key="invoiceNumber" />
                                            <Column align="center" title="Amount" dataIndex="information.total[0]" key="total" />
                                            <Column align="center" title="Posted By" dataIndex="uploaded_by" key="postedBy" />
                                            
                                            {/* <Column align="center" title="Actions" dataIndex="ot" key="actions" /> */}
                                            {/* <Column align="center" title="DOT" dataIndex="dot" key="dot" />
                                            <Column align="center" title="U.Breaks" dataIndex="uBreaks" key="uBreaks" />
                                            <Column align="center" title="P.Breaks" dataIndex="pBreaks" key="pBreaks" />
                                            <Column align="center" title="T.P.Breaks" dataIndex="tpBreaks" key="tpBreaks" />
                                            <Column align="center" title="Est. Wages" dataIndex="estWages" key="estWages" /> */}
                                            <Column
                                                align="center"
                                                title="Actions"
                                                dataIndex="actions"
                                                key="actions"
                                                render={(value, record) => (
                                                    record.date !== "Total" &&
                                                    <Fragment>
                                                        {/* <Icon className="cursor-pointer gx-mr-2" type="camera" theme="filled" style={{ fontSize: "18px", color: "#757575" }} /> */}
                                                        {/* <Icon className="cursor-pointer gx-mr-2" type="clock-circle" style={{ fontSize: "18px", color: "#757575" }} onClick={(e) => addTimeFunc(e)} /> */}
                                                        <Icon className="cursor-pointer" type="delete" style={{ fontSize: "18px", color: "#757575" }} />
                                                    </Fragment>
                                                )}
                                            />
                                            {/* </div> */}
                                        </Table>
                            </div>
                        </div> :
                            // Array(3).fill(3).map(x => (
                                <div className="table-card">
                                    {/* <div className="flex-x align-center table-wrapper">
                                        <div className="flex-1">
                                            <Title level={4} className="gx-mb-0">Jason Bourne</Title>
                                        </div>
                                        <div className="flex-x center cursor-pointer" onClick={(e) => addTimeCardFunc(e)}>
                                            <Icon type="plus" style={{ color: "#fff" }} />
                                        </div>
                                    </div> */}

                                    
                                    <div className="table-container">
                                        {/* <Table dataSource={tableData.filter(td=>td.resolve===filter || (`${filter}`==="Inbox") && (td.archive!="archived") || td.archive===filter)} onRow={(r) => ({ onClick: () => popUpModalHistoryUser() })} pagination={false}> */}
                                        <Table dataSource={items} pagination={false}>
                                            {/* <div className="table-wrapper">  */}
                                            <Column align="center" title="Status" dataIndex="image_status" key="status" />
                                            {/* <Column align="center" title="Invoice" dataIndex="image_name" key="vendor"/> */}
                                            <Column align="center" title="Vendor" dataIndex="information.shipping_address[0][0][0]" key="vendor" />
                                            <Column align="center" title="Invoice Date" dataIndex="uploaded_at" key="invoiceDate" />
                                            <Column align="center" title="Invoice Number" dataIndex="information.invoice_number[0]" key="invoiceNumber" />
                                            <Column align="center" title="Amount" dataIndex="information.total[0]" key="total" />
                                            <Column align="center" title="Posted By" dataIndex="uploaded_by" key="postedBy" />
                                            {/* <Column align="center" title="Actions" dataIndex="ot" key="actions" /> */}
                                            {/* <Column align="center" title="DOT" dataIndex="dot" key="dot" />
                                            <Column align="center" title="U.Breaks" dataIndex="uBreaks" key="uBreaks" />
                                            <Column align="center" title="P.Breaks" dataIndex="pBreaks" key="pBreaks" />
                                            <Column align="center" title="T.P.Breaks" dataIndex="tpBreaks" key="tpBreaks" />
                                            <Column align="center" title="Est. Wages" dataIndex="estWages" key="estWages" /> */}
                                            <Column
                                                align="center"
                                                title="Actions"
                                                dataIndex="actions"
                                                key="actions"
                                                render={(value, record) => (
                                                    record.date !== "Total" &&
                                                    <Fragment>
                                                        {/* <Icon className="cursor-pointer gx-mr-2" type="camera" theme="filled" style={{ fontSize: "18px", color: "#757575" }} /> */}
                                                        {/* <Icon className="cursor-pointer gx-mr-2" type="clock-circle" style={{ fontSize: "18px", color: "#757575" }} onClick={(e) => addTimeFunc(e)} /> */}
                                                        <Icon className="cursor-pointer" type="delete" style={{ fontSize: "18px", color: "#757575" }} />
                                                    </Fragment>
                                                )}
                                            />
                                            {/* </div> */}
                                        </Table>
                                        
                                    </div>
                                </div>
                            // ))
                            )
                }
            </div>


            {/* Model for edit time card history and all stuffs */}
            <Modal
                title="Add time card"
                visible={visibleAddTimeCard}
                onOk={handleOkAddTimeCard}
                onCancel={handleCancelAddTimeCard}
                className="hide-modal-footer main-modal-timesheet-history"
            >

                <Form onSubmit={handleSubmit} className="gx-form-row0">
                    <Row>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="JOB TITLE" className="display-block">
                                {getFieldDecorator("job_title", {
                                    rules: [
                                        { required: true, message: "Please input Job title!" },
                                    ],
                                })(<Input placeholder="Job title" />)}
                            </FormItem>
                        </Col>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="WAGE RATE" className="display-block">
                                {getFieldDecorator("wage_rate", {
                                    rules: [{ required: true, message: "Please input Wage rate!" }],
                                })(<Input type="text" placeholder="Wage rate" />)}
                            </FormItem>
                        </Col>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="DATE" className="display-block">
                                {getFieldDecorator("punch_in_date", {
                                    rules: [{ required: true, message: "Please input Date!" }],
                                })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                            </FormItem>
                        </Col>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="PUNCH IN TIME" className="display-block">
                                {getFieldDecorator("punch_in_time", {
                                    rules: [{ required: true, message: "Punch in time!" }],
                                })(<TimePicker style={{ width: "100%" }} />)}
                            </FormItem>
                        </Col>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="DATE" className="display-block">
                                {getFieldDecorator("punch_out_date", {
                                    rules: [{ required: true, message: "Please input Date!" }],
                                })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                            </FormItem>
                        </Col>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="PUNCH OUT TIME" className="display-block">
                                {getFieldDecorator("punch_out_time", {
                                    rules: [{ required: true, message: "Punch out time!" }],
                                })(<TimePicker style={{ width: "100%" }} />)}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Title level={3}>Break</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="DATE" className="display-block">
                                {getFieldDecorator("break_in_date", {
                                    rules: [{ required: true, message: "Please input Date!" }],
                                })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                            </FormItem>
                        </Col>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="BREAK IN TIME" className="display-block">
                                {getFieldDecorator("break_in_time", {
                                    rules: [{ required: true, message: "Break in time!" }],
                                })(<TimePicker style={{ width: "100%" }} />)}
                            </FormItem>
                        </Col>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="DATE" className="display-block">
                                {getFieldDecorator("break_out_date", {
                                    rules: [{ required: true, message: "Please input Date!" }],
                                })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                            </FormItem>
                        </Col>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="BREAK OUT TIME" className="display-block">
                                {getFieldDecorator("break_out_time", {
                                    rules: [{ required: true, message: "Break out time!" }],
                                })(<TimePicker style={{ width: "100%" }} />)}
                            </FormItem>
                        </Col>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="BREAK TYPE" className="display-block">
                                {getFieldDecorator("break_type", {
                                    rules: [
                                        { required: true, message: "Please input break type!" },
                                    ],
                                })(<Input placeholder="" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} xs={24} md={12} className='mb-10'>
                            <Icon type="plus" style={{ color: "#3751FF" }} />
                            <a onClick={addBreak}>ADD ANOTHER BREAK</a>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} xs={24} md={12}>
                            <FormItem label="REASON FOR CHANGE" className="display-block">
                                {getFieldDecorator("reason_for_change", {
                                    rules: [
                                        { required: true, message: "Please input reason!" },
                                    ],
                                })(<Input placeholder="" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} xs={24} md={12} className='mb-10'>
                            <Icon type="delete" style={{ color: "#646464" }} />
                            <span onClick={deleteTimeCard} style={{ color: "#646464", fontSize: '14px', marginLeft: '8px' }}>DELETE TIME CARD</span>
                        </Col>
                    </Row>
                    <div className="flex-x center gx-mt-4 justify-content-space-between">
                        {/* <FormItem className="gx-m-0"> */}
                        <div className="flex-x">
                            <Button
                                type="primary"
                                className="login-form-butto button-close-history-model"
                                onClick={handleCancel}
                            >
                                Cancel
            </Button>
                        </div>
                        <div className="flex-x">
                            <Button
                                // loading={loader}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button button-close-history-model"
                            >
                                Save
            </Button>
                        </div>
                        {/* </FormItem> */}
                    </div>
                </Form>


            </Modal>

            <Modal
                title="Json Bourne"
                destroyOnClose={true}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                className="hide-modal-footer main-modal-timesheet-history"
            >
                <Tabs activeKey={formTab} className='tab-modal-timesheet' onChange={onChangeFormTab}>
                    <TabPane tab="Edit" key={1}>
                        <Form onSubmit={handleSubmit} className="gx-form-row0">
                            <Row>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="JOB TITLE" className="display-block">
                                        {getFieldDecorator("job_title", {
                                            rules: [
                                                { required: true, message: "Please input Job title!" },
                                            ],
                                        })(<Input placeholder="Job title" />)}
                                    </FormItem>
                                </Col>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="WAGE RATE" className="display-block">
                                        {getFieldDecorator("wage_rate", {
                                            rules: [{ required: true, message: "Please input Wage rate!" }],
                                        })(<Input type="text" placeholder="Wage rate" />)}
                                    </FormItem>
                                </Col>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="DATE" className="display-block">
                                        {getFieldDecorator("punch_in_date", {
                                            rules: [{ required: true, message: "Please input Date!" }],
                                        })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                                    </FormItem>
                                </Col>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="PUNCH IN TIME" className="display-block">
                                        {getFieldDecorator("punch_in_time", {
                                            rules: [{ required: true, message: "Punch in time!" }],
                                        })(<TimePicker style={{ width: "100%" }} />)}
                                    </FormItem>
                                </Col>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="DATE" className="display-block">
                                        {getFieldDecorator("punch_out_date", {
                                            rules: [{ required: true, message: "Please input Date!" }],
                                        })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                                    </FormItem>
                                </Col>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="PUNCH OUT TIME" className="display-block">
                                        {getFieldDecorator("punch_out_time", {
                                            rules: [{ required: true, message: "Punch out time!" }],
                                        })(<TimePicker style={{ width: "100%" }} />)}
                                    </FormItem>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Title level={3}>Break</Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="DATE" className="display-block">
                                        {getFieldDecorator("break_in_date", {
                                            rules: [{ required: true, message: "Please input Date!" }],
                                        })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                                    </FormItem>
                                </Col>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="BREAK IN TIME" className="display-block">
                                        {getFieldDecorator("break_in_time", {
                                            rules: [{ required: true, message: "Break in time!" }],
                                        })(<TimePicker style={{ width: "100%" }} />)}
                                    </FormItem>
                                </Col>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="DATE" className="display-block">
                                        {getFieldDecorator("break_out_date", {
                                            rules: [{ required: true, message: "Please input Date!" }],
                                        })(<DatePicker format={'DD-MM-YYYY'} style={{ width: "100%" }} />)}
                                    </FormItem>
                                </Col>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="BREAK OUT TIME" className="display-block">
                                        {getFieldDecorator("break_out_time", {
                                            rules: [{ required: true, message: "Break out time!" }],
                                        })(<TimePicker style={{ width: "100%" }} />)}
                                    </FormItem>
                                </Col>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="BREAK TYPE" className="display-block">
                                        {getFieldDecorator("break_type", {
                                            rules: [
                                                { required: true, message: "Please input break type!" },
                                            ],
                                        })(<Input placeholder="" />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} xs={24} md={12} className='mb-10'>
                                    <Icon type="plus" style={{ color: "#3751FF" }} />
                                    <a onClick={addBreak}>ADD ANOTHER BREAK</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} xs={24} md={12}>
                                    <FormItem label="REASON FOR CHANGE" className="display-block">
                                        {getFieldDecorator("reason_for_change", {
                                            rules: [
                                                { required: true, message: "Please input reason!" },
                                            ],
                                        })(<Input placeholder="" />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} xs={24} md={12} className='mb-10'>
                                    <Icon type="delete" style={{ color: "#646464" }} />
                                    <span onClick={deleteTimeCard} style={{ color: "#646464", fontSize: '14px', marginLeft: '8px' }}>DELETE TIME CARD</span>
                                </Col>
                            </Row>
                            <div className="flex-x center gx-mt-4 justify-content-space-between">
                                {/* <FormItem className="gx-m-0"> */}
                                <div className="flex-x">
                                    <Button
                                        type="primary"
                                        // htmlType="submit"
                                        className="login-form-button button-close-history-model"
                                        onClick={handleCancel}
                                    >
                                        Cancel
            </Button>
                                </div>
                                <div className="flex-x">
                                    <Button
                                        // loading={loader}
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button button-close-history-model"
                                    >
                                        Save
            </Button>
                                </div>
                                {/* </FormItem> */}
                            </div>
                        </Form>
                    </TabPane>
                    <TabPane tab="TIMECARD HISTORY" key={2}>
                        <TimeCard closeFun={handleCancel}></TimeCard>
                    </TabPane>
                    <TabPane tab="SNAPSHOTS" key={3}>
                        <div>
                            <CustomArrows closeFun={handleCancel} />
                        </div>
                    </TabPane>

                </Tabs>

            </Modal>

            <Modal
                width='90%'
                destroyOnClose={true}
                visible={visibleOnclickRow}
                onOk={handleOk}
                onCancel={handleCancelOnclickRow}
                className="hide-modal-footer main-modal-timesheet-history"
            >
                <div className="table-card">
                    <div className="flex-x align-center table-wrapper">
                        <div className="flex-1">
                            <Title level={4} className="gx-mb-0">Jason Bourne</Title>
                        </div>
                        <div className="flex-x center cursor-pointer" onClick={(e) => addTimeCardFunc(e)}>
                            <Icon type="plus" style={{ color: "#fff" }} />
                        </div>
                    </div>
                    <div className="table-container">
                        <Table dataSource={tableData} onRow={(r) => ({ onClick: () => popUpModalHistoryUser() })} pagination={false} bordered>
                            <Column align="center" title="Date" dataIndex="date" key="date" />
                            <Column align="center" title="Wage Rate" dataIndex="wageRate" key="wageRate" />
                            <Column align="center" title="Time Card" dataIndex="timeCard" key="timeCard" />
                            <Column align="center" title="Job Title" dataIndex="jobTitle" key="jobTitle" />
                            <Column align="center" title="Department" dataIndex="department" key="department" />
                            <Column align="center" title="REG" dataIndex="reg" key="reg" />
                            <Column align="center" title="OT" dataIndex="ot" key="ot" />
                            <Column align="center" title="DOT" dataIndex="dot" key="dot" />
                            <Column align="center" title="U.Breaks" dataIndex="uBreaks" key="uBreaks" />
                            <Column align="center" title="P.Breaks" dataIndex="pBreaks" key="pBreaks" />
                            <Column align="center" title="T.P.Breaks" dataIndex="tpBreaks" key="tpBreaks" />
                            <Column align="center" title="Est. Wages" dataIndex="estWages" key="estWages" />
                            <Column
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
                            />
                        </Table>
                    </div>
                    {/* <div className="table-container">
                        <Table dataSource={tableData} onRow={(r) => ({ onClick: () => popUpModalHistoryUser() })} pagination={false} bordered>

                        </Table>
                    </div> */}
                </div>
                <div className="flex-x center gx-mt-4">
                    {/* <FormItem className="gx-m-0"> */}
                    <div className="flex-x">
                        <Button
                            // loading={loader}
                            type="primary"
                            className="login-form-button button-close-history-model"
                            onClick={handleCancelOnclickRow}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
            {/* <Modal
                width='90%'
                destroyOnClose={true}
                visible={groupByGraph}
                onOk={handleOk}
                onCancel={handleCancelOnclickGraph}
                className="hide-modal-footer main-modal-timesheet-history"
            >

                <MyComponent></MyComponent>
            </Modal> */}
            {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
            {/* <ReactFusioncharts
                type="gantt"
                width="100%"
                height="100%"
                dataFormat="JSON"
                dataSource={dataSource}
            /> */}
        </Fragment >
    );
};

// export default index;
const WrappedModalIndex = Form.create()(Index);
export default WrappedModalIndex;