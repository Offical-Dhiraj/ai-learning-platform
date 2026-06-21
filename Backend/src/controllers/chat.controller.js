const Chat = require("../models/chat.model");
const { askAI } = require("../services/chat.service");

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        const answer = await askAI(
            message,
            req.user
        );

        await Chat.create({
            userId: req.user._id,
            question: message,
            answer,
        });

        res.json({
            success: true,
            answer,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "AI Error",
        });
    }
};

const getHistory = async (req, res) => {
    try {
        const chats = await Chat.find({
            userId: req.user._id,
        }).sort({ createdAt: 1 });

        res.json({
            success: true,
            chats,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
        });
    }
};

module.exports = {
    chatWithAI,
    getHistory,
};