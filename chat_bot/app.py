# app.py

from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# Configurar a chave da API OpenAI (substitua pela sua chave real)
openai.api_key = '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'
# Contexto inicial para o chatbot
context = """
Este é um chatbot especializado em Inteligência Artificial.
Principais informações sobre o tema:
1. [Informação 1]
2. [Informação 2]
3. [Informação 3]
O chatbot deve responder perguntas relacionadas a este tema de forma amigável e informativa.
"""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    
    # Preparar a mensagem para a API do OpenAI
    messages = [
        {"role": "system", "content": context},
        {"role": "user", "content": user_message}
    ]
    
    try:
        # Fazer a chamada para a API do OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7,
        )
        
        # Extrair a resposta do chatbot
        chatbot_response = response.choices[0].message['content'].strip()
        
        return jsonify({'response': chatbot_response})
    
    except Exception as e:
        print(f"Erro ao chamar a API do OpenAI: {str(e)}")
        return jsonify({'response': "Desculpe, ocorreu um erro ao processar sua mensagem."})

if __name__ == '__main__':
    app.run(debug=True)
