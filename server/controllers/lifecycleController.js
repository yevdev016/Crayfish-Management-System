import * as lifecycleServices from '../models/lifecycleModel.js'
import { createActivity } from '../models/activityModel.js'

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
        await createActivity(req.user.id, `Transitioned ${req.body.count} crayfish from ${req.body.from_stage} to ${req.body.to_stage}`);
        res.status(200).json(entry);
    } catch (err) {
        const status = err.message.includes('not found') ? 404
            : err.message.includes('Invalid') || err.message.includes('must be') || err.message.includes('exceeds') || err.message.includes('Habitat is') ? 400
            : 500;
        res.status(status).json({ message: err.message || err });
    }
}

export const updateLifecycle = async (req, res) => {
    try {
        const entry = await lifecycleServices.updateLifecycle(req.params.id, req.user.id, req.body);
        if (!entry) return res.status(404).json({ message: 'Transition not found' });
        await createActivity(req.user.id, 'Updated lifecycle transition');
        res.status(200).json(entry);
    } catch (err) {
        res.status(400).json({ message: err.message || err });
    }
}

export const deleteLifecycle = async (req, res) => {
    try {
        const entry = await lifecycleServices.deleteLifecycle(req.params.id, req.user.id);
        if (!entry) return res.status(404).json({ message: 'Transition not found' });
        await createActivity(req.user.id, 'Deleted lifecycle transition');
        res.status(200).json({ message: 'Transition deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message || err });
    }
}
