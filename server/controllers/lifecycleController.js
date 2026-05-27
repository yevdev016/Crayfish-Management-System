import * as lifecycleServices from '../models/lifecycleModel.js'

export const getAllLifecycles = async (req, res) => {
    try {
        const entries = await lifecycleServices.getAllLifecycle(req.user.id);
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message || err });
    }
}

export const createLifecycle = async (req, res) => {
    try {
        const entry = await lifecycleServices.createLifecycle(req.user.id, req.body);
        res.status(200).json(entry);
    } catch (err) {
        const status = err.message.includes('not found') ? 404
            : err.message.includes('Invalid') || err.message.includes('must be') || err.message.includes('exceeds') || err.message.includes('Habitat is') ? 400
            : 500;
        res.status(status).json({ message: err.message || err });
    }
}
