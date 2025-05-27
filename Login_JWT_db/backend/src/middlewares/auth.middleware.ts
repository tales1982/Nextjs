import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
///////////////////////////////////////////////////////////////////////////////////////////////
/// → Importa os tipos do Express:                                                          ///
///     - Request → representa a requisição do usuário                                      ///
///     - Response → representa a resposta que será enviada                                 ///
///     - NextFunction → função que chama o próximo middleware/rota                         ///
///////////////////////////////////////////////////////////////////////////////////////////////
/// → Importa a lib jsonwebtoken, usada para verificar (decodificar e validar) o token JWT. ///
///////////////////////////////////////////////////////////////////////////////////////////////


const JWT_SECRET = process.env.JWT_SECRET || 'secret'
////////////////////////////////////////////////////////////////////////////////////
/// → Usa a chave secreta do .env para validar o token. Se não estiver definida, ///
///     - usa 'secret' (apenas pra testes).                                      ///
////////////////////////////////////////////////////////////////////////////////////


export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'Token not provided' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    ;(req as any).userId = decoded.userId
    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' })
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// 🔐 Middleware: authenticateToken                                                                        ///
/// → Declara uma função que será usada antes de executar uma rota protegida.                               ///
/// → Pega o cabeçalho de autorização da requisição HTTP.                                                   ///
/// → Divide o cabeçalho e pega só o token (segunda parte, após Bearer).                                    ///
/// 🛑 Verificação se o token foi enviado                                                                   ///
/// → Se não tiver token, retorna erro 401 (não autorizado) e interrompe a execução.                        ///
/// 🔐 Validação do token:                                                                                  ///
/// → Tenta decodificar e verificar o token com a chave secreta.                                            ///
/// Se for válido, ele extrai o userId que foi salvo dentro do token no login.                              ///
/// → Salva o userId decodificado dentro da requisição, para que outros controladores possam acessá-lo.     ///
/// A asserção (req as any) é usada porque Request não tem userId por padrão.                               ///
/// → Tudo certo! Chama o próximo middleware ou rota.                                                       ///
/// ❌ Se der erro (token inválido, expirado, malformado):                                                  ///
/// → Retorna erro 403 (acesso proibido), indicando que o token é inválido ou foi adulterado.               ///
/// 🔒 Onde usar esse middleware:                                                                           ///
/// → Essa rota /profile só será acessada se o token for válido. Caso contrário, retorna erro.              ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////