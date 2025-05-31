import React from 'react';

const Head = ({ titulo, descricao }) => {
  React.useEffect(() => {
    document.title = `CloseMarket ${titulo ? `| ${titulo}` : ''}`;
    document
      .querySelector("meta[name='description']")
      .setAttribute('content', descricao || '');
  }, [titulo, descricao]);

  return <></>;
};

export default Head;
