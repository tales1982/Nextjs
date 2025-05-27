import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // URL do backend
})

export default api;

/////////////////////////////////////////////////////////////////////////
///                  ✅ Etapa 3.2: Configurar Axios                   ///
/////////////////////////////////////////////////////////////////////////
/// 🔥 Aqui é onde a mágica acontece:                                 ///
///     - axios.create() cria uma instância personalizada do axios.   ///
///     - O baseURL define a URL base que será usada em               ///
///          todas as requisições feitas por essa instância.          ///
/////////////////////////////////////////////////////////////////////////
/// ✨ Isso significa:                                                ///
/// Se você usar:                                                     ///
///    - api.post('/login', { email, password })                      ///
/// O axios vai automaticamente fazer a requisição para:              ///
///     - POST http://localhost:4000/api/login                        ///
/// Ou se fizer:                                                      ///
///     - api.get('/profile')                                         ///
/// Ele vai para:                                                     ///
///    - GET http://localhost:4000/api/profile                        ///
/////////////////////////////////////////////////////////////////////////
/// 📤 Exporta essa instância api como default para que você          ///
/// possa importar e usar em qualquer parte do seu frontend:          ///
/////////////////////////////////////////////////////////////////////////