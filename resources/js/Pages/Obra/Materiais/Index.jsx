import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../../Components/Dashboard/Dialog';
import Base from '../../../Layouts/Base';
import useDialog from '../../../Hooks/useDialog';
import { Inertia } from '@inertiajs/inertia';
import {formatDate , formatDateWithTime , validarStatusObra} from '../../../Utils/helpers';
import CreateMateriasObra from '../../../Components/Dashboard/Obra/Materias/CreateMateriasObra';
import EditMateriasObra from '../../../Components/Dashboard/Obra/Materias/EditMateriasObra';

export default function Index(props) {

    const {data: materiais, links, meta} = props.materiaisObra;
    const obra = props.obra;
    const fornecedores = props.fornecedores;
    const [state, setState] = useState([])
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog()
    const [UpdateDialogHandler, UpdateCloseTrigger,UpdateTrigger] = useDialog()
    const [destroyDialogHandler, destroyCloseTrigger,destroyTrigger] = useDialog()

    const openUpdateDialog = (materias) => {
        setState(materias);
        UpdateDialogHandler()
    }

    const openDestroyDialog = (materias) => {
        setState(materias);
        destroyDialogHandler()
    };

    console.log(obra);

    const destroyFuncao = () => {
        Inertia.delete(
            route('materiais.destroy',[obra.id ,state.id]),
            { onSuccess: () => destroyCloseTrigger() });
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Cadastrar Novo Material!">
                    <CreateMateriasObra close={addCloseTrigger} Fornecedores={fornecedores} obra={obra}/>
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Editar Material!`}>
                    <EditMateriasObra model={state} close={UpdateCloseTrigger} Fornecedores={fornecedores} obra={obra}/>
                </Dialog>


                <Dialog trigger={destroyTrigger} title={`Excluir Material da obra`}>
                    <p>Deseja Exluir o Material da obra ?</p>
                    <p>Ao excluir não será contabilizado no valor Total da obra</p>
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
                                    <h6>Materias</h6>
                                </div>
                                <div className="col-md-8 d-flex justify-content-end">
                                    <Link type="button" href={route('obras.edit', obra.id)} className="btn bg-primary-success btn-block mb-3" style={{ margin: '5px' }}>
                                        Obra
                                    </Link>
                                    {validarStatusObra(obra.status) ?
                                        <button onClick={addDialogHandler} type="button" className="btn bg-gradient-success btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                            Cadastrar Novo  Material
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
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Fornecedor</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Data</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Valor</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {materiais.length > 0 && materiais.map((material, index) => (
                                            <tr key={material.id}>
                                                <td className='text-center'>{meta.from + index}</td>
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
                                                    <p className="text-sm font-weight-bold mb-0">{formatDateWithTime(material.dataCompra)}</p>
                                                </td>
                                                <td className='text-left'>
                                                    <p className="text-sm font-weight-bold mb-0">{material.valor}</p>
                                                </td>
                                                <td className="align-middle text-center" width="15%">
                                                {validarStatusObra(obra.status) ?
                                                    <div>
                                                            <button type="button" onClick={() => openUpdateDialog(material)} className="btn btn-vimeo btn-icon-only mx-2">
                                                                <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                            </button>
                                                            <button type="button" onClick={() => openDestroyDialog(material)} className="btn btn-youtube btn-icon-only">
                                                                <span className="btn-inner--icon"><i className="fas fa-trash"></i></span>
                                                            </button>
                                                    </div>
                                                :
                                                    <p className="text-sm font-weight-bold mb-0">Obra Finalizada</p>
                                                }
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

Index.layout = (page) => <Base key={page} children={page} title={"Materiais da Obra "}/>
