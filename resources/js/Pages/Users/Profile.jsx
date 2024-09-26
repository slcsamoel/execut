import { useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react'
import Base from '../../Layouts/Base'

export default function Profile(props) {
    const { auth } = usePage().props;

    const {data, setData, put, reset, errors} = useForm({ nomeUsuario: auth.user.nomeUsuario, email: auth.user.email, razaoSocial: auth.user.razaoSocial, telefone: auth.user.telefone, cpfCnpj:auth.user.cpfCnpj});

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    console.log(auth.user);

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', auth.user.id), {
            data,
            onSuccess: () => {

            },
        });
    }

    return (
        <>
            <div>
                <div className="card shadow-lg mx-4 my-3">
                    <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className="col-auto">
                        <div className="avatar avatar-xl position-relative">
                             <h4>Perfil</h4>
                        </div>
                        </div>
                        <div className="col-auto my-auto">
                        <div className="h-100">
                            <h5 className="mb-1">
                            {auth.user.name}
                            </h5>
                            {/* <p className="mb-0 font-weight-bold text-sm">
                            Public Relations
                            </p> */}
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">

                        </div>
                    </div>
                    </div>
                </div>
                <div className="container-fluid py-4">
                    <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <form onSubmit={onSubmit}>
                                <div className="card-header pb-0">
                                    <div className="d-flex align-items-center">
                                    <p className="mb-0">Editar Perfil</p>
                                    <button type='submit' className="btn btn-primary btn-sm ms-auto">Save</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="text-uppercase text-sm">Informações do usuario</p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label htmlFor="username" className="form-control-label">Nome</label>
                                            <input className="form-control" type="text" name='nomeUsuario' value={data.nomeUsuario} onChange={onChange} id="nomeUsuario" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label htmlFor="email" className="form-control-label">Email</label>
                                            <input className="form-control" type="email" name='email' value={data.email} onChange={onChange} id="email" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Razao Social/Nome Completo</label>
                                            <input className="form-control" type="text" name='razaoSocial' value={data.razaoSocial} onChange={onChange} id="razaoSocial" />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Cpf/Cnpj</label>
                                            <input className="form-control" type="text" name='cpfCnpj' value={data.cpfCnpj} onChange={onChange} id="cpfCnpj" />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Telefone</label>
                                            <input className="form-control" type="text" name='telefone' value={data.telefone} onChange={onChange} id="telefone" />
                                            </div>
                                        </div>

                                        </div>
                                        {/* <hr className="horizontal dark" />
                                        <p className="text-uppercase text-sm">Informações de Endereço</p>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="address" className="form-control-label">Logradouro</label>
                                                    <input className="form-control" type="text" name='address' value={data.address} onChange={onChange} id="address" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="address" className="form-control-label">Complemento</label>
                                                    <input className="form-control" type="text" name='address' value={data.address} onChange={onChange} id="address" />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="address" className="form-control-label">Cidade</label>
                                                    <input className="form-control" type="text" name='address' value={data.address} onChange={onChange} id="address" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="address" className="form-control-label">Estado(UF)</label>
                                                    <input className="form-control" type="text" name='address' value={data.address} onChange={onChange} id="address" />
                                                </div>
                                            </div>
                                        </div> */}
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </>
    )
}

Profile.layout = (page) => <Base children={page} title={"Perfil"}/>

