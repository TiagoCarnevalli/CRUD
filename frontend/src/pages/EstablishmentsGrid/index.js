import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiPlus, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function EstablishmentsGrid() {
    const [establishments, setEstablishments] = useState([]);

    useEffect(() => {
        api.get('establishments').then(response => {
            setEstablishments(response.data);
        })
    }, []);

    console.log(establishments);

    // function handleClick(name) {
    //     console.log(`Clicou no ${name}`)
    // }

    async function handleDelete(id) {
        try {
            await api.delete(`establishments/${id}`);
            setEstablishments(establishments.filter(establishment => establishment.id !== id));
        } catch (err) {
            alert('Erro ao deletar o estabelecimento.\nTente novamente...');
        }
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
                        <td>{data.status === 'true' || data.status ===1 ? 'Ativo' : 'Inativo'}</td>
                        <td>
                            <button><FiEye style={{ color: '#4e80c7' }} /></button>
                            <button><FiEdit style={{ color: '#4ec754' }} /></button>
                            <button onClick={() => handleDelete(data.id)}><FiTrash2 style={{ color: '#aa0000'}} /></button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}