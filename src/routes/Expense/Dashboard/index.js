import Slider from "react-slick";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import {ExclamationCircleFilled} from '@ant-design/icons';
import "slick-carousel/slick/slick-theme.css";
import { DatePicker, Breadcrumb, Card, Icon, Typography, TimePicker, Modal, Tabs, Row, Col, Dropdown, Menu, Button, Input, Form, Table} from "antd";
import Column from "antd/lib/table/Column";
import TimeCard from './TimeCardHistory'
import CustomArrows from './Slider'
import FusionCharts from "fusioncharts";
import MyComponent from './BarChart'
import ReactImageMagnify from "react-image-magnify";
import ReactImageZoom from 'react-image-zoom';
import { color } from "highcharts";
import { over } from "lodash";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const { RangePicker } = DatePicker;
const { Title } = Typography;


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
     
    function changeTop(table)
        {
            setTopTable(table)
        }
    const [itemset,setItemset]=useState();
    useEffect(()=>{fetch(`https://alan.dojoapi.co.in/img_upl/mobile_image_upl/${resourceType}/`).then((result)=>{
        result.json().then(json => setItems(json))
        if(items.length<1)
        setcounter(counter+1);
        // console.log(dataSet);
       changeTop(topTable)
    })},[resourceType,imgSrc,counter,dataSet,topTable])


    
    function handleSubmit()
    {
        console.log(updateddataSet)
        //     var totalPerc= parseInt(topTable.shipping_address[1])+ parseInt(topTable.invoice[1])+ parseInt(topTable.orderDate[1])+ parseInt(topTable.total[1]) 
            
        
        // console.log(totalPerc/4)
    }



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
    const [template,setTemplate]=useState('');
    const handleMenuClick = value => {

    };
    // function checkIndex()
    // {
    //  items.find(function(item, i){
    //     if(item.image_name === imgSrc){
    //     setdataindex(i);
    //     }
    //    });
    // }
const [dataSet,setdataSet] =useState([])
const [updateddataSet,setupdateddataSet] =useState([])
const [topTable,setTopTable]= useState({})
        
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

    const addTimeCardFunc = (e) => {
        setVisibleAddTimeCard(true)
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
 
const pacificCoast= ['tx','item','qty_order','qty_ship','uom','units','pack','size','item_number','description','unit_price',    'billing_units','extend_amount']

const jordanos= ['itemno','shipped','pacsize','um','brand','upc','extension','unitprice','description']

const produceAvailable = ['item_number','qty_order','qty_ship','uom',' billing_units','extend_amount','unit_price','description']

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
                                <Icon type="menu-fold" className={(groupByGraph ? 'color-black' : 'color-white')} style={{ fontSize: "16px" }} />
                            </div>
                            <div className={"flex-1 flex-x center " + (groupByGraph ? 'active' : '') + " cursor-pointer"} onClick={(e) => { groupByGraphFun(e) }}>
                                <Icon type="file-image" className={(groupByGraph ? 'color-white' : 'color-black')} style={{ fontSize: "16px" }} />
                            </div>
                        </div>
                        <Link to="/overview">
                        <div className="setting-wrapper flex-x center cursor-pointer" style={{ backgroundColor: "#6D9766", width: "fit-content", padding: "10px" }}>
                            <Icon type="plus" style={{ fontSize: "16px", color: "#fff" }} />
                            <span style={{ paddingLeft:"5px", fontSize: "16px", color: "#fff" }}>Add</span>
                        </div>
                        </Link>
                    </div>
                </div>
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
                                </div>
                            // ))
                        ) : (groupByGraph ? <div className="table-card">
                            
                            <div className="table-container">
                                <div className="imgContainer">
                                    <ReactImageZoom {...imgprops} />
                                    <div className="details" style={{position:"relative"}}>
                                    <div className="metaData" style={{ textAlign:"left"}}>
                                    <div>Vendor :
                                        <>
                                        {topTable.shipping_address?.[1]>=80?<input type="text" value={topTable.shipping_address?.[0]} style={{border:"none",background:"transparent",width:"100%",color:"green"}} ></input>
                                        :
                                        <>
                                        {topTable.shipping_address?.[1]<=60&& topTable.shipping_address?.[1]>80?<input type="text" value={topTable.shipping_address?.[0]} style={{border:"none",background:"transparent",width:"100%",color:"orange"}}></input>
                                        :
                                        <input type="text" value={topTable.shipping_address?.[0]} style={{border:"none",background:"transparent",width:"100%",color:"red"}} ></input>}
                                        </>
                                        }
                                        
                                        
                                        </>
                                    </div>

                                    <div><span style={{color:'red'}}>Invoice # 
                                    {/* <>
                                                    
                                                        {(items[dataindex].information.invoice_number[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"green"}} defaultValue={items[dataindex].information.invoice_number[0]}></input>
                                                        :
                                                        <>
                                                        {(items[dataindex].information.invoice_number[1]>=60 && items[dataindex].information.invoice_number[1]<80)?
                                                        <input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"yellow"}} defaultValue={items[dataindex].information.invoice_number[0]}>
                                                        </input>

                                                        :
                                                        <input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"red"}} defaultValue={items[dataindex].information.invoice_number[0]}>
                                                        </input>
                                                        }
                                                        </>
                                                           }
                                                        </> */}

                                                        {topTable.invoice?.[0]}

                                                        </span></div>
                                    <div style={{display:"flex"}}>Order Date : 
                                    {/* <>
                                                        
                                                        { topTable.orderDate?.{(topTable.orderDate[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"green"}} value={topTable.orderDate[0]}></input>
                                                        :
                                                        <>
                                                        {(items[dataindex].information.order_date[1]>=60 && items[dataindex].information.order_date[1]<80)?
                                                        <input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"yellow"}} value={topTable.orderDate[0]}>
                                                        </input>

                                                        :
                                                        <input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"red"}} value={topTable.orderDate[0]}>
                                                        </input>
                                                        }
                                                        </>
                                                           }
                                                        </> */}
                                        {/* {items[dataindex].information.order_date[0]} */}
                                        
                                                              { topTable.orderDate?.[0]}
                                                             
                                                               
                                        </div>
                                    <div>Delivery Date : 
                                        {/* {items[dataindex].uploaded_at} */}
                                        {topTable.delivery}
                                    </div>
                                    <div>Total :$
                                        <>
                                                            {topTable.total?.map((total,index)=>
                                                            <>{(index%2==0)?<>{(total[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"fit-content",color:"green"}} value={total}/>
                                                                :
                                                                <>
                                                                {
                                                                (total[1]>=60&&total[1]<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"#FFD700"}} value={total}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"fit-content",color:"red"}} value={total}></input>
                                                                }
                                                                </>
                                                            
                                                            }</>:<></>}
                                                            
                                                            </> )}
                                                            </>

                                                            {/* {topTable.total?.map((total,index)=>
                                                            <>{(index%2==0)?<>{total}&nbsp;</>:<></>}</>
                                                            )} */}
                                                            </div>
                                    </div>
                                    <div className="ocrData" style={{height:"200px",overflowY:"scroll"}}>

                                        <table style={{width:"100%"}} className="detailTable">
                                         
                                                {(template=="Jordanos")?
                                                <>
                                                    <thead>
                                                    <tr>
                                                        {jordanos.map((header)=><td>{header}</td>)}
                                                    </tr>
                                                    </thead>
                                                    <tbody style={{height:"100px",overflow:"scroll"}}>
                                                        {dataSet.map((data,index)=>(
                                                        <>                                                  
                                                        <tr style={{border:"1px solid black",margin:"5px"}} >
                                                            <>
                                                            <td style={{width:"80px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            
                                                            <>
                                                                
                                                                {(data.itemno[1]>=80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.itemno[0]} className="itemNo"
                                                            //    onChange={(e)=>{updateddataSet.push([{
                                                            //         "itemno":[e.target.value,100]
                                                            //     }]
                                                            //     );
                                                            //     console.log(updateddataSet)}
                                                            //     }
                                                                ></input>
                                                                :
                                                                <>
                                                                {(data.itemno[1]>=60&&data.itemno[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.itemno[0]} className="itemNo"
                                                                // onChange={(e)=>{updateddataSet.push([{
                                                                //     "itemno":[e.target.value,100]
                                                                // }]
                                                                // );
                                                                // console.log(updateddataSet)}
                                                                // }
                                                                >
                                                                </input>

                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.itemno[0]} className="itemNo"
                                                                // onChange={(e)=>{updateddataSet.push([{
                                                                //     "itemno":[e.target.value,100]
                                                                // }]
                                                                // );
                                                                // console.log(updateddataSet)}
                                                                // }
                                                                >
                                                                </input>
                                                                }</>
                                                                }
                                                                </>
                                                            </td>
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}><>
                                                                
                                                                {(data.shipped[1]>=80)?<input style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.shipped[0]} className="shipped"
                                                                // onChange={(e)=>{updateddataSet.push({
                                                                //     "shipped":[e.target.value,100]
                                                                // }
                                                                // );
                                                                // console.log(updateddataSet)}
                                                                // }
                                                                >

                                                                </input>
                                                                :
                                                                <>
                                                                {(data.shipped[1]>=60&&data.shipped[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.shipped[0]} className="shipped" 
                                                                // onChange={(e)=>{updateddataSet.push({
                                                                //     "shipped":[e.target.value,100]
                                                                // }
                                                                // );
                                                                // console.log(updateddataSet)}
                                                                // }
                                                                >                                                         
                                                                </input>
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={ data.shipped[0]} className="shipped"
                                                                // onChange={(e)=>{updateddataSet.push({
                                                                //     "shipped":[e.target.value,100]
                                                                // }
                                                                // );
                                                                // console.log(updateddataSet)}
                                                                // }
                                                                >
                                                                
                                                                </input>
                                                                }</>
                                                                }
                                                                </>
                                                            </td>
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.pacsize.map(pac=>(<>
                                                            {(pac[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={pac[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (pac>=60&&pac<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={pac[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={pac[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.um.map(um=>(<>
                                                            {(um[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={um[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (um>=60&&um<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={um[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={um[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 
                                                            
                                                                
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.brand.map(pac=>(<>
                                                            {(pac[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={pac[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (pac>=60&&pac<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={pac[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={pac[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 


                                                            
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.upc.map(upc=>(<>
                                                            {(upc[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={upc[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (upc>=60&&upc<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={upc[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={upc[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.extension.map(pac=>(<>
                                                            {(pac[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={pac[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (pac>=60&&pac<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={pac[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={pac[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                                
                                                                {(data.unitprice[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.unitprice[0]}></input>
                                                                :
                                                                <>
                                                                {(data.unitprice[1]>=60&&data.unitprice[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.unitprice[0]}>
                                                                
                                                                </input>
                                                                :
                                                                <input type="text"  style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.unitprice[0]}>
                                                                
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
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={desc[0]}>
                                                                
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
                                                            
                                                            </> 
                                                        </tr>

                                                        </>
                                                    
                                                    
                                                            ))}
                                                    </tbody>
                                                </>
                                                :<>
                                                {(template=="pacificCoast")?
                                                <>
                                                        <thead>
                                                    <tr>
                                                        {pacificCoast.map((header)=><td>{header}</td>)}
                                                    </tr>
                                                    </thead>
                                                    <tbody style={{height:"100px",overflow:"scroll"}}>
                                                        {dataSet.map((data)=>(
                                                        <>                                                  
                                                        <tr style={{border:"1px solid black",margin:"5px"}} >
                                                            <>
                                                            <td style={{width:"80px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            
                                                            <>
                                                                
                                                                {(data.tx[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.tx[0]}></input>
                                                                :
                                                                <>
                                                                {(data.tx[1]>=60&&data.tx[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.tx[0]}>
                                                                </input>

                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.tx[0]}>
                                                                </input>
                                                                }</>
                                                                }
                                                                </>
                                                            </td>
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}><>
                                                            { data.qty_order.map(qorder=>(<>
                                                            {(qorder[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={qorder[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (qorder>=60&&qorder<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={qorder[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={qorder[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </> 
                                                            </td>
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}><>
                                                            
                                                            { data.qty_order.map(qorder=>(<>
                                                            {(qorder[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={qorder[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (qorder>=60&&qorder<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={qorder[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={qorder[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>  
                                                                
                                                            </td>
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.qty_ship.map(qship=>(<>
                                                            {(qship[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={qship[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (qship>=60&&qship<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={qship[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={qship[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.uom.map(uom=>(<>
                                                            {(uom[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={uom[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (uom>=60&&uom<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={uom[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={uom[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 
                                                            
                                                                
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.units.map(unit=>(<>
                                                            {(unit[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={unit[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (unit>=60&&unit<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={unit[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={unit[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.pack.map(pack=>(<>
                                                            {(pack[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={pack[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (pack>=60&&pack<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={pack[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={pack[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.size.map(sz=>(<>
                                                            {(sz[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={sz[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (sz>=60&&sz<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={sz[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={sz[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                                
                                                                {(data.item_number[0][1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.item_number[0][0]}></input>
                                                                :
                                                                <>
                                                                {(data.item_number[0][1]>=60&&data.item_number[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.item_number[0][0]}>
                                                                
                                                                </input>
                                                                :
                                                                <input type="text"  style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.item_number[0][0]}>
                                                                
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
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={desc[0]}>
                                                                
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

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                                
                                                                {(data.unit_price[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.unit_price[0]}></input>
                                                                :
                                                                <>
                                                                {(data.unit_price[1]>=60&&data.unit_price[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.unit_price[0]}>
                                                                
                                                                </input>
                                                                :
                                                                <input type="text"  style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.unit_price[0]}>
                                                                
                                                                </input>
                                                                }</>
                                                                }
                                                                </>
                                                            </td>
                                                            
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                                
                                                                {(data.billing_units[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.billing[0]}></input>
                                                                :
                                                                <>
                                                                {(data.billing_units[1]>=60&&data.billing_units[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.billing_units[0]}>
                                                                
                                                                </input>
                                                                :
                                                                <input type="text"  style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.billing_units[0]}>
                                                                
                                                                </input>
                                                                }</>
                                                                }
                                                                </>
                                                            </td>

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                                
                                                                {(data.extend_amount[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.extend_amount[0]}></input>
                                                                :
                                                                <>
                                                                {(data.extend_amount[1]>=60&&data.extend_amount[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.extend_amount[0]}>
                                                                
                                                                </input>
                                                                :
                                                                <input type="text"  style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.extend_amount[0]}>
                                                                
                                                                </input>
                                                                }</>
                                                                }
                                                                </>
                                                            </td>
                                                            </> 
                                                        </tr>

                                                        </>
                                                    
                                                            ))}
                                                    </tbody>
                                                </>
                                                :
                                                <>
                                                {(template=="produceAvailable")?
                                                <>
                                                  <thead>
                                                    <tr>
                                                        {produceAvailable.map((header)=><td>{header}</td>)}
                                                    </tr>
                                                    </thead>
                                                    <tbody style={{height:"100px",overflow:"scroll"}}>
                                                        {dataSet.map((data)=>(
                                                        <>                                                  
                                                        <tr style={{border:"1px solid black",margin:"5px"}} >
                                                            {/* <td onClick={()=>console.log("extension",data.extension)}></td> */}
                                                            <>
                                                            <td style={{width:"80px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            
                                                            <>
                                                                
                                                                {(data.item_number[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.item_number[0]}></input>
                                                                :
                                                                <>
                                                                {(data.item_number[1]>=60&&data.item_number[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.item_number[0]}>
                                                                </input>

                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.item_number[0]}>
                                                                </input>
                                                                }</>
                                                                }
                                                                </>
                                                            </td>
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>{ data.qty_ship.map(qship=>(<>
                                                                
                                                                {(data.qty_order[1]>=80)?<input style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.qty_order[0]}></input>
                                                                :
                                                                <>
                                                                {(data.qty_order[1]>=60&&data.qty_order[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.qty_order[0]}>                                                         
                                                                </input>
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={ data.qty_order[0]}>
                                                                
                                                                </input>
                                                                }</>
                                                                }
                                                                </>))}
                                                            </td>
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.qty_ship.map(qship=>(<>
                                                            {(qship[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={qship[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (qship>=60&&qship<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={qship[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={qship[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 

                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                            { data.uom.map(uom=>(<>
                                                            {(uom[1]>=80)?
                                                                <input type="text"
                                                                style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={uom[0]}/>
                                                                :
                                                                <>
                                                                {
                                                                (uom>=60&&uom<80)?
                                                                
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={uom[0]}></input>
                                                                
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={uom[0]}></input>
                                                                }
                                                                </>
                                                            
                                                            }
                                                            
                                                            </> ))}
                                                            </>
                                                            </td> 
                                                            
                                                            <td style={{width:"100px",border:"1px solid black",height:"100%",textAlign:"center"}}>
                                                            <>
                                                                
                                                                {(data.unit_price[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={data.unit_price[0]}></input>
                                                                :
                                                                <>
                                                                {(data.unit_price[1]>=60&&data.unit_price[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={data.unit_price[0]}>
                                                                
                                                                </input>
                                                                :
                                                                <input type="text"  style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={data.unit_price[0]}>
                                                                
                                                                </input>
                                                                }</>
                                                                }
                                                                </>
                                                            </td>
                                                                
                                                            <td style={{width:"180px",border:"1px solid black",height:"100%",textAlign:"center"}}>{data.extend_amount.map(eamount=>(
                                                                <>
                                                                
                                                                {(eamount[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={eamount[0]}></input>
                                                                :
                                                                <>
                                                                {(eamount[1]>=60&&eamount[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={eamount[0]}>
                                                                
                                                                </input>
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={eamount[0]}>
                                                                
                                                                </input>
                                                                }
                                                                </>
                                                                }
                                                                </>
                                                            ))}
                                                        
                                                            </td>

                                                            <td style={{width:"180px",border:"1px solid black",height:"100%",textAlign:"center"}}>{data.unit_price.map(uprice=>(
                                                                <>
                                                                
                                                                {(uprice[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={uprice[0]}></input>
                                                                :
                                                                <>
                                                                {(uprice[1]>=60&&uprice[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={uprice[0]}>
                                                                
                                                                </input>
                                                                :
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"red"}} defaultValue={uprice[0]}>
                                                                
                                                                </input>
                                                                }
                                                                </>
                                                                }
                                                                </>
                                                            ))}
                                                        
                                                            </td>

                                                            <td style={{width:"180px",border:"1px solid black",height:"100%",textAlign:"center"}}>{data.description.map(desc=>(
                                                                <>
                                                                
                                                                {(desc[1]>=80)?<input type="text" style={{border:"none",background:"transparent",width:"100%",color:"green"}} defaultValue={desc[0]}></input>
                                                                :
                                                                <>
                                                                {(desc[1]>=60&&desc[1]<80)?
                                                                <input type="text" style={{border:"none",background:"transparent",width:"100%",color:"#FFD700"}} defaultValue={desc[0]}>
                                                                
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
                                                            
                                                            </> 
                                                        </tr>

                                                        </>
                                                    
                                                    
                                                            ))}
                                                    </tbody>
                                                </>
                                                :<></>
                                                }
                                                </>
                                                }
                                               </>
                                                }
                                            
                                            
                                           
                                            
                                        </table>
                                    </div>
                                    </div>
                                    <div className="setting-wrapper flex-x space-evenly cursor-pointer" style={{ display:"flex",justifyContent:"flex-end", width: "100%"}}>
                                    <div className="setting-wrapper flex-x center cursor-pointer" style={{ backgroundColor: "#6D9766", width: "fit-content", padding: "10px", margin: "0px 10px" }}>
                                        <span style={{ paddingLeft:"5px", fontSize: "16px", color: "#fff" }}
                                         onClick={()=>handleSubmit()} 
                                         >Save and Confirm</span>
                                    </div>
                                    <div className="setting-wrapper flex-x center cursor-pointer" style={{ backgroundColor: "#6D9766", width: "fit-content", padding: "10px" }}>
                                        <span style={{ paddingLeft:"5px", fontSize: "16px", color: "#fff" }}>Cancel</span>
                                    </div>
                                    </div>
                                </div>
                            <Table className="cursor-pointer" scroll={{y: 240}} dataSource={items}  onRow={(r,rowIndex) => ({
                                           onClick: (e) => {
                                            //    console.log(r);
                                            console.log("shippingAddress:",r.information.shipping_address[0])
                                               e.target.parentElement.style.backgroundColor="red";
                                               setImgSrc(items[rowIndex].image_name);
                                                    // console.log(e.target.parentElement.firstElementChild.nextSibling);
                                                    setdataindex(rowIndex)
                                                    dataSet.splice(0,dataSet.length)
                                                    // checkIndex();
                                                    
                                                    // console.log("invoice: ", items[rowIndex].information.lines);
                                                    // console.log("dataindex ", dataindex);

                                                    // console.log("ordereed items ",items[rowIndex].information.lines[0][0].qty_order);
                                                    for(let i=0;i<items[rowIndex].information.lines.length;i++)
                                                    {
                                                        { 
                                                        
                                                        if(items[rowIndex].information.template=="Jordanos")
                                                        {
                                                            setTemplate('Jordanos')
                                                            dataSet.push(
                                                            
                                                                {
                                                                    
                                                                    "itemno":items[rowIndex].information.lines[i][0].itemno,
                                                                    "shipped":items[rowIndex].information.lines[i][0].shipped,
                                                                    "pacsize":items[rowIndex].information.lines[i][0].pacsize,
                                                                    "um":items[rowIndex].information.lines[i][0].um,
                                                                    "brand":items[rowIndex].information.lines[i][0].brand,
                                                                    "upc":items[rowIndex].information.lines[i][0].upc,
                                                                    "extension":items[rowIndex].information.lines[i][0].extension,
                                                                    "unitprice":items[rowIndex].information.lines[i][0].unitprice,                                                   "description":items[rowIndex].information.lines[i][0].description,          
                                                                    
                                                                    "Template":items[rowIndex].information.template
                                                                    // parseFloat(items[dataindex].information.lines[i][0].qty_order[0])*parseFloat(items[dataindex].information.lines[i][0].unit_price[0])
                                                                }
                                                            )
                                                        }
                                                        
                                                         else if (items[rowIndex].information.template=="Pacific Coast Produce,Inc.")
                                                        {
                                                            setTemplate('pacificCoast')
                                                            dataSet.push(
                                                            
                                                                {
                                                                    
                                                                    "tx":items[rowIndex].information.lines[i][0].tx,
                                                                    "item":items[rowIndex].information.lines[i][0].item,
                                                                    "qty_order":items[rowIndex].information.lines[i][0].qty_order,
                                                                    "qty_ship":items[rowIndex].information.lines[i][0].qty_ship,
                                                                    "uom":items[rowIndex].information.lines[i][0].uom,
                                                                    "units":items[rowIndex].information.lines[i][0].units,
                                                                    "pack":items[rowIndex].information.lines[i][0].pack,
                                                                    "size":items[rowIndex].information.lines[i][0].size,
                                                                    "item_number":items[rowIndex].information.lines[i][0].item_number,
                                                                    "unit_price":items[rowIndex].information.lines[i][0].unit_price,
                                                                    "billing_units":items[rowIndex].information.lines[i][0].billing_units,
                                                                    "extend_amount":items[rowIndex].information.lines[i][0].extend_amount,
                                                                    "description":items[rowIndex].information.lines[i][0].description,          
                                                                    
                                                                    "Template":items[rowIndex].information.template
                                                                    // parseFloat(items[dataindex].information.lines[i][0].qty_order[0])*parseFloat(items[dataindex].information.lines[i][0].unit_price[0])
                                                                }
                                                            )
                                                        }

                                                         else if (items[rowIndex].information.template=="Produce Available")
                                                        {
                                                             setTemplate('produceAvailable')
                                                             dataSet.push(
                                                            
                                                                {
                                                                    
                                                                    "item_number":items[rowIndex].information.lines[i][0].item_number,
                                                                    "qty_order":items[rowIndex].information.lines[i][0].qty_order,
                                                                    "qty_ship":items[rowIndex].information.lines[i][0].qty_ship,
                                                                    "uom":items[rowIndex].information.lines[i][0].uom,
                                                                    "billing_units":items[rowIndex].information.lines[i][0].billing_units,
                                                                    "extend_amount":items[rowIndex].information.lines[i][0].extend_amount,
                                                                    "unit_price":items[rowIndex].information.lines[i][0].unit_price,
                                                                    "description":items[rowIndex].information.lines[i][0].description,
                                                                    "Template":items[rowIndex].information.template
                                                                    // parseFloat(items[dataindex].information.lines[i][0].qty_order[0])*parseFloat(items[dataindex].information.lines[i][0].unit_price[0])
                                                                }
                                                            )
                                                            
                                                        }
                                                       
                                                        else
                                                        {
                                                            dataSet.push(
                                                            
                                                                {
                                                                    "ItemNo":items[rowIndex].information.lines[i][0].item_number,
                                                                    "Qtyordered":items[rowIndex].information.lines[i][0].qty_order,
                                                                    "unit":items[rowIndex].information.lines[i][0].uom,
                                                                    "description":items[rowIndex].information.lines[i][0].description,
                                                                    "unitPrice":items[rowIndex].information.lines[i][0].unit_price,
                                                                    "Price":items[rowIndex].information.lines[i][0].unit_price,
                                                                    "Template":items[rowIndex].information.template
                                                                    // parseFloat(items[dataindex].information.lines[i][0].qty_order[0])*parseFloat(items[dataindex].information.lines[i][0].unit_price[0])
                                                                }
                                                            )
                                           
                                                        }
                                                     }

                                                     changeTop(
                                                         {
                                                             "shipping_address":items[rowIndex].information.shipping_address,
                                                             "invoice":items[rowIndex].information.invoice_number,
                                                             "orderDate":items[rowIndex].information.order_date,
                                                             "delivery":items[rowIndex].uploaded_at,
                                                             "total":items[rowIndex].information.total
                                                         }
                                                     )
                                                                    }  
                                                                    
                                                              console.log("topTable",topTable)      
                                                            },
                                                           
                                    })} pagination={false} >

                                            <Column align="center" title="Status" dataIndex="image_status" key="status"
                                            render={(value, record) => (
                                                record.date !== "Total" &&
                                                <Fragment>
                                                    {/* <Icon className="cursor-pointer gx-mr-2" type="camera" theme="filled" style={{ fontSize: "18px", color: "#757575" }} /> */}
                                                    {/* <Icon className="cursor-pointer gx-mr-2" type="clock-circle" style={{ fontSize: "18px", color: "#757575" }} onClick={(e) => addTimeFunc(e)} /> */}
                                                    {
                                                      ((((parseInt( record.information.shipping_address[1])+
                                                      parseInt(record.information.invoice_number[1])+
                                                      parseInt( record.information.total[1])+
                                                      parseInt(record.information.order_date[1]))/4))>95)?<>
                                                            <ExclamationCircleFilled style={{color:'green',fontSize:'30px'}} />                                              
                                                      
                                                      </>:<>
                                                      {
                                                      ((
                                                          (
                                                              (
                                                                  (parseInt( record.information.shipping_address[1])+
                                                       parseInt(record.information.invoice_number[1])+
                                                       parseInt( record.information.total[1])+
                                                       parseInt(record.information.order_date[1])
                                                       )/4)
                                                       )>=80)&&  (
                                                        (
                                                            (parseInt( record.information.shipping_address[1])+
                                                 parseInt(record.information.invoice_number[1])+
                                                 parseInt( record.information.total[1])+
                                                 parseInt(record.information.order_date[1])
                                                 )/4)
                                                 )<95)
                                                       
                                                       
                                                       
                                                       ?<>
                                                        <ExclamationCircleFilled style={{color:'orange',fontSize:'30px'}} /></>:<><ExclamationCircleFilled style={{color:'red',fontSize:'30px'}} /></>}
                                                      
                                                      </>
                                                    }
                                                    {/* {
                                                      ( (parseInt( record.information.shipping_address[1])+
                                                       parseInt(record.information.invoice_number[1])+
                                                       parseInt( record.information.total[1])+
                                                       parseInt(record.information.order_date[1]))/4)
                                                    }
                                                    */}
                                                </Fragment>
                                            )} />
                                            <Column align="center" title="Vendor" dataIndex="information.shipping_address[0]" key="vendor" />
                                            <Column align="center" title="Invoice Date" dataIndex="uploaded_at" key="invoiceDate" />
                                            <Column align="center" title="Invoice Number" dataIndex="information.invoice_number[0]" key="invoiceNumber" />
                                            <Column align="center" title="Amount" dataIndex="information.total[0]" key="total" />
                                            <Column align="center" title="Posted By" dataIndex="uploaded_by" key="postedBy" />
                                            
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
                                        </Table>
                            </div>
                        </div> :
                                <div className="table-card">

                                    
                                    <div className="table-container">
                                        <Table dataSource={items} pagination={false}>
                                            <Column align="center" title="Status" dataIndex="image_status" key="status" />
                                            <Column align="center" title="Vendor" dataIndex="information.shipping_address[0]" key="vendor" />
                                            <Column align="center" title="Invoice Date" dataIndex="uploaded_at" key="invoiceDate" />
                                            <Column align="center" title="Invoice Number" dataIndex="information.invoice_number[0]" key="invoiceNumber" />
                                            <Column align="center" title="Amount" dataIndex="information.total[0]" key="total" />
                                            <Column align="center" title="Posted By" dataIndex="uploaded_by" key="postedBy" />
                                            <Column
                                                align="center"
                                                title="Actions"
                                                dataIndex="actions"
                                                key="actions"
                                                render={(value, record) => (
                                                    record.date !== "Total" &&
                                                    <Fragment>
                                                        <Icon className="cursor-pointer" type="delete" style={{ fontSize: "18px", color: "#757575" }} />
                                                    </Fragment>
                                                )}
                                            />
                                        </Table>
                                        
                                    </div>
                                </div>
                            )
                }
            </div>  
        </Fragment >
    );
};

// export default index;
const WrappedModalIndex = Form.create()(Index);
export default WrappedModalIndex;