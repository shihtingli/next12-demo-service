import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
 
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: { prettyPrint: true }
})
 
const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {
 
    server.listen(port, '0.0.0.0', (err, _) => {
        if (err) {
            console.error(err)
        }
    })
 
    server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ msg: 'pong' })
    })
 
    return server
}
 
export { startFastify }