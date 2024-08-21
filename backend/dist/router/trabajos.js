import trabajos from '../controllers/trabajos.js';
import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    void trabajos.obtenerTrabajos(req, res);
});
router.get('/:id', (req, res) => {
    void trabajos.obtenerTrabajo(req, res);
});
router.post('/', (req, res) => {
    void trabajos.crearTrabajo(req, res);
});
router.put('/:id', (req, res) => {
    void trabajos.actualizarTrabajo(req, res);
});
router.delete('/:id', (req, res) => {
    void trabajos.eliminarTrabajo(req, res);
});
export default router;
