import React from 'react'
import Base from '../Layouts/Base'

export default function Dashboard(props) {
        const qntObras = props.obras;
        const qntClientes = props.clientes;
        const qntPrestador = props.prestadores;


    return (
        <>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Obras Realizadas</p>
                                <h5 className="font-weight-bolder">
                                  {qntObras}
                                </h5>
                                <p className="mb-0">
                                <span className="text-success text-sm font-weight-bolder">+</span>
                                </p>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Clientes </p>
                                <h5 className="font-weight-bolder">
                                 {qntClientes}
                                </h5>
                                <p className="mb-0">
                                <span className="text-success text-sm font-weight-bolder">+</span>
                                </p>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                                <i className="ni ni-world text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Prestadores</p>
                                <h5 className="font-weight-bolder">
                                {qntPrestador}
                                </h5>
                                <p className="mb-0">
                                <span className="text-danger text-sm font-weight-bolder">+</span>
                                </p>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                                <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* <div className="col-xl-3 col-sm-6">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Sales</p>
                                <h5 className="font-weight-bolder">
                                $103,430
                                </h5>
                                <p className="mb-0">
                                <span className="text-success text-sm font-weight-bolder">+5%</span> than last month
                                </p>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                                <i className="ni ni-cart text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div> */}
                </div>
                <div className="row mt-4">

                    {/* <div className="col-lg-5">
                        <div className="card card-carousel overflow-hidden h-100 p-0">
                            <div id="carouselExampleCaptions" className="carousel slide h-100" data-bs-ride="carousel">
                            <div className="carousel-inner border-radius-lg h-100">
                                <div className="carousel-item h-100 active" style={{backgroundImage: 'url("/img/carousel-1.jpg")', backgroundSize: 'cover'}}>
                                <div className="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                                    <div className="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                                    <i className="ni ni-camera-compact text-dark opacity-10" />
                                    </div>
                                    <h5 className="text-white mb-1">Get started with Argon</h5>
                                    <p>There’s nothing I really wanted to do in life that I wasn’t able to get good at.</p>
                                </div>
                                </div>
                                <div className="carousel-item h-100" style={{backgroundImage: 'url("/img/carousel-2.jpg")', backgroundSize: 'cover'}}>
                                <div className="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                                    <div className="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                                    <i className="ni ni-bulb-61 text-dark opacity-10" />
                                    </div>
                                    <h5 className="text-white mb-1">Faster way to create web pages</h5>
                                    <p>That’s my skill. I’m not really specifically talented at anything except for the ability to learn.</p>
                                </div>
                                </div>
                                <div className="carousel-item h-100" style={{backgroundImage: 'url("/img/carousel-3.jpg")', backgroundSize: 'cover'}}>
                                <div className="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                                    <div className="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                                    <i className="ni ni-trophy text-dark opacity-10" />
                                    </div>
                                    <h5 className="text-white mb-1">Share with us your design tips!</h5>
                                    <p>Don’t be afraid to be wrong because you can’t learn anything from a compliment.</p>
                                </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev w-5 me-3" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next w-5 me-3" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>

        </>
    )
}

Dashboard.layout = (page) => <Base children={page} title={"Dashboard"}/>
