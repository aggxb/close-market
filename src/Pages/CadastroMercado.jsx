import React from 'react';
import '../Styles/global.css';
import styled from 'styled-components';
import Select from 'react-select';
import MarketContext from '../Contexts/MarketContext';
import Header from '../Components/Header';
import Titulo from '../Components/Titulo';
import Subtitulo from '../Components/Subtitulo';
import MercadoInfo from '../Components/MercadoInfo';
import CampoForm from '../Components/CampoForm';
import Botao from '../Components/Botao';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCarSide, FaSearchLocation } from 'react-icons/fa';
import Label from '../Components/Label';
import Paragrafo from '../Components/Paragrafo';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../Contexts/UserContext';
import ProdutosCadastrados from './ProdutosCadastrados';

const MercadoContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::after {
    content: '';
    width: 100%;
    margin-top: calc(1.25rem - 0.5rem);
    height: 1px;
    background: var(--c3);
  }
`;

const CadastroProduto = styled.section`
  margin-top: 1.25rem;
`;

const CadastroProdutoHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
`;

const CadastroProdutoForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.75rem;

  button {
    grid-column: 1 / -1;
    justify-self: center;
  }

  &::after {
    content: '';
    grid-column: 1 / -1;
    width: 100%;
    margin-top: calc(1.25rem - 0.5rem);
    height: 1px;
    background: var(--c3);
  }

   @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const CampoSelect = styled.div`
  display: flex;
  flex-direction: column;
`;

const Preco = styled.div`
  background: var(--c8);
  height: auto;
  padding: 1rem;
  font-size: 1.5rem;
  align-self: end;
  border-radius: 50px;
  box-sizing: border-box;

  span {
    font-weight: 600;
  }
`;

const customStyles = {
  control: (base, state) => ({
    ...base,
    width: '100%',
    height: '5vh',
    backgroundColor: 'var(--c7)',
    borderRadius: '5px',
    border: 'none',
    boxShadow: state.isFocused ? '0 0 0 3px var(--c4)' : 'none',
    padding: '0 0.5rem',
    fontSize: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--c4)',
    fontSize: '1.25rem',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--c1)',
    fontSize: '1.25rem',
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 'none',
    overflowY: 'visible',
    padding: 0,
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--c3)',
    borderRadius: '5px',
    marginTop: '0.25rem',
    zIndex: 10,
    maxHeight: 'none',
    overflowY: 'visible',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? 'var(--c2)'
      : state.isFocused
      ? 'var(--c4)'
      : 'var(--c3)',
    color: state.isSelected
      ? 'var(--c5)'
      : state.isFocused
      ? 'var(--c7)'
      : 'var(--c7)',
    fontSize: '1.25rem',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
  }),
  dropdownIndicator: (base, { selectProps }) => ({
    ...base,
    color: 'var(--c1)',
    padding: '0 8px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    transform: selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

const campos = [
  {
    id: 'nome',
    label: 'Nome',
  },
  {
    id: 'precoTotal',
    label: 'Preço Total (em R$)',
    type: 'number',
  },
  {
    id: 'taxa',
    label: 'Taxa de Desconto (em %)',
    type: 'number',
  },
  {
    id: 'img',
    label: 'Imagem',
    type: 'url',
    placeholder: 'Cole a URL da imagem (.jpg, .png, etc.)',
  },
];

const options = [
  { value: 'alimentos', label: 'Alimentos' },
  { value: 'bebidas', label: 'Bebidas' },
  { value: 'higiene', label: 'Higiene Pessoal' },
  { value: 'limpeza', label: 'Limpeza' },
  { value: 'casa', label: 'Para Casa' },
  { value: 'pets', label: 'Para Pets' },
  { value: 'eletrodomesticos', label: 'Eletrodomésticos' },
];

const CadastroMercado = () => {
  const [formDados, setFormDados] = React.useState({
    nome: '',
    categoria: null,
    taxa: '',
    precoTotal: '',
    precoDesconto: '',
    img: '',
  });
  const [erro, setErro] = React.useState(null);
  const [erroInput, setErroInput] = React.useState([]);
  const { usuario } = React.useContext(UserContext);
  const { setMercadosCadastrados, mercadoSelecionado, setMercadoSelecionado } =
    React.useContext(MarketContext);

  React.useEffect(() => {
    const desconto =
      +formDados.precoTotal - (+formDados.precoTotal * +formDados.taxa) / 100;

    if (desconto !== formDados.precoDesconto) {
      setFormDados((dados) => ({
        ...dados,
        precoDesconto: desconto,
      }));
    }
  }, [formDados.precoTotal, formDados.precoDesconto, formDados.taxa]);

  React.useEffect(() => {
    localStorage.setItem('mercado', JSON.stringify(mercadoSelecionado));
  }, [mercadoSelecionado]);

  if (!mercadoSelecionado) return null;

  const { fsq_id, geocodes, location, distance, name } = mercadoSelecionado;

  const definirValorCampo = (id, value) => {
    setFormDados((dados) => ({ ...dados, [id]: value }));
    validarCampo(id, value);
  };

  const adicionarProdutoAoMercado = (produto) => {
    setMercadosCadastrados((mercadosCadastrados) => {
      if (!mercadosCadastrados) return mercadosCadastrados;

      const mercadosAtualizados = mercadosCadastrados.map((mercado) => {
        if (mercado.fsq_id === fsq_id) {
          const produtosAtualizados = mercado.produtos
            ? [...mercado.produtos, produto]
            : [produto];

          return { ...mercado, produtos: produtosAtualizados };
        }
        return mercado;
      });

      localStorage.setItem(
        'mercados-cadastrados',
        JSON.stringify(mercadosAtualizados),
      );

      const mercadoAtualizado = mercadosAtualizados.find(
        (mercado) => mercado.fsq_id === mercadoSelecionado.fsq_id,
      );

      setMercadoSelecionado(mercadoAtualizado);

      return mercadosAtualizados;
    });
  };

  const validarCampo = (id, valor) => {
    let msgErro;

    if (!valor || (typeof valor === 'string' && !valor.length)) {
      msgErro = 'Preencha todos os campos';
    }

    if (id === 'img' && valor.length) {
      const tiposValidos = ['jpg', 'jpeg', 'png', 'webp'];
      const regex = valor.match(/\.(\w+)$/);

      if (!regex || !tiposValidos.includes(regex[1].toLowerCase())) {
        msgErro = 'Insira uma imagem válida';
      }
    }

    if (msgErro) {
      setErro(msgErro);
      setErroInput((erros) => [...new Set([...erros, id])]);
      return false;
    } else {
      setErroInput((errosAtuais) => {
        const novosErros = errosAtuais.filter((campo) => campo !== id);
        if (novosErros.length === 0) {
          setErro(null);
        }
        return novosErros;
      });
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formValido = true;
    campos.forEach(({ id }) => {
      const valor = formDados[id] || '';
      if (!validarCampo(id, valor)) {
        formValido = false;
      }
    });

    if (!validarCampo('categoria', formDados.categoria)) {
      formValido = false;
    }

    if (formValido) {
      const novoProduto = {
        ...formDados,
        id: uuidv4(),
      };
      adicionarProdutoAoMercado(novoProduto);
      setFormDados({
        nome: '',
        categoria: null,
        taxa: '',
        precoTotal: '',
        precoDesconto: '',
        img: '',
      });
      setErro(null);
      setErroInput([]);
    }
  };

  const handleBlur = ({ target }) => {
    validarCampo(target.id, target.value);
  };

  return (
    <>
      <Header />
      <MercadoContainer>
        <Titulo>{name}</Titulo>
        <MercadoInfo className="ativo">
          <li>
            <FaLocationDot color="var(--c10)" />
            {location.formatted_address}
          </li>
          <li>
            <FaCarSide color="var(--c8)" />
            {distance.toString().length > 3
              ? `${distance.toLocaleString('de-DE')}km de distância`
              : `${distance}m de distância`}
          </li>
          <li>
            <FaSearchLocation color="var(--c9)" />
            {`${geocodes.main.latitude}, ${geocodes.main.longitude}`}
          </li>
        </MercadoInfo>
      </MercadoContainer>
      {usuario === 'administrador' && (
        <CadastroProduto>
          <CadastroProdutoHeader>
            <Titulo fontSize="2rem">Produtos em promoção</Titulo>
            <Subtitulo fontSize="1.75rem">Cadastrar produtos</Subtitulo>
          </CadastroProdutoHeader>
          <CadastroProdutoForm onSubmit={handleSubmit}>
            <CampoSelect>
              <Label id="categoria">Categoria</Label>
              <Select
                className={`rs-select ${
                  erroInput.includes('categoria') ? 'erro-select' : ''
                }`}
                classNamePrefix="rs"
                id="categoria"
                options={options}
                value={formDados.categoria}
                onChange={(opcao) => {
                  setFormDados((dados) => ({ ...dados, categoria: opcao }));
                  validarCampo('categoria', opcao);
                }}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={customStyles}
                placeholder="Selecione"
              />
            </CampoSelect>
            {campos.map((campo) => (
              <CampoForm
                key={campo.id}
                inputValue={formDados[campo.id]}
                setValue={(valor) => definirValorCampo(campo.id, valor)}
                onBlur={handleBlur}
                erro={erroInput.includes(campo.id)}
                {...campo}
              />
            ))}
            <Preco>
              Preço com desconto:{' '}
              <span>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(formDados.precoDesconto)}
              </span>
            </Preco>
            {erro && <Paragrafo color="c10">{erro}</Paragrafo>}
            <Botao
              bg="c3"
              color="c7"
              hoverbg="c2"
              fontSize="1.25rem"
              padding="1.25rem"
            >
              Adicionar Produto
            </Botao>
          </CadastroProdutoForm>
        </CadastroProduto>
      )}
      <ProdutosCadastrados />
    </>
  );
};

export default CadastroMercado;
