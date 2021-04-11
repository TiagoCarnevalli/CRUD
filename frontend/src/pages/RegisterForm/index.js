import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';

export default function RegisterForm() {
    const [socialName, setSocialName] = useState('');
    const [fantasyName, setFantasyName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [phone, setPhone] = useState('');
    const [registerDate, setRegisterDate] = useState(Date());
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState(false);
    const [agency, setAgency] = useState('');
    const [cc, setCc] = useState('');
    const [establishments, setEstablishments] = useState([]);
    
    const history = useHistory();    //Dando erro

    useEffect(() => {
        api.get('establishments').then(response => {
            setEstablishments(response.data);
        })
    }, []);
    
    function validarCNPJ() {
        const multiplier = [6,5,4,3,2,9,8,7,6,5,4,3,2];
        var cnpjAux = cnpj.replace(/\./g, '').replace('/','').replace('-', '').split('');
        var dvr = 0;
        var dvl = 0
        for(var i = 0; i < 12; i++) {
            dvl += cnpjAux[i] * multiplier[i+1];
        }
        // eslint-disable-next-line
        if (11 - dvl % 11 == cnpjAux[12]) {
            for(i = 0; i < 13; i++) {
                dvr += cnpjAux[i] * multiplier[i];
            }
            // eslint-disable-next-line
            if (11 - dvr % 11 == cnpjAux[13]) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (validarCNPJ() === true && establishments.findIndex(establishment => establishment.cnpj === cnpj) < 0) {
            const data = {
                social_name: socialName,
                fantasy_name: fantasyName,
                cnpj,
                email,
                adress,
                city,
                uf,
                phone,
                date: registerDate,
                category,
                status,
                agency,
                cc,
            };

            try {
                const response = await api.post('establishments', data);

                alert(`Cadastro realizado com sucesso.\nO ID do estabelecimento ${socialName} é ${response.data.id}`);

                history.push('/');   //Dando erro
            } catch (err) {
                alert('Cadastro não realizado...tente novamente');
            }
        } else {
            alert('CNPJ inválido!');
        }
    }

    return (
        <div className='register-container'>
            <div className='content'>
                <header>
                    <Link to='/'><FiArrowLeft style={{ marginRight: 5 }} />Voltar</Link>
                </header>
                <h2>Registro de Estabelecimento</h2>
                <form onSubmit={handleRegister}>
                    <input value={socialName} onChange={e => setSocialName(e.target.value)} placeholder='Razão Social' required />
                    <input value={fantasyName} onChange={e => setFantasyName(e.target.value)} placeholder='Nome Fantasia' />
                    <input value={cnpj
                        .replace(/\D/g, '')
                        .replace(/(\d{2})(\d)/,'$1.$2')
                        .replace(/(\d{3})(\d)/,'$1.$2')
                        .replace(/(\d{3})(\d)/,'$1/$2')
                        .replace(/(\d{4})(\d)/,'$1-$2')
                        .replace(/(-\d{2})\d+?$/,'$1')
                    } onChange={e => setCnpj(e.target.value)} placeholder='CNPJ' required minLength={14} />
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder='E-mail' type='email' />
                    <input value={adress} onChange={e => setAdress(e.target.value)} placeholder='Endereço' />
                    <div className='input-city'>
                        <input value={city} onChange={e => setCity(e.target.value)} placeholder='Cidade' style={{ width: '80%' }} />
                        <input value={uf.toUpperCase().replace(/[^a-zA-Z]+/g, '')} onChange={e => setUf(e.target.value)} placeholder='UF' style={{ width: '20%' }} maxLength={2} />
                    </div>
                    <input value={phone
                        .replace(/\D/g, '')
                        .replace(/(\d{2})(\d)/, '($1) $2')
                        .replace(/(\d{5})(\d)/, '$1-$2')
                        .replace(/(-\d{4})\d+?$/, '$1')
                    } onChange={e => setPhone(e.target.value)} placeholder='Telefone com DDD' required={category === 'Supermercado'} />
                    <input value={registerDate} onChange={e => setRegisterDate(e.target.value)} placeholder='Data de Cadastro' type='date' required />
                    <select value={category} onChange={e => setCategory(e.target.value)} placeholder='Categoria'>
                        <option value='' selected disabled hidden>Categoria</option>
                        <option value='Supermercado'>Supermercado</option>
                        <option value='Restaurante'>Restaurante</option>
                        <option value='Borracharia'>Borracharia</option>
                        <option value='Posto'>Posto</option>
                        <option value='Oficina'>Oficina</option>
                    </select>
                    <select value={status} onChange={e => setStatus(e.target.value)} placeholder='Status'>
                        <option value={false} selected disabled hidden>Status</option>
                        <option value={true}>Ativo</option>
                        <option value={false}>Inativo</option>
                    </select>
                    <input value={agency
                        .replace(/\D/g, '')
                        .replace(/(\d{3})(\d)/, '$1-$2')
                        .replace(/(-\d{1})\d+?$/, '$1')
                    } onChange={e => setAgency(e.target.value)} placeholder='Agência' />
                    <input value={cc
                        .replace(/\D/g, '')
                        .replace(/(\d{2})(\d)/, '$1.$2')
                        .replace(/(\d{3})(\d)/, '$1-$2')
                        .replace(/(-\d{1})\d+?$/, '$1')
                    } onChange={e => setCc(e.target.value)} placeholder='Conta' />
                    <button type='submit'>Registrar</button>
                </form>
            </div>
        </div>
    );
}