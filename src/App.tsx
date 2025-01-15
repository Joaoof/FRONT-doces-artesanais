import React, { useState } from 'react';
import { Candy, ShoppingCart, Phone, Instagram, Facebook, X, Plus, Minus, CreditCard } from 'lucide-react';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
}

interface ItemCarrinho extends Produto {
  quantidade: number;
}

const produtos: Produto[] = [
  {
    id: 1,
    nome: 'Bombom de Maracujá',
    preco: 3.50,
    imagem: 'https://images.unsplash.com/photo-1597733153203-a54d0fbc47de?auto=format&fit=crop&w=500',
    descricao: 'Bombom de Maracujá com Flocos de arroz com Chocolate'
  },
];



function App() {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [checkoutAberto, setCheckoutAberto] = useState(false);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(carrinhoAtual => {
      const itemExistente = carrinhoAtual.find(item => item.id === produto.id);
      if (itemExistente) {
        return carrinhoAtual.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      setCarrinhoAberto(true); // Abre automaticamente o carrinho quando um item for adicionado
      return [...carrinhoAtual, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId: number) => {
    setCarrinho(carrinhoAtual => carrinhoAtual.filter(item => item.id !== produtoId));
  };

  const atualizarQuantidade = (produtoId: number, delta: number) => {
    setCarrinho(carrinhoAtual =>
      carrinhoAtual.map(item => {
        if (item.id === produtoId) {
          const novaQuantidade = item.quantidade + delta;
          return novaQuantidade > 0
            ? { ...item, quantidade: novaQuantidade }
            : item;
        }
        return item;
      }).filter(item => item.quantidade > 0)
    );
  };

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const finalizarCompra = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Compra Finalizada!');
    setCarrinho([]);
    setCheckoutAberto(false);
    const mensagem = encodeURIComponent(
      `Olá, gostaria de finalizar meu pedido:\n\n${carrinho
        .map(item => `- ${item.quantidade}x ${item.nome} (${item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`)
        .join('\n')}\n\nTotal: ${totalCarrinho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    );

    const urlWhatsApp = `https://wa.me/63991021043?text=${mensagem}`;
    window.open(urlWhatsApp, '_blank');

  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Candy className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Doce Demais</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCarrinhoAberto(true)}
              className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded-full hover:bg-pink-800 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Carrinho ({carrinho.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-peachPink-600 to-pink-50 text-chocolocateBrown py-16 mt-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Doces Artesanais</h2>
          <p className="text-xl mb-8">Os mais deliciosos doces feitos com amor e carinho</p>
        </div>
      </div>

      {/* Products */}
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nossos Produtos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <img src={produto.imagem} alt={produto.nome} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{produto.nome}</h3>
                <p className="text-gray-600 mb-4">{produto.descricao}</p>
                <div className="flex justify-between items-center">
                  <span className="text-pink-600 font-bold">
                    {produto.preco.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                  <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Carrinho Lateral */}
      {carrinhoAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-xl font-bold">Seu Carrinho</h2>
              <button
                onClick={() => setCarrinhoAberto(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-auto">
              {carrinho.length === 0 ? (
                <p className="text-center text-gray-500">Seu carrinho está vazio</p>
              ) : (
                carrinho.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.nome}</h3>
                      <p className="text-pink-600 font-bold">
                        {item.preco.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => atualizarQuantidade(item.id, -1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span>{item.quantidade}</span>
                        <button
                          onClick={() => atualizarQuantidade(item.id, 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removerDoCarrinho(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 border-t mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Total:</span>
                <span className="text-xl font-bold text-pink-600">
                  {totalCarrinho.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </div>
              <button
                onClick={() => {
                  setCarrinhoAberto(false);
                  setCheckoutAberto(true);
                }}
                disabled={carrinho.length === 0}
                className="w-full bg-pink-600 text-white py-3 rounded-full hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Checkout */}
      {checkoutAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button
                onClick={() => setCheckoutAberto(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={finalizarCompra} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                /> */}
              </div>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço de Entrega
                </label> */}
                {/* <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                /> */}
              </div>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número do Cartão
                </label> */}
                <div className="relative">
                  {/* <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500 pl-10"
                    placeholder="1234 5678 9012 3456"
                  /> */}
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    Validade
                  </label> */}
                  {/* <input
                    type="text"
                    required
                    placeholder="MM/AA"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  /> */}
                </div>
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label> */}
                  {/* <input
                    type="text"
                    required
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  /> */}
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>
                    {totalCarrinho.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Frete:</span>
                  <span>Grátis</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-pink-600">
                    {totalCarrinho.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-full hover:bg-pink-700 transition mt-6"
              >
                Confirmar Pedido
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-5 w-5" />
                <span>(63) 99102-1043</span>
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-pink-200 transition">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-pink-200 transition">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horário</h3>
              <p>Segunda a Sábado</p>
              <p>09:00 - 18:00</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Endereço</h3>
              <p>Setor Nova Araguaína - Rua 15 Quadra 68 Lote 05</p>
              <p>To - Araguaína</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-pink-500 text-center">
            <p>&copy; 2024 Doce Demais. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;