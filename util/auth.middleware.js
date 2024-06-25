

import dotenv from 'dotenv'
import clientService from '../services/client.service.js'
dotenv.config()

async function basicAuth (req, res, next) {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ error: 'Missing Authorization Header informa aut' })
  }

  const base64Credentials = req.headers.authorization.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  const [username, password] = credentials.split(':')

  const isAdmin = authAdmin(username, password)

  if (isAdmin) {
    global.logger.info('Logged as admin')
    req.user = { role: 'admin' }
    return next()
  }

  let user="";
  try{
    user =await clientService.authenticateClient(username, password);
  }catch(err){
    global.logger.error(`Error on authenticateClient: ${err.message}`)
  }
  if (!user) {
    global.logger.info(`Invalid Authentication as ${username}`)
    return res.status(401).json({ message: 'Invalid Authentication Credencials' })
  }

  req.user = user
  user.role = 'customer1'
  return next()
}

function authAdmin (username, password) {
  const adminUser = process.env.ROOT_USER
  const adminPassword = process.env.ROOT_PASS

  if (adminUser === username && adminPassword === password) {
    return true
  }
  return false
}

function authorize (...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1

  return (req, res, next) => {
    if (req.user) {
      const role = req.user.role
      if (isAllowed(role)) {
        next()
      } else {
        res.status(401).json({ error: `Role ${role} not allowed` })
      }
    } else {
      res.status(403).json({ error: 'User not found' })
    }
  }
}

export { basicAuth, authorize }
