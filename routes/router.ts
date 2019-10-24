import { Router, Request, Response } from 'express';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {

    res.json({
        ok: true,
        message: 'GET - Todo Ok'
    });

});

router.post('/messages', (req: Request, res: Response) => {

    const { de, cuerpo } = req.body;

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

    res.json({
        ok: true,
        message: 'POST - Todo Ok',
        de,
        cuerpo,
        id
    });

});

export default router;