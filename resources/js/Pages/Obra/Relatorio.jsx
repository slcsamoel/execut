import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import React, { useState, useEffect } from "react";
import Base from "../../Layouts/Base";
import axios from "axios";
import { maskMoney , maskPhone } from "../../Utils/helpers";

export default function Relatorio(props) {
    const { auth } = usePage().props;
    const obra = props.obra;
    const valorObra = props.valorObra;
    const valorMateria = props.valorMateria;
    const valorPrestador = props.valorPrestador;
    const materias = props.materias;
    const prestadores = props.prestadores;

    useEffect(() => {}, []);


    const statusObra = () => {
        if (obra.status === 1) {
            return "Em andamento";
        } else if (obra.status === 2) {
            return "Pausada";
        }else if (obra.status === 3){
            return "Cancelada";
        }else if (obra.status === 4){
            return "Concluída";
        }
    }

    return (
        <>
            <div>
                <div className="card shadow-lg mx-4 my-3">
                    <div className="card-body p-3">
                        <div className="row gx-4">
                            <div className="col-auto">
                                <div className="avatar avatar-xl position-relative">
                                    <h4>Relatorio</h4>
                                </div>
                            </div>
                            <div className="col-auto my-auto">
                                <div className="h-100">
                                    <h5 className="mb-1">{auth.user.name}</h5>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3"></div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-4">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header pb-0">
                                    <div className="d-flex align-items-center">
                                        <Link type='button' href={route('obras.edit', obra.id)} className="btn bg-gradient-secondary btn-sm ms-auto">Obra</Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <h5>{obra.nomeObra}</h5>
                                                <p>
                                                    {obra.endereco.logradouro}
                                                </p>
                                                <p>
                                                    {obra.endereco.complemento}
                                                </p>
                                                <p>
                                                    {obra.endereco.cidade}-
                                                    {obra.endereco.estado}
                                                </p>

                                                <label
                                                    htmlFor="name"
                                                    className="form-control-label"
                                                >
                                                   Status:
                                                </label>
                                                <h5>
                                                    {statusObra(obra.status)}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="username"
                                                    className="form-control-label"
                                                >
                                                    Cliente:
                                                </label>
                                                <h5>
                                                    {obra.cliente.nomeCliente}
                                                </h5>
                                                <p>
                                                    {obra.cliente.razaoSocial} -{" "}
                                                    {maskPhone(obra.cliente.telefone)}{" "}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="email"
                                                    className="form-control-label"
                                                >
                                                    Responsavel
                                                </label>
                                                <h5>{obra.responsavelObra}</h5>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="name"
                                                    className="form-control-label"
                                                >
                                                    Total de Materias:
                                                </label>
                                                <h5>{maskMoney(valorMateria)}</h5>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="name"
                                                    className="form-control-label"
                                                >
                                                    Total de Mão de obra:
                                                </label>
                                                <h5>{maskMoney(valorPrestador)}</h5>
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="name"
                                                    className="form-control-label"
                                                >
                                                    Valor do orçamento:
                                                </label>
                                                <h5>{maskMoney(obra.valorOrcamento)}</h5>
                                            </div>
                                        </div>

                                        {obra.valorFinal ? (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="name"
                                                        className="form-control-label"
                                                    >
                                                        Valor da Obra:
                                                    </label>
                                                    <h5>{maskMoney(obra.valorFinal)}</h5>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="name"
                                                        className="form-control-label"
                                                    >
                                                        Valor Parcial da obra:
                                                    </label>
                                                    <h5>{maskMoney(valorObra)}</h5>
                                                </div>
                                            </div>
                                        )}


                                    </div>
                                    <hr className="horizontal dark" />
                                    <p className="text-uppercase text-sm">
                                        Prestadores da Obra
                                    </p>
                                    <div className="row">
                                    <table className="table align-items-center justify-content-center mb-0" width="100%">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">Nome</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Função</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Dias Trabalhados</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Total de Valor</th>
                                            </tr>
                                        </thead>
                                            <tbody>
                                                {prestadores.map((prestadorObra) => (

                                                    <tr key={prestadorObra.id}>
                                                        <td className='text-left'>
                                                                <div className="d-flex px-2">
                                                                    <div className="my-auto">
                                                                        <h6 className="mb-0 text-sm">{prestadorObra.prestador.nomePrestador}</h6>
                                                                    </div>
                                                                </div>
                                                        </td>
                                                        <td className='text-left'>
                                                                <p className="text-sm font-weight-bold mb-0">{prestadorObra.prestador.funcao.nomeFuncao}</p>
                                                        </td>
                                                        <td className='text-left'>
                                                                <p className="text-sm font-weight-bold mb-0">{prestadorObra.diasTrabalhados}</p>
                                                        </td>
                                                        <td className='text-left'>
                                                                <p className="text-sm font-weight-bold mb-0">{maskMoney(prestadorObra.valorTotalTrabalhado)}</p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        </div>


                                    <hr className="horizontal dark" />
                                    <p className="text-uppercase text-sm">
                                        Materias da Obra
                                    </p>
                                    <div className="row">
                                    <table className="table align-items-center justify-content-center mb-0" width="100%">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">Nome</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">fornecedor</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">dataCompra</th>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Total de Valor</th>
                                            </tr>
                                        </thead>
                                            <tbody>
                                                {materias.map((material) => (

                                                    <tr key={material.id}>
                                                        <td className='text-left'>
                                                                <div className="d-flex px-2">
                                                                    <div className="my-auto">
                                                                        <h6 className="mb-0 text-sm">{material.nomeMaterial}</h6>
                                                                    </div>
                                                                </div>
                                                        </td>
                                                        <td className='text-left'>
                                                                <p className="text-sm font-weight-bold mb-0">{material.fornecedor.razaoSocial}</p>
                                                        </td>
                                                        <td className='text-left'>
                                                                <p className="text-sm font-weight-bold mb-0">{material.dataCompra}</p>
                                                        </td>
                                                        <td className='text-left'>
                                                                <p className="text-sm font-weight-bold mb-0">{maskMoney(material.valor)}</p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        </div>

                                        {/* <div className="row">
                                            <div className="form-group">
                                                <button type='submit' className="btn btn-primary btn-sm ms-auto">Save</button>
                                            </div>
                                        </div>  */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Relatorio.layout = (page) => (
    <Base children={page} title={"Relatorio de Obra"} />
);
