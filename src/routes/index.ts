import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({ msg: 'Hello' }).status(200);
});

export default router;