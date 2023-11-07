// Config.js
import React from "react";
import axios from 'axios';

function Config() {
  const UserCadastro = async () => {
    const confiBody = {
      "email": "reidokapo@email.com",
      "username": "claudinho3b",
      "nome": "claudio",
      "senha": "3brdk"
    }

    try {
      console.log(confiBody)
      const response = await axios.post('http://127.0.0.1:5000/cadastrar_usuario', confiBody)
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      if (error.response) {
        // O servidor retornou um código de erro (por exemplo, 404, 500, etc.)
        console.error("Erro de resposta do servidor:", error.response.data);
      } else if (error.request) {
        // A solicitação foi feita, mas não houve resposta do servidor
        console.error("Sem resposta do servidor:", error.request);
      } else {
        // Erro durante a configuração da solicitação
        console.error("Erro na configuração da solicitação:", error.message);
      }
    }
  }

  return (
    <div>
      <button onClick={UserCadastro}>Teste_cad</button>
    </div>
  );
}

export default Config;