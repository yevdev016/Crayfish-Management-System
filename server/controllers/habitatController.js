import * as habitatModel from '../models/habitatModel.js'

export const getHabitats = async (req, res) => {
    try {
        const habitats = await habitatModel.getAllHabitats(req.user.id);
        res.status(200).json(habitats);
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

export const getHabitat = async (req, res) => {
    try {
        const habitat = await habitatModel.getHabitatById(req.params.id);
        if(!habitat || habitat.user_id !== req.user.id) {
            return res.status(404).json({message: 'Habitat not found'})
        }
        res.status(200).json(habitat);
    } catch(err){
        res.status(500).json({message: err.message})
    }
}
export const createHabitat = async(req, res) => {
    const { name, species, count, stage, image } = req.body;
    try {
        const habitat = await habitatModel.createHabitat(
            req.user.id, name, species, count, stage, image
        );
        res.status(201).json(habitat);
    } catch(err){
        res.status(400).json({message: err.message})
    }
}
export const updateHabitat = async (req, res) => {
    try {
        const habitat = await habitatModel.updateHabitat(
        req.params.id, req.user.id, req.body
    );
        if(!habitat) {
            return res.status(404).json({message: 'Habitat not found'});
        }
        res.status(200).json(habitat)
    } catch(err){
        return res.status(400).json({message: err.message})
    }
}
export const deleteHabitat = async (req, res) => {
    try {
        const habitat = await habitatModel.deleteHabitat(req.params.id, req.user.id);
        if(!habitat){
            return res.status(404).json({message: 'Habitat not found.'})
        }
        res.status(200).json({message: 'Habitat deleted successfully'});
    } catch(err){
        res.status(500).json({message: err.message})
    }
}