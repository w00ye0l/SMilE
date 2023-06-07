const Comment = require("../models/comment");
const Answer = require("../models/answer");
const User = require("../models/user")

// 댓글 생성
exports.commentCreate = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const answerID = req.params.id;

    if (!answerID) {
      res.status(400).json({ message: "답변 ID가 맞지 않습니다." });
      return;
    }

    const existAnswer = await Answer.findOne({
      where: {
        id: answerID,
      },
    });

    if (!existAnswer) {
      return res.status(404).json({ message: "해당 답변이 없습니다" });
    }

    // userID와 answerID로 이미 답변이 존재하는지 확인
    const existComment = await Comment.findOne({
      where: {
        userID: req.user.id,
        answerID: answerID,
      },
    });

    if (existComment) {
      res.status(400).json({ message: "이미 해당 답변에 대한 댓글을 작성하셨습니다." });
      return;
    }

    const createComment = await Comment.create({
      userID: req.user.id,
      answerID: existAnswer.id,
      comment: comment
    });

    res.status(200).send(createComment);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 답변별 댓글 조회
exports.commentRead = async (req, res, next) => {
  try {
    const answerID = req.params.id;

    if (!answerID) {
      res.status(400).json({ message: "답변 ID가 맞지 않습니다." });
      return;
    }

    const existAnswer = await Answer.findOne({
      where: {
        id: answerID,
      },
    });

    if (!existAnswer) {
      return res.status(404).json({ message: "해당 답변이 없습니다" });
    }
    const comments = await Comment.findAll({
      where: {
        answerID: answerID,
      },
      include: {
        model: User,
        attributes: ['mbti1', 'mbti2', 'mbti3', 'mbti4']
      },
    });

    if (comments.length === 0) {
      return res.status(404).json({ message: "해당 댓글이 없습니다" });
    }

    res.status(200).send(comments);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 댓글 상세 조회(작성자만 확인 가능)
exports.commentIndex = async (req, res, next) => {
  try {
    const existComment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existComment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다" });
    }

    if (existComment.userID !== req.user.id) {
      return res.status(403).json({ message: "다른 사용자의 정보입니다" });
    }

    res.status(200).send(existComment);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 댓글 수정
exports.commentUpdate = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const userID = req.user.id;
    const existComment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existComment) {
      return res.status(404).json({ message: "해당 댓글이 없습니다" });
    }

    if (existComment.userID !== userID) {
      return res.status(403).json({ message: "다른 사용자의 정보입니다" });
    }


    const existAnswer = await Answer.findOne({
      where: {
        id: answerID,
      },
    });

    if (!existAnswer) {
      return res.status(404).json({ message: "해당 답변이 없습니다" });
    }
    const comments = await Comment.update(
    await Comment.update(
      {
        comment: comment
      },
      {
        where: {
          id: req.params.id,
          userID: req.user.id,
        },
      }
    );

    res.status(200).json({ message: "댓글이 수정되었습니다" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 댓글 삭제
exports.commentRemove = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const existComment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existComment) {
      return res.status(404).json({ message: "해당 댓글이 없습니다" });
    }

    if (existComment.userID !== req.user.id) {
      return res.status(403).json({ message: "로그인한 사용자가 아닙니다" });
    }

    await Comment.destroy({
      where: {
        id: req.params.id,
        userID: userID,
      },
      truncate: false,
    });

    res.status(200).json({ message: "댓글이 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
