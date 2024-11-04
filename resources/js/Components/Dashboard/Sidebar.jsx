import { Link } from '@inertiajs/inertia-react'
import React from 'react'

export default function Sidebar() {
    return (
        <aside className="sidenav bg-default navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer opacity-5 position-absolute end-0 top-0 d-none d-xl-none opacity-8 text-white" aria-hidden="true" id="iconSidenav" />
                <Link className="navbar-brand m-0" href={route('dashboard')} target="_blank">
                    {/* <img src="/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" /> */}
                    <span className="ms-1 font-weight-bold"> Sistema Execut</span>
                </Link>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className={`${route().current('dashboard') && 'active'} nav-link`} href={route('dashboard')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Configurações</h6>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('profile') && 'active'} nav-link`} href={route('profile')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-single-02 text-dark text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Perfil</span>
                        </Link>
                    </li>
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Sistema</h6>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('users.*') && 'active'} nav-link`} href={route('users.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-user-lock text-warning text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Usuarios</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`${route().current('clientes.*') && 'active'} nav-link`} href={route('clientes.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-user-tie text-warning text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Clientes</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className={`${route().current('prestadores.*') && 'active'} nav-link`} href={route('prestadores.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-user text-warning text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Prestadores</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className={`${route().current('funcoes.*') && 'active'} nav-link`} href={route('funcoes.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-user text-warning text-sm opacity-10" />
                            </div>
                            <span className="nav-link-text ms-1">Funções de Prestadores</span>
                        </Link>
                    </li>


                    <li className="nav-item">
                        <Link className={`${route().current('obras.*') && 'active'} nav-link`} href={route('obras.index')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-hammer text-warning text-sm opacity-10"/>
                            </div>
                            <span className="nav-link-text ms-1">Obras</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link " as='a' method='post' href={route('logout')}>
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="fas fa-sign-out-alt text-danger text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Sair</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
