import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {

    res.json({
        ok: true,
        message: 'GET - Todo Ok'
    });

});

router.post('/messages', (req: Request, res: Response) => {

    const { de, cuerpo } = req.body;

    const server = Server.instance;
    
    const payload = {
        de,
        cuerpo
    }

    server.io.emit('message-new', payload)

    res.json({
        ok: true,
        message: 'POST - Todo Ok',
        de,
        cuerpo
    });

});

router.post('/messages/:id', (req: Request, res: Response) => {

    const { de, cuerpo } = req.body;
    const { id } = req.params;

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.in(id).emit('message-private', payload)

    res.json({
        ok: true,
        message: 'POST - Todo Ok',
        de,
        cuerpo,
        id
    });

});

export default router;