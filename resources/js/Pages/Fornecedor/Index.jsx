import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import { Inertia } from '@inertiajs/inertia';
import CreateFornecedor from '../../Components/Dashboard/Fornecedor/CreateFornecedor';
import EditFornecedor from '../../Components/Dashboard/Fornecedor/EditFornecedor';
import { maskCnpj, maskPhone } from '../../Utils/helpers';

export default function Index(props) {

    const {data: fornecedores, links, meta} = props.fornecedores;
    const tipos = props.tipos;
    const [state, setState] = useState([])
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog()
    const [UpdateDialogHandler, UpdateCloseTrigger,UpdateTrigger] = useDialog()
    const [destroyDialogHandler, destroyCloseTrigger,destroyTrigger] = useDialog()
    const [search, setSearch] = useState(props.search);

    const openUpdateDialog = (fornecedor) => {
        setState(fornecedor);
        UpdateDialogHandler()
    }

    const openDestroyDialog = (fornecedor) => {
        setState(fornecedor);
        console.log(fornecedor);
        destroyDialogHandler()
    };

     // registra o termo digitado no campo
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const destroycliente = () => {
        Inertia.delete(
            route('clientes.destroy', state.id),
            { onSuccess: () => destroyCloseTrigger() });
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Criar novo Fornecedor">
                    <CreateFornecedor close={addCloseTrigger} tipos={tipos}/>
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Alterar fornecedor: ${state.razaoSocial}`}>
                    <EditFornecedor model={state} close={UpdateCloseTrigger} tipos={tipos}/>
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Deletar fornecedor: ${state.razaoSocial}`}>
                    <p>Deletar o Usuario ?</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="submit" onClick={destroycliente} className="btn bg-gradient-danger">Deletar</button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-md-3">
                                        <input className="form-control" type="text" name='search'  onChange={handleSearch} value={search} placeholder='buscar'/>
                                        {search &&
                                            <Link  type="button" href={`/fornecedores`} className="btn bg-primary-success btn-block mb-3">
                                                Limpar
                                            </Link>
                                        }
                                    </div>
                                    <div className="col-md-2">
                                        <Link  type="button" href={`/fornecedores?search=${search}`} className="btn btn-primary btn-block mb-3">
                                            Buscar
                                        </Link>
                                    </div>
                                    <div className="col-md-7 d-flex justify-content-end">
                                        <a href={`/fornecedores/relatorio`} target='blank' type="button" className="btn bg-primary-success btn-block mb-3" style={{ margin: '5px' }}>
                                            Relatorio Geral
                                        </a>
                                        <button onClick={addDialogHandler} type="button" className="btn bg-gradient-success btn-block mb-3" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                            Novo Fornecedor
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive-xxl p-0" width="100%">
                                <table className="table align-items-center justify-content-center mb-0" width="100%">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">#</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Razão Social</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Cnpj</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Tipo</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Telefone</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fornecedores.map((fornecedor, index) => (
                                            <tr key={fornecedor.id}>
                                                <td className='text-center'>{meta.from + index}</td>
                                                <td className='text-left'>
                                                    <div className="d-flex px-2">
                                                        <div className="my-auto">
                                                            <h6 className="mb-0 text-sm">{fornecedor.razaoSocial}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-left'>
                                                    <p className="text-sm font-weight-bold mb-0">{maskCnpj(fornecedor.cnpj)}</p>
                                                </td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{fornecedor.tipo.nomeTipo}</span>
                                                </td>
                                                <td className="align-middle text-left">
                                                    <div className="d-flex align-items-center text-left">
                                                        <span className="text-xs font-weight-bold mb-0">{maskPhone(fornecedor.telefone)}</span>
                                                    </div>
                                                </td>
                                                <td className="align-middle text-center" width="10%">
                                                <div>
                                                    <button type="button" onClick={() => openUpdateDialog(fornecedor)} className="btn btn-vimeo btn-icon-only mx-2">
                                                        <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                    </button>
                                                    {/* <button type="button" onClick={() => openDestroyDialog(fornecedor)} className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i className="fas fa-trash"></i></span>
                                                    </button> */}
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
                            {meta.links.map((link, k) => {
                                // Adiciona o parâmetro `search` à URL da paginação
                                const urlWithSearch = link.url
                                    ? `${link.url}${link.url.includes('?') ? '&' : '?'}search=${search}`
                                    : null;

                                return (
                                    <li key={k} className="page-item">
                                        <Link
                                            disabled={link.url == null}
                                            as="button"
                                            className={`${link.active && 'bg-info'} ${
                                                link.url == null && 'btn bg-gradient-secondary text-white'
                                            } page-link`}
                                            href={urlWithSearch || ''}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                </nav>
            </div>
        </>
    )
}

Index.layout = (page) => <Base key={page} children={page} title={"Fornecedores"}/>