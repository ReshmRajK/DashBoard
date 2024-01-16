import React, { useEffect, useState } from 'react'
import './Home.css'
import briefcase from '../UI/Assets/briefcase.png'
import statboard from '../UI/Assets/StatBoard.png'
import circlemenu from '../UI/Assets/Circled Menu.png'
import help from '../UI/Assets/Help.png'
import facebook from '../UI/Assets/facebook.png'
import twitter from '../UI/Assets/twitter.png'
import instagram from '../UI/Assets/instagram.png'
import media from '../UI/Assets/media.png'
import puzzle from '../UI/Assets/Puzzle.png'
import rectangle10 from '../UI/Assets/Rectangle 10.png'
import shutdown from '../UI/Assets/Shutdown.png'
import support from '../UI/Assets/Support.png'
import { Col, Container, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { graphDataApi, pieChartDataApi, tableDataApi } from '../service/allApi'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Pie, PieChart } from 'recharts'

ChartJS.register(
     LineElement, Legend,
    CategoryScale, LinearScale, PointElement
)


function Home() {

    const [tableData, setTableData] = useState([])
    const [graphData, setGraphData] = useState(null)
    const [pieChartData, setPieChartData] = useState(null)


    const getTableData = async () => {
        const { data } = await tableDataApi()
        setTableData(data)
    }



    const getGraphData = async () => {
        const result = await graphDataApi()
        if (result.data.length > 0) {
            setGraphData({
                labels: result.data.map(item => item.x),
                datasets: [{
                    label: 'y',
                    data: result.data.map(item => item.y),
                    borderColor: 'skyblue',
                    pointBorderWidth: 4,
                    tension: 0.5
                }]
            })

        }
        else {
            console.log('No Data');
        }
    }
    const options = {
        plugins: {
            legend: false
        },
    }



    const getPieChartData = async () => {
        const result = await pieChartDataApi()
        console.log(result.data);
        if (result.data.length > 0) {
            setPieChartData({
                labels: result.data.map(item => item.label),
                datasets: [{
                    label: 'value',
                    data: result.data.map(item => item.value)
                }]
            })

        }
        else {
            console.log('No Data');
        }

        // const label = [];
        // const data = [];
        // for(var i of result.data) {
        //     label.push(i.label);
        //     data.push(i.value)
        // }

        // setPieChartData({
        //              labels: result.data.map(item => item.label),
        //              datasets: [{
        //                 label: 'value',
        //                 data: result.data.map(item => item.value),
                        
        //              }]
        //         })

    }
    console.log(pieChartData);

    useEffect(() => {
        getTableData()
        getGraphData()
        getPieChartData()

    }, [])



    return (
        <div className=' ' style={{ width: '100vw', height: '100vh' }}>

            <Row>
                <Col lg={2} className='left_section' >
                    <div className='text-center mt-5 mb-5'>
                        <img src={`${briefcase}`} alt="Sorry...!" style={{ width: '100px', height: '100px' }} />
                        <img className='' src={`${statboard}`} alt="Sorry" />
                    </div>

                    <div className='dashboard mb-4  ms-5 '>
                        <img className='me-2 ms-5' src={`${circlemenu}`} alt="Sorry" />
                        <b>Dashboard</b>
                    </div>

                    <div className='left_side_menu_section mb-4  ms-5 '>
                        <img className='me-2 ms-5' src={`${support}`} alt="Sorry" />
                        <b className='text-white'>Support</b>
                    </div>

                    <div className='left_side_menu_section mb-4  ms-5'>
                        <img className='me-2 ms-5' src={`${puzzle}`} alt="Sorry" />                             <b className='text-white'>Plugins</b>
                    </div>
                    <div className='left_side_menu_section mb-4  ms-5 '>
                        <img className='me-2 ms-5' src={`${help}`} alt="Sorry" />
                        <b className='text-white'>Help</b>
                    </div>

                    <div className=' mt-5 ms-5 text-center text-danger d-flex justify-content-center' >
                        <p className='me-2'>Logout</p>
                        <img className='mt-1' src={`${shutdown}`} alt="Sorry" style={{ width: '15px', height: '15px' }} />
                    </div>

                </Col>

                <Col lg={10} className='right_section' >

                    <div className='d-flex justify-content-between mt-3'>
                        <p className='wish ms-5'>Good Morning !<i className="fa-solid fa-sun ms-2 text-warning"></i></p>

                        <div className='right_side_first_section me-5 d-flex gap-2'>
                            <div className='ms-4'>
                                <p id='name'>John Doe</p>
                                <p id='email'>john@doc.com</p>
                            </div>
                            <img className='mt-1' src={`${rectangle10}`} alt="Sorry" style={{ width: '50px', height: '40px' }} />

                        </div>
                    </div>

                    <Container className='mt-5'>
                        <Row>
                            <Col lg={8} className=' me-5 column_content' >
                                {graphData !== null ? (
                                    <Line data={graphData} options={options} />
                                ) : (
                                    <h1>No data</h1>
                                )}

                            </Col>

                            <Col lg={3} className='column_content'>

                            {pieChartData!==null ? (
                                    <Pie data={pieChartData} />
                                ) : (
                                    <h1>No data</h1>
                                )}
                            </Col>
                        </Row>
                    </Container>


                    <Container className='mt-5 mb-5'>
                        <Row>
                            <Col lg={9} className='me-5 '>
                                {
                                    tableData.length > 0 ? (
                                        <Table striped bordered hover className='column_content'>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tableData.map((item, index) =>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.price}</td>
                                                        </tr>

                                                    )
                                                }


                                            </tbody>
                                        </Table>

                                    ) : <h1 className='text-center p-5'>No Data...!</h1>
                                }


                            </Col>
                            <Col lg={2} className=''>

                                <Card style={{ width: '10rem' }} className='text-center column_content'>
                                    <Card.Img variant="top" src={`${media}`} />
                                    <Card.Body style={{}}>
                                        <Card.Title>John Doe</Card.Title>
                                        <Card.Text>
                                            <p>CEO</p>
                                            <div className='d-flex justify-content-center gap-3'>
                                                <img src={`${facebook}`} alt="sorry" />
                                                <img src={`${instagram}`} alt="Sorry" />
                                                <img src={`${twitter}`} alt="Sorry" />
                                            </div>

                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div>


    )
}

export default Home