import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

export default function CreateCliente({close}) {

    const {data, setData, post, reset, errors} = useForm({
        nomeCliente: '',
        razaoSocial: '',
        cpfCnpj: '',
        telefone: '',
        logradouro:'',
        complemento:'',
        cidade:'',
        estado:'',
    });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('clientes.store'), {
            data,
            onSuccess: () => {
                reset(),
                close()
            },
        });
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="nomeCliente" className="col-form-label">Nome:</label>
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
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="submit" className="btn bg-gradient-primary">Salvar</button>
                </div>
            </form>
        </>

    )
}