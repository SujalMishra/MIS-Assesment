const { Feedback } = require("../models/Schema");

const getOne = async (req, res) => {
    try {
        let feedbackData = await Feedback.find({ to: req.params.id });
        console.log("Success");
        res.json({ success: true, feedbackData });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
};

const getAll = async (req, res) => {
    try {
        let feedbackData = await Feedback.find();
        console.log("Success");
        res.json({ success: true, feedbackData });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
};

const AddFeedback = async (req, res) => {
    let { to, from, review } = req.body;
    try {
        await Feedback.create({
            to: to,
            from: from,
            review: review,
        })
        console.log("Success");
        res.json({ success: true });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
};

module.exports = {  getAll, getOne, AddFeedback };