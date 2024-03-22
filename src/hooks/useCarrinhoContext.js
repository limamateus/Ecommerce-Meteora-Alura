import { useContext } from "react"
import { CarrinhoContext } from "../context/CarrinhoContext"



export const useCarrinhoContext = () =>{

    const { carrinho, setCarrinho } = useContext(CarrinhoContext); // Aqui estou recuperando informações do contexto

    function mudarQuantidade(id, quantidade) {
        console.log(id,quantidade)
        return carrinho.map((itemDoCarrinho) => {
          if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
          return itemDoCarrinho;
        });
      }
        
    // Essa função é para adicionar um produto no carrinho ou adicionar uma quantidade
    function adicionarProduto(novoProduto) { // A onde irei passar um novo objeto de novo produto
      
       
        const temOProduto = carrinho.some((itemDoCarrinho) => { // Irei usar o some que irá percorrer a lista no carrinho e valida se ele já existe
       return itemDoCarrinho.id === novoProduto.id;
      });
  
      if (!temOProduto) { // Se o produto não existe eu irei adicionar ele e uma quantidade inicial
        novoProduto.quantidade = 1;
        return setCarrinho((carrinhoAnterior) => [
          ...carrinhoAnterior,
          novoProduto,
        ]);
      }
      const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);
  
      setCarrinho([...carrinhoAtualizado]);

       
      
    }
    
    // Essa função é para remover o produto do carrinho ou a quantidade
    function removerProduto(id){
       
        const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id) // A onde irei procuror o produto de acordo com id passado.
        
        const ehOUltimo = produto.quantidade ===1; // valido se ele realmente é o ultimo produto

        if(ehOUltimo) { // Se realmente for o ultimo produto ire remover ele do carrinho
            return setCarrinho((carrinhoAnterior) =>{ // pego o estado anterior do carrinho
                carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !==id) // removo o produto 
            });
        }


        const carrinhoAtualizado = mudarQuantidade(id, -1);
        // Caso ele não seja o ultimo eu removo apenas a quantidade
        setCarrinho([...carrinhoAtualizado]);
          
      
   
    }


    return{
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto
    };
      
    
};