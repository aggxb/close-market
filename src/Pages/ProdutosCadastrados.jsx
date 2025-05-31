import React from 'react';
import Titulo from '../Components/Titulo';
import Subtitulo from '../Components/Subtitulo';
import {
  ListaProdutos,
  ListaProdutosContainer,
} from '../Components/ListaProdutos';
import { Produto, ProdutoDados, ProdutoInfo } from '../Components/Produto';
import MarketContext from '../Contexts/MarketContext';
import Paragrafo from '../Components/Paragrafo';
import { useParams } from 'react-router-dom';
import Botao from '../Components/Botao';
import UserContext from '../Contexts/UserContext';
import Head from '../Components/Head';

const ProdutosCadastrados = () => {
  const { id } = useParams();
  const { usuario } = React.useContext(UserContext);
  const { mercadosCadastrados, setMercadosCadastrados } =
    React.useContext(MarketContext);

  const mercadoAtual = mercadosCadastrados.find(
    (mercado) => mercado.fsq_id === id,
  );

  const produtos = mercadoAtual.produtos || [];

  const removerProduto = (produtoId) => {
    const mercadosAtualizados = mercadosCadastrados.map((mercado) => {
      if (mercado.fsq_id === id) {
        const novosProdutos = mercado.produtos?.filter(
          (produto) => produto.id !== produtoId,
        );
        return {
          ...mercado,
          produtos: novosProdutos,
        };
      }
      return mercado;
    });

    setMercadosCadastrados(mercadosAtualizados);
    localStorage.setItem(
      'mercados-cadastrados',
      JSON.stringify(mercadosAtualizados),
    );
  };

  if (!produtos.length) {
    return (
      <Subtitulo style={{ marginTop: '1.2rem' }}>
        Nenhum produto cadastrado
      </Subtitulo>
    );
  }

  return (
    <>
      <Head
        titulo={mercadoAtual.name}
        descricao={`Veja informações de ${mercadoAtual.name}`}
      />
      {produtos && produtos.length > 0 && (
        <ListaProdutosContainer>
          <Subtitulo fontSize="1.75rem">Produtos cadastrados</Subtitulo>
          <ListaProdutos>
            {produtos && produtos.length > 0
              ? produtos.map(
                  ({ nome, categoria, precoTotal, precoDesconto, img, id }) => (
                    <Produto key={id}>
                      <ProdutoInfo>
                        <Titulo fontSize="1.5rem">{nome}</Titulo>
                        <img src={img} alt={nome} />
                      </ProdutoInfo>
                      <ProdutoDados>
                        <Paragrafo
                          fontSize="1.3rem"
                          style={{ fontWeight: '700' }}
                        >
                          Categoria:{' '}
                          <span style={{ fontWeight: '400' }}>
                            {categoria.label}
                          </span>
                        </Paragrafo>
                        <Paragrafo
                          fontSize="1.3rem"
                          style={{ fontWeight: '700' }}
                        >
                          Preço:{' '}
                          <span style={{ fontWeight: '400' }}>
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(precoTotal)}
                          </span>
                        </Paragrafo>
                        <Paragrafo
                          fontSize="1.3rem"
                          style={{ fontWeight: '700' }}
                        >
                          Preço com desconto:{' '}
                          <span style={{ fontWeight: '400' }}>
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(precoDesconto)}
                          </span>
                        </Paragrafo>
                        {usuario === 'administrador' && (
                          <Botao
                            handleClick={() => removerProduto(id)}
                            bg="c10"
                            color="c7"
                            hoverbg="c2"
                            style={{ marginTop: '1.25rem' }}
                          >
                            Remover Produto
                          </Botao>
                        )}
                      </ProdutoDados>
                    </Produto>
                  ),
                )
              : null}
          </ListaProdutos>
        </ListaProdutosContainer>
      )}
    </>
  );
};

export default ProdutosCadastrados;
