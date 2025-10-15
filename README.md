## 🍰 Doce Demais - A Vitrine Digital de Confeitaria Artesanal

<p align="center">
  <img src="Design sem nome.png" alt="Doce Demais - Brigadeiro Gourmet" width="500" style="border-radius: 8px;"/>
</p>

O projeto **Doce Demais** é uma aplicação web moderna, responsiva e de alta performance, desenhada especificamente para atuar como uma vitrine de e-commerce minimalista. Ela é ideal para pequenos negócios de confeitaria que buscam uma solução elegante para exibir seus produtos e otimizar o fluxo de pedidos.

O grande diferencial é a conclusão da compra via **WhatsApp**, transformando a navegação do cliente em um pedido estruturado e pronto para finalização.

## ✨ Destaques e Funcionalidades Core

* **Checkout Integrado e Inteligente:** O fluxo de finalização de compra gera automaticamente uma mensagem formatada com todos os itens, quantidades e o total do pedido, direcionando o cliente para o WhatsApp (`(63) 99102-1043`).
* **Componente de Carrinho Flutuante:** Uma experiência de compra ininterrupta com um carrinho lateral dinâmico que permite ajustes de quantidade (`+` / `-`) e remoção de itens em tempo real.
* **Design Profissional e Responsivo:** Desenvolvido com Tailwind CSS para garantir uma estética limpa, focada no produto e perfeita em qualquer dispositivo.
* **Informações de Contato Completas:** O rodapé contém dados essenciais para a conversão: telefone (`(63) 99102-1043`), horário de atendimento (`09:00 - 18:00`), endereço (Setor Nova Araguaína - Rua 15 Quadra 68 Lote 05, Araguaína - TO) e links para redes sociais.

## ⚙️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Biblioteca JavaScript para construção da interface de usuário. |
| **TypeScript** | `^5.5.3` | Adiciona tipagem estática, aumentando a manutenibilidade do código. |
| **Tailwind CSS** | `^3.4.1` | Framework CSS utilitário para desenvolvimento rápido de UI. |
| **Vite** | `^5.4.2` | Ferramenta de build moderna e rápida. |
| **Lucide React** | `^0.344.0` | Conjunto de ícones leves e customizáveis. |

## 🚀 Setup do Projeto

### Pré-requisitos
Certifique-se de ter o Node.js instalado em sua máquina.

### Instalação
1.  **Clone o Repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd doce-demais
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

### Comandos de Execução
| Comando | Ação |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Cria o bundle de produção na pasta `dist`. |
| `npm run lint` | Executa o linter para manter a qualidade do código. |
| `npm run preview` | Simula a execução do build de produção. |

## 🎨 Guia de Imagens e Branding

Gerencie as imagens para garantir o carregamento ideal da sua vitrine.

### 1. Imagens de Produtos
Para aderir às boas práticas de desempenho, as imagens do catálogo devem ser links externos otimizados (como Unsplash, Imgur, ou um CDN).

Você pode atualizar o catálogo editando o array `produtos` em **`src/App.tsx`**:

```typescript
const produtos: Produto[] = [
  {
    // ...
    // Substitua a URL abaixo pela foto do seu doce:
    imagem: 'SUA_URL_DA_IMAGEM_AQUI', 
    // ...
  },
];
````

### 2. Imagens Estáticas (Logo / Favicon)

Imagens como `Doce.png` (usada como favicon) e `Design sem nome.png` (sugerida para a capa) devem ser mantidas na raiz do projeto (ou na pasta `public`) e referenciadas com o caminho absoluto `/`:

```html
<link rel="icon" type="image/svg+xml" href="/Doce.png" />
```

## 📜 Licença (LICENSE)

Este projeto está licenciado sob a Licença **MIT**. Sinta-se à vontade para utilizar, modificar e distribuir o código.

## 🙏 Agradecimentos

Agradeço imensamente a oportunidade de desenvolver esta vitrine para a sua loja de doces. A paixão e o carinho dedicados aos seus doces artesanais merecem uma plataforma que reflita essa qualidade.

  * Aos contribuidores e a toda a comunidade de código aberto das ferramentas utilizadas (React, TypeScript, Tailwind CSS, Vite e Lucide React).

**Feito com amor e carinho para a Doce Demais.**

```
```
