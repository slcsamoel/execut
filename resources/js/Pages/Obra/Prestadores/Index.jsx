import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../../Components/Dashboard/Dialog';
import Base from '../../../Layouts/Base';
import useDialog from '../../../Hooks/useDialog';
import { Inertia } from '@inertiajs/inertia';
import CreatePrestadorObra from '../../../Components/Dashboard/Obra/Prestadores/CreatePrestadorObra';
import EditPrestadorObra from '../../../Components/Dashboard/Obra/Prestadores/EditPrestadorObra';
import {formatDate , validarStatusObra} from '../../../Utils/helpers';


export default function Index(props) {

    const {data: prestadores, links, meta} = props.prestadoresObras;
    const obra = props.obra;
    const todosPrestadores = props.prestadores;
    const [state, setState] = useState([])
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog()
    const [UpdateDialogHandler, UpdateCloseTrigger,UpdateTrigger] = useDialog()
    const [destroyDialogHandler, destroyCloseTrigger,destroyTrigger] = useDialog()

    const openUpdateDialog = (prestador) => {
        setState(prestador);
        UpdateDialogHandler()
    }

    const openDestroyDialog = (prestador) => {
        setState(prestador);
        destroyDialogHandler()
    };

    console.log(obra);

    const destroyFuncao = () => {
        Inertia.delete(
            route('funcionarios.destroy',[obra.id ,state.id]),
            { onSuccess: () => destroyCloseTrigger() });
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Vincular novo prestador">
                    <CreatePrestadorObra close={addCloseTrigger} todosPrestadores={todosPrestadores} obra={obra}/>
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Finalizar Participação`}>
                    <EditPrestadorObra model={state} close={UpdateCloseTrigger} obra={obra}/>
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Excluir prestador da obra`}>
                    <p>Deseja Exluir o Prestador da obra ?</p>
                    <p>Ao excluir não será contabilizado no valor da obra</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" onClick={destroyFuncao} className="btn bg-gradient-danger">Deletar</button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">
                            <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-md-4">
                                    <h6>Prestadores</h6>
                                </div>
                                <div className="col-md-8 d-flex justify-content-end">
                                    <Link type="button" href={route('obras.edit', obra.id)} className="btn bg-primary-success btn-block mb-3" style={{ margin: '5px' }}>
                                        Obra
                                    </Link>

                                    {validarStatusObra(obra.status) ?
                                        <button onClick={addDialogHandler} type="button" className="btn bg-gradient-success btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                            Vincular Novo  prestador
                                        </button>
                                    :
                                    ''
                                    }

                                </div>
                            </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive-xxl p-0" width="100%">
                                <table className="table align-items-center justify-content-center mb-0" width="100%">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">#</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Nome</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Função</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Data Inicio</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Data Fim</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prestadores.length > 0 && prestadores.map((prestador, index) => (
                                            <tr key={prestador.id}>
                                                <td className='text-center'>{meta.from + index}</td>
                                                <td className='text-left'>
                                                    <div className="d-flex px-2">
                                                        <div className="my-auto">
                                                            <h6 className="mb-0 text-sm">{prestador.prestador.nomePrestador}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-left'>
                                                    <p className="text-sm font-weight-bold mb-0">{prestador.prestador.funcao.descricaoFuncao}</p>
                                                </td>
                                                <td className='text-left'>
                                                    <p className="text-sm font-weight-bold mb-0">{formatDate(prestador.dataInicio)}</p>
                                                </td>
                                                { prestador.dataFim ?
                                                    <td className='text-left'>
                                                        <p className="text-sm font-weight-bold mb-0">{formatDate(prestador.dataFim)}</p>
                                                    </td>
                                                    :
                                                    <td className='text-left'>
                                                        <p className="text-sm font-weight-bold mb-0">Atuando</p>
                                                    </td>
                                                }


                                                <td className="align-middle text-center" width="15%">
                                                <div>
                                                { prestador.dataFim ?

                                                       ''
                                                :

                                                    <button type="button" onClick={() => openUpdateDialog(prestador)} className="btn btn-vimeo btn-icon-only mx-2">
                                                        <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                    </button>

                                                }

                                                {validarStatusObra(obra.status) ?
                                                    <button type="button" onClick={() => openDestroyDialog(prestador)} className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i className="fas fa-trash"></i></span>
                                                    </button>
                                                 :
                                                    <p className="text-sm font-weight-bold mb-0">Obra Finalizada</p>
                                                }
                                                </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        { meta.links.map((link, k) => (
                            <li key={k} className="page-item">
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

Index.layout = (page) => <Base key={page} children={page} title={"Prestadores da Obra "}/>
