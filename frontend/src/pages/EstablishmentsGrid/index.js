import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPlus, FiEye, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import api from '../../services/api';

export default function EstablishmentsGrid() {
    const [establishments, setEstablishments] = useState([]);
    const [establishmentInfo, setEstablishmentInfo] = useState();
    const [modalOpened, setModalOpened] = useState(false);
    const history = useHistory();

    useEffect(() => {
        api.get('establishments').then(response => {
            setEstablishments(response.data);
        })
    }, []);

    async function handleDelete(id) {
        try {
            await api.delete(`establishments/${id}`);
            setEstablishments(establishments.filter(establishment => establishment.id !== id));
        } catch (err) {
            alert('Erro ao deletar o estabelecimento.\nTente novamente...');
        }
    }

    function handleOpenModal(id) {
        setModalOpened(!modalOpened);
        setEstablishmentInfo(establishments.find(info => info.id === id));
    }

    function handleEdit(id) {
        history.push(`edit/${id}`);
    }

    return (
        <div className='establishment-container'>
            <header>
                <h1>Listagem de Estabelecimentos</h1>
                <Link to='/cadastro'><FiPlus style={{ marginRight: 2 }} />Cadastrar Estabelecimento</Link>
            </header>

            <table>
                <tr>
                    <th>Razão Social</th>
                    <th>CNPJ</th>
                    <th>Telefone</th>
                    <th>Cadastro</th>
                    <th>Categoria</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                {establishments.map(data => (
                    <tr key={data.id}>
                        <td>{data.social_name}</td>
                        <td>{data.cnpj}</td>
                        <td>{data.phone}</td>
                        <td>{data.date}</td>
                        <td>{data.category}</td>
                        <td>{data.status === 'true' || data.status === 1 ? 'Ativo' : 'Inativo'}</td>
                        <td>
                            <button onClick={() => handleOpenModal(data.id)}><FiEye style={{ color: '#4e80c7' }} /></button>
                            <button onClick={() => handleEdit(data.id)}><FiEdit style={{ color: '#4ec754' }} /></button>
                            <button onClick={() => handleDelete(data.id)}><FiTrash2 style={{ color: '#aa0000'}} /></button>
                        </td>
                    </tr>
                ))}
            </table>
            <div className='modal' style={{ display: modalOpened ? 'block' : 'none' }}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button onClick={handleOpenModal}><FiX /></button>
                        <h1>{`ID ${establishmentInfo?.id} - Estabelecimento`}</h1>
                    </div>
                    <div className='modal-body'>
                        <div>
                            <h3>Razão Social</h3>
                            <span>{establishmentInfo?.social_name || '-'}</span>
                        </div>
                        <div>
                            <h3>Nome Fantasia</h3>
                            <span>{establishmentInfo?.fantasy_name || '-'}</span>
                        </div>
                        <div>
                            <h3>CNPJ</h3>
                            <span>{establishmentInfo?.cnpj || '-'}</span>
                        </div>
                        <div>
                            <h3>Email</h3>
                            <span>{establishmentInfo?.email || '-'}</span>
                        </div>
                        <div>
                            <h3>Endereço</h3>
                            <span>{establishmentInfo?.adress || '-'}</span>
                        </div>
                        <div>
                            <h3>Cidade</h3>
                            <span>{establishmentInfo?.city || '-'}</span>
                        </div>
                        <div>
                            <h3>Estado</h3>
                            <span>{establishmentInfo?.uf || '-'}</span>
                        </div>
                        <div>
                            <h3>Telefone</h3>
                            <span>{establishmentInfo?.phone || '-'}</span>
                        </div>
                        <div>
                            <h3>Categoria</h3>
                            <span>{establishmentInfo?.category || '-'}</span>
                        </div>
                        <div>
                            <h3>Status</h3>
                            <span>{establishmentInfo?.status ? 'Ativo' : 'Inativo'}</span>
                        </div>
                        <div>
                            <h3>Agência</h3>
                            <span>{establishmentInfo?.agency || '-'}</span>
                        </div>
                        <div>
                            <h3>Conta</h3>
                            <span>{establishmentInfo?.cc || '-'}</span>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <span>{establishmentInfo?.date || '-'}</span>
                        <h3>Data de Cadastro</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}