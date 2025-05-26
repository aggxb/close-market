import React from 'react';
import styled from 'styled-components';

const StyledProduto = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  background: var(--c7);
  padding: 1rem;
  border-radius: 10px;
  align-items: center;
  gap: 2rem;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StyledProdutoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h1 {
    text-align: center;
  }
  img {
    align-self: center;
    width: 200px;
    border-radius: 10px;
  }
`;

const StyledProdutoDados = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    p {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    text-align: center;

    button {
      align-self: center;
    }
  }
`;

const Produto = ({ children }) => {
  return <StyledProduto>{children}</StyledProduto>;
};

const ProdutoInfo = ({ children }) => {
  return <StyledProdutoInfo>{children}</StyledProdutoInfo>;
};

const ProdutoDados = ({ children }) => {
  return <StyledProdutoDados>{children}</StyledProdutoDados>;
};

export { Produto, ProdutoInfo, ProdutoDados };
