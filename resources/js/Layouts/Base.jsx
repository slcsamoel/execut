import { Head, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../Components/Dashboard/Navbar'
import Sidebar from '../Components/Dashboard/Sidebar'
import Footer from '../Components/Dashboard/Footer'

export default function Base({children, title}) {
    const { flash } = usePage().props;

    flash.type && toast[flash.type](flash.message)

    return (
        <div className="g-sidenav-show " style={{ backgroundColor: '#E2B3B3' }}>
            <div className="min-height-300 position-absolute w-100" style={{ backgroundColor: '#E2B3B3' }}></div>
                <Head title={ title } />
                <Sidebar />
                <main className="main-content position-relative border-radius-lg d-flex flex-column min-vh-100 ">
                    <Navbar pageName={ title } />
                    <Toaster position='top-center' duration='4000'/>
                    {children}
                    <Footer/>
                </main>
        </div>
    )
}
