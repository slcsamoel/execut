import { useForm, usePage } from '@inertiajs/inertia-react';
import React, { useState , useEffect } from 'react';
import Base from '../../Layouts/Base'
import axios from 'axios';

export default function Create(props) {
    const { auth } = usePage().props;
    const tipoObras = props.tipoObras;
    const clientes = props.clientes;
    const pagamentos = props.pagamentos;

    const [estados, setEstados] = useState([]);
    const [cidades , setCidades] = useState([]);

    const {data, setData, post, reset, errors} = useForm({
            responsavelObra: null ,
            idCliente: null ,
            idPagamento: null,
            nomeObra: null,
            idTipoObra: null,
            valorOrcamento: null,
            dataInicio: null,
            previsaoEntrega: null,
            logradouro:'',
            complemento:'',
            cidade:'',
            estado:'',
        });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const listarEstados = () => {

        axios.get(`https://brasilapi.com.br/api/ibge/uf/v1`)
        .then((response) => {
            setEstados(response.data);
        })
        .catch((error) => {
            console.error("Error fetching related items:", error);
        });
    };

    const listarCidades = (estado) => {

        axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${estado}?providers=dados-abertos-br,gov,wikipedia`)
        .then((response) => {
            setCidades(response.data);
        })
        .catch((error) => {
            console.error("Error fetching related items:", error);
        });
    };

    useEffect(() => {
        listarEstados();
     }, []);

     useEffect(() => {
         if (data.estado) {
             listarCidades(data.estado);
         }
     }, [data.estado]);



    const onSubmit = (e) => {
        e.preventDefault();
        post(route('obras.store'), {
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
                             <h4>Obra</h4>
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
                                    <p className="mb-0">Criar Nova Obra</p>
                                    <button type='submit' className="btn btn-primary btn-sm ms-auto">Save</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label htmlFor="username" className="form-control-label">Nome</label>
                                            <input className="form-control" type="text" name='nomeObra' value={data.nomeObra} onChange={onChange} id="nomeObra" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label htmlFor="email" className="form-control-label">Responsavel</label>
                                                <input className="form-control" type="text" name='responsavelObra' value={data.responsavelObra} onChange={onChange} id="responsavelObra" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Valor do orçamento</label>
                                            <input className="form-control" type="text" name='valorOrcamento' value={data.valorOrcamento} onChange={onChange} id="valorOrcamento" />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Previsão de Entrega</label>
                                            <input className="form-control" type="date" name='previsaoEntrega' value={data.previsaoEntrega} onChange={onChange} id="previsaoEntrega" />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Data de Inicio</label>
                                            <input className="form-control" type="date" name='dataInicio' value={data.dataInicio} onChange={onChange} id="dataInicio" />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Tipo de Obra</label>
                                            <select
                                                    className="form-control"
                                                    name='idTipoObra'
                                                    value={data.idTipoObra}
                                                    onChange={onChange}
                                                    id="idTipoObra"
                                                >
                                                    <option value="">---</option>
                                                    {tipoObras.map((tipo) => (
                                                        <option key={tipo.id} value={tipo.id}>
                                                            {tipo.nomeTipo}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Tipo de Pagamento</label>
                                            <select
                                                    className="form-control"
                                                    name='idPagamento'
                                                    value={data.idPagamento}
                                                    onChange={onChange}
                                                    id="idPagamento"
                                                >
                                                    <option value="">---</option>
                                                    {pagamentos.map((pagamento) => (
                                                        <option key={pagamento.id} value={pagamento.id}>
                                                            {pagamento.tipoPagamento}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Cliente</label>
                                            <select
                                                    className="form-control"
                                                    name='idCliente'
                                                    value={data.idCliente}
                                                    onChange={onChange}
                                                    id="idCliente"
                                                >
                                                    <option value="">---</option>
                                                    {clientes.map((cliente) => (
                                                        <option key={cliente.id} value={cliente.id}>
                                                            {cliente.nomeCliente} - {cliente.razaoSocial}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        </div>
                                        <hr className="horizontal dark" />
                                        <p className="text-uppercase text-sm">Informações de Endereço</p>
                                        <div className="row">
                                            <div className="form-group">
                                                <label htmlFor="logradouro" className="col-form-label">Logradouro:</label>
                                                <input type="text" className="form-control" name='logradouro' value={data.logradouro} onChange={onChange} id="logradouro"/>
                                                {errors && <div className='text-danger mt-1'>{errors.logradouro}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="complemento" className="col-form-label">Complemento:</label>
                                                <input type="text" className="form-control" name='complemento' value={data.complemento} onChange={onChange} id="complemento"/>
                                                {errors && <div className='text-danger mt-1'>{errors.complemento}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="estado" className="col-form-label">Estado(UF):</label>
                                                <select
                                                    className="form-control"
                                                    name='estado'
                                                    value={data.estado}
                                                    onChange={onChange}
                                                    id="estado"
                                                >
                                                    <option value="">Selecione um estado</option>
                                                    {estados.map((estado) => (
                                                        <option key={estado.sigla} value={estado.sigla}>
                                                            {estado.nome}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors && <div className='text-danger mt-1'>{errors.estado}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cidade" className="col-form-label">Cidade:</label>
                                                <select
                                                    className="form-control"
                                                    name='cidade'
                                                    value={data.cidade}
                                                    onChange={onChange}
                                                    id="cidade"
                                                    disabled={!data.estado}
                                                >
                                                    <option value="">Selecione uma cidade</option>
                                                    {cidades.map((cidade, index) => (
                                                        <option key={index} value={cidade.nome}>
                                                            {cidade.nome}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors && <div className='text-danger mt-1'>{errors.cidade}</div>}
                                            </div>
                                        </div>
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

Create.layout = (page) => <Base children={page} title={"Obra"}/>

