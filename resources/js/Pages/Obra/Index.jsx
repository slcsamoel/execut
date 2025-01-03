import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import CreateCliente from '../../Components/Dashboard/Clientes/CreateCliente';
import EditCliente from '../../Components/Dashboard/Clientes/EditCliente';
import { Inertia } from '@inertiajs/inertia';

export default function Index(props) {

    const {data: obras, links, meta} = props.obras;
    const [state, setState] = useState([]);
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog();
    const [UpdateDialogHandler, UpdateCloseTrigger,UpdateTrigger] = useDialog();
    const [destroyDialogHandler, destroyCloseTrigger,destroyTrigger] = useDialog();
    const [search, setSearch] = useState(props.search);

    const openUpdateDialog = (cliente) => {
        setState(cliente);
        UpdateDialogHandler()
    }

    const openDestroyDialog = (cliente) => {
        setState(cliente);
        destroyDialogHandler()
    };

      // registra o termo digitado no campo
      const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const checkStatus = (status) =>{
        if (status === 1) {
            return "Em andamento";
        } else if (status === 2) {
            return "Pausada";
        }else if (status === 3){
            return "Cancelada";
        }else if (status === 4){
            return "Concluída";
        }
    }


    const destroycliente = () => {
        Inertia.delete(
            route('obras.destroy', state.id),
            { onSuccess: () => destroyCloseTrigger() });
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Criar novo Cliente">
                    <CreateCliente close={addCloseTrigger}/>
                </Dialog>

                <Dialog trigger={UpdateTrigger} title={`Alterar cliente: ${state.name}`}>
                    <EditCliente model={state} close={UpdateCloseTrigger}/>
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Deletar cliente: ${state.name}`}>
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
                                            <Link  type="button" href={`/obras`} className="btn bg-primary-success btn-block mb-3">
                                                Limpar
                                            </Link>
                                        }
                                    </div>
                                    <div className="col-md-2">
                                        <Link  type="button" href={`/obras?search=${search}`} className="btn btn-primary btn-block mb-3">
                                            Buscar
                                        </Link>
                                    </div>
                                    <div className="col-md-7 d-flex justify-content-end">
                                        <a href={`/obras/relatorio-geral`} target='blank' type="button" className="btn bg-primary-success btn-block mb-3" style={{ margin: '5px' }}>
                                            Relatorio Geral
                                        </a>
                                        <Link href={route('obras.create')} type="button" className="btn bg-gradient-success btn-block mb-3">
                                            Nova Obra
                                        </Link>
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
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Responsavel</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Cliente</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Tipo</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">Status</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {obras.map((obra, index) => (
                                            <tr key={obra.id}>
                                                <td className='text-center'>{meta.from + index}</td>
                                                <td className='text-left'>
                                                    <div className="d-flex px-2">
                                                        <div className="my-auto">
                                                            <h6 className="mb-0 text-sm">{obra.nomeObra}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-left'>
                                                    <div className="d-flex px-2">
                                                        <div className="my-auto">
                                                            <h6 className="mb-0 text-sm">{obra.responsavelObra}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-left'>
                                                    <p className="text-sm font-weight-bold mb-0">{obra.cliente.nomeCliente}</p>
                                                </td>
                                                <td className='text-left'>
                                                    <span className="text-xs font-weight-bold">{ obra.tipoObra ?  obra.tipoObra.nomeTipo : ''}</span>
                                                </td>
                                                <td className="align-middle text-left">
                                                    <div className="d-flex align-items-center text-left">
                                                        <span className="text-xs font-weight-bold mb-0">{ checkStatus(obra.status) }</span>
                                                    </div>
                                                </td>
                                                <td className="align-middle text-center" width="10%">
                                                <div>
                                                    <Link type="button" href={route('obras.relatorio', obra.id)}  className="btn btn-vimeo btn-icon-only">
                                                        <span className="btn-inner--icon"><i className="fas fa-print"></i></span>
                                                    </Link>
                                                    <Link type="button" href={route('obras.edit', obra.id)} className="btn btn-vimeo btn-icon-only mx-2">
                                                        <span className="btn-inner--icon"><i className="fas fa-pencil-alt"></i></span>
                                                    </Link>
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

Index.layout = (page) => <Base key={page} children={page} title={"Obras"}/>
