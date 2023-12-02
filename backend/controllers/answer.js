const Question = require("../models/question");
const Answer = require("../models/answer");
const Comment = require("../models/comment");
const User = require("../models/user");

const schedule = require("node-schedule");

// Random 질문에 대한 답변 생성
exports.answerCreate = async (req, res, next) => {
  try {
    const { answer } = req.body;
    const questionID = req.params.id;

    if (!questionID) {
      res.status(400).json({ message: "질문 ID가 맞지 않습니다." });
      return;
    }

    // questionID를 이용해 질문을 확인하고 답변 생성
    const random = await Question.findOne({
      where: { id: questionID },
    });

    if (!random) {
      res.status(404).json({ message: "맞지 않은 질문입니다." });
      return;
    }

    // userID와 questionID로 이미 답변이 존재하는지 확인
    const existAnswer = await Answer.findOne({
      where: {
        userID: req.user.id,
        questionID: questionID,
      },
    });

    if (existAnswer) {
      res
        .status(400)
        .json({ message: "이미 해당 질문에 대한 답변을 작성하셨습니다." });
      return;
    }

    const createAnswer = await Answer.create({
      userID: req.user.id,
      questionID: random.id,
      answer: answer,
    });

    // User 모델의 answered 필드 업데이트
    await User.update(
      { answered: true },
      {
        where: { id: req.user.id },
      }
    );

    const user = await User.findByPk(req.user.id);

    res
      .status(201)
      .json({ createAnswers: createAnswer, answered: user.answered });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Random 답변 id로 조회(상세 페이지)
exports.answerRead = async (req, res, next) => {
  try {
    const answer = await Answer.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!answer) {
      res.status(404).json({ message: "답변이 없습니다." });
      return;
    }
    const user = await User.findByPk(answer.userID, {
      attributes: ["answered"], // answered 필드만 선택적으로 조회
    });

    if (!user) {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      return;
    }

    const responseData = {
      answer: answer,
      answered: user.answered,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Random 답변 수정
exports.answerUpdate = async (req, res, next) => {
  try {
    const { answer } = req.body;
    const userID = req.user.id;
    const existAnswer = await Answer.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existAnswer) {
      return res.status(404).json({ error: "답변이 없습니다" });
    }

    if (existAnswer.userID !== userID) {
      return res.status(403).json({ error: "로그인한 사용자가 아닙니다" });
    }
    const answers = await Answer.update(
      {
        answer: answer,
      },
      {
        where: {
          id: req.params.id,
          userID: req.user.id,
        },
      }
    );

    res.status(200).json({ answer: "answer" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Random 답변 삭제
exports.answerRemove = async (req, res, next) => {
  try {
    const userID = req.user.id;

    const existAnswer = await Answer.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existAnswer) {
      return res.status(404).json({ error: "답변이 없습니다" });
    }

    if (existAnswer.userID !== userID) {
      return res.status(403).json({ error: "로그인한 사용자가 아닙니다" });
    }

    await Comment.destroy({
      where: {
        answerID: req.params.id,
      },
    });

    await Answer.destroy({
      where: {
        id: req.params.id,
        userID: req.user.id,
      },
      truncate: false,
    });

    res.status(200).json({ message: "답변이 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
