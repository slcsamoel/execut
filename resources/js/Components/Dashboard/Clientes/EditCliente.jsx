import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'

export default function EditCliente({close, model}) {

    const {data, setData, put, reset, errors} = useForm({
        nomeCliente: model.nomeCliente,
        razaoSocial: model.razaoSocial,
        cpfCnpj: model.cpfCnpj,
        telefone: model.telefone,
        logradouro: model.endereco ? model.endereco.logradouro : '',
        complemento: model.endereco ? model.endereco.complemento : '' ,
        cidade: model.endereco ? model.endereco.cidade : '',
        estado: model.endereco  ? model.endereco.estado : '',
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('clientes.update', model.id), {
            data,
            onSuccess: () => {
                reset(),
                close()
            },
        });
    }

    useEffect(() => {
        setData({...data,
            nomeCliente: model.nomeCliente,
            razaoSocial: model.razaoSocial,
            cpfCnpj: model.cpfCnpj,
            telefone: model.telefone,
            logradouro: model.endereco ? model.endereco.logradouro : '',
            complemento: model.endereco ? model.endereco.complemento : '' ,
            cidade: model.endereco ? model.endereco.cidade : '',
            estado: model.endereco  ? model.endereco.estado : '',
        });
    }, [model]);

    return (
        <>
            <form onSubmit={onSubmit}>
            <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="nomeUsuario" className="col-form-label">Nome:</label>
                            <input type="text" className="form-control" name='nomeCliente' value={data.nomeCliente} onChange={onChange} id="nomeCliente"/>
                            {errors && <div className='text-danger mt-1'>{errors.nomeCliente}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="razaoSocial" className="col-form-label">Razão social/NomeCompleto</label>
                            <input type="text" className="form-control" name='razaoSocial' value={data.razaoSocial} onChange={onChange} id="razaoSocial"/>
                            {errors && <div className='text-danger mt-1'>{errors.razaoSocial}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpfCnpj" className="col-form-label">Cpf/Cnpj:</label>
                            <input type="text" className="form-control" name='cpfCnpj' value={data.cpfCnpj} onChange={onChange} id="cpfCnpj"/>
                            {errors && <div className='text-danger mt-1'>{errors.cpfCnpj}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefone" className="col-form-label">Telefone:</label>
                            <input type="text" className="form-control" name='telefone' value={data.telefone} onChange={onChange} id="telefone"/>
                            {errors && <div className='text-danger mt-1'>{errors.telefone}</div>}
                        </div>
                        <hr className="horizontal dark" />
                        <p className="text-uppercase text-sm">Informações de Endereço</p>
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
                            <label htmlFor="cidade" className="col-form-label">Cidade:</label>
                            <input type="text" className="form-control" name='cidade' value={data.cidade} onChange={onChange} id="cidade"/>
                            {errors && <div className='text-danger mt-1'>{errors.cidade}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="estado" className="col-form-label">Estado(UF):</label>
                            <input type="text" className="form-control" name='estado' value={data.estado} onChange={onChange} id="estado"/>
                            {errors && <div className='text-danger mt-1'>{errors.estado}</div>}
                        </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Update</button>
                </div>
            </form>
        </>

    )
}