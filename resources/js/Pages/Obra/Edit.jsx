import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import React, { useState , useEffect } from 'react';
import Base from '../../Layouts/Base'
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import useDialog from '../../Hooks/useDialog';
import Dialog from '../../Components/Dashboard/Dialog';
import { validarStatusObra , maskMoney} from '../../Utils/helpers';

export default function Edit(props) {
    const { auth } = usePage().props;
    const tipoObras = props.tipoObras;
    const clientes = props.clientes;
    const pagamentos = props.pagamentos;
    const obra = props.obra;
    const valorObra = props.valorObra;
    const valorMateria = props.valorMateria;
    const valorPrestador = props.valorPrestador;

    console.log(obra);

    const [estados, setEstados] = useState([]);
    const [cidades , setCidades] = useState([]);

    const [finalizarDialogHandler, finalizarCloseTrigger,finalizarTrigger] = useDialog();
    const [CancelarDialogHandler, CancelarCloseTrigger,CancelarTrigger] = useDialog();

    const {data, setData, put, reset, errors} = useForm({
            responsavelObra: obra.responsavelObra ,
            idCliente: obra.idCliente ,
            idPagamento: obra.idPagamento,
            nomeObra: obra.nomeObra,
            idTipoObra: obra.idTipoObra,
            valorOrcamento: maskMoney(obra.valorOrcamento),
            dataInicio: obra.dataInicio,
            previsaoEntrega: obra.previsaoEntrega,
            logradouro: obra.endereco.logradouro,
            complemento: obra.endereco.complemento,
            cidade:obra.endereco.cidade,
            estado:obra.endereco.estado,
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
        put(route('obras.update', obra.id), {
            data,
            onSuccess: () => {
            },
        });
    }

    const openFinalizarDialog = () => {
        finalizarDialogHandler()
    }

    const openCancelarDialog = () => {
        CancelarDialogHandler()
    }

    const finalizarObra = () => {
        Inertia.post(
            route('obras.finalizar', obra.id),
            { onSuccess: () => finalizarCloseTrigger() });
    }

    const cancelarObra = () => {
        Inertia.post(
            route('obras.cancelar', obra.id),
            { onSuccess: () => CancelarCloseTrigger() });
    }

    return (
        <>
            <div>

                <Dialog trigger={finalizarTrigger} title={`Finalizar Obra: ${obra.nomeObra}`}>
                    <p>Deseja Finalizar a obra?</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal" onClick={finalizarCloseTrigger}>Fechar</button>
                        <button type="submit" onClick={finalizarObra} className="btn bg-gradient-danger">Finalizar</button>
                    </div>
                </Dialog>

                <Dialog trigger={CancelarTrigger} title={`Cancelar Obra: ${obra.nomeObra}`}>
                    <p>Deseja Cancelar a obra?</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal" onClick={CancelarCloseTrigger} >Fechar</button>
                        <button type="submit" onClick={cancelarObra} className="btn bg-gradient-danger">Cancelar</button>
                    </div>
                </Dialog>

                <div className="card shadow-lg mx-4 my-3">
                    <div className="card-body p-3">
                    <div className="row gx-4">
                        <div className="col-auto">
                            <div className="avatar avatar-xl position-relative">
                                <h4>Editar Obra</h4>
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
                                        <Link type='button'  href={route('materiais.index', obra.id)} className="btn bg-gradient-secondary btn-sm ms-auto">Materiais</Link>
                                        <Link type="button" href={route('funcionarios.index', obra.id)} className="btn bg-gradient-secondary btn-sm ms-auto">Prestadores</Link>
                                        <Link type='button' href={route('obras.relatorio', obra.id)} className="btn bg-gradient-secondary btn-sm ms-auto">Relatorios</Link>
                                        {validarStatusObra(obra.status) ?
                                            <>
                                                <button type='button' className="btn btn-primary btn-sm ms-auto" onClick={openFinalizarDialog}>Finalizar</button>
                                                <button type='button' className="btn btn-danger btn-sm ms-auto" onClick={openCancelarDialog}>Cancelar</button>
                                            </>
                                        :
                                            ''

                                        }

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label htmlFor="username" className="form-control-label">Nome</label>
                                            <input className="form-control" type="text" name='nomeObra' value={data.nomeObra} onChange={onChange} id="nomeObra"  readOnly={!validarStatusObra(obra.status)}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <label htmlFor="email" className="form-control-label">Responsavel</label>
                                                <input className="form-control" type="text" name='responsavelObra' value={data.responsavelObra} onChange={onChange} id="responsavelObra" readOnly={!validarStatusObra(obra.status)} />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Valor do orçamento</label>
                                            <input className="form-control" type="text" name='valorOrcamento' value={data.valorOrcamento}  onChange={(e)=> setData('valorOrcamento',maskMoney(e.target.value))}  id="valorOrcamento" readOnly={!validarStatusObra(obra.status)} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Total de Materias</label>
                                                <input className="form-control" type="text" name='valorMateria' value={maskMoney(valorMateria)} id="valorMateria"  readOnly/>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Total de Mão de Obra</label>
                                                <input className="form-control" type="text" name='valorPrestador' value={maskMoney(valorPrestador)} id="valorPrestador"  readOnly/>
                                            </div>
                                        </div>

                                        {obra.status === 4 ?

                                         <div className="col-md-4">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Valor Final da Obra</label>
                                                <input className="form-control" type="text" name='valorFinal' value={maskMoney(obra.valorFinal)} id="valorFinal"  readOnly/>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-md-4">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Valor Atual da Obra</label>
                                                <input className="form-control" type="text" name='valorObra' value={maskMoney(valorObra)} id="valorObra"  readOnly/>
                                            </div>
                                        </div>
                                        }

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Previsão de Entrega</label>
                                            <input className="form-control" type="date" name='previsaoEntrega' value={data.previsaoEntrega} onChange={onChange} id="previsaoEntrega" readOnly={!validarStatusObra(obra.status)}/>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                            <label htmlFor="name" className="form-control-label">Data de Inicio</label>
                                            <input className="form-control" type="date" name='dataInicio' value={data.dataInicio} onChange={onChange} id="dataInicio" readOnly={!validarStatusObra(obra.status)} />
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
                                                    readOnly={!validarStatusObra(obra.status)}
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
                                                    readOnly={!validarStatusObra(obra.status)}
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
                                                    readOnly={!validarStatusObra(obra.status)}
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
                                                <input type="text" className="form-control" name='logradouro' value={data.logradouro} onChange={onChange} id="logradouro" readOnly={!validarStatusObra(obra.status)}/>
                                                {errors && <div className='text-danger mt-1'>{errors.logradouro}</div>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="complemento" className="col-form-label">Complemento:</label>
                                                <input type="text" className="form-control" name='complemento' value={data.complemento} onChange={onChange} id="complemento" readOnly={!validarStatusObra(obra.status)}/>
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
                                                    readOnly={!validarStatusObra(obra.status)}
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
                                                    readOnly={!validarStatusObra(obra.status)}
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

                                        {validarStatusObra(obra.status) ?
                                        <div className="row">
                                            <div className="form-group">
                                                <button type='submit' className="btn btn-primary btn-sm ms-auto">Atualizar</button>
                                            </div>
                                        </div>
                                        :
                                        ''
                                        }

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

Edit.layout = (page) => <Base children={page} title={"Obra"}/>

