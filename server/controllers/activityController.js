import * as activityModel from '../models/activityModel.js'

export const getActivities = async (req, res) => {
    try {
        const activities = await activityModel.getAllActivities(req.user.id)
        res.status(200).json(activities)
    } catch (err) {
        res.status(500).json({ message: err.message || err })
    }
}
