const schedule = require("node-schedule");
const Question = require("../models/question");
const Answer = require("../models/answer");
const User = require("../models/user");
const fs = require("fs");

let data; // data.json 파일을 저장할 변수
let currentIndex = 0; // 현재 처리 중인 인덱스
let job; // 스케쥴링 객체

// 데이터 파일 경로
function loadData() {
  const rawData = fs.readFileSync('data.json');
  data = JSON.parse(rawData);

  // isUsed 값을 모두 false로 초기화
  data.question.forEach(question => {
    question.isUsed = false;
  });
}

// 질문 저장하고 불러오는 함수
function getQuestion() {

  // 데이터 검사
  if (currentIndex >= data.question.length) {
    console.log('질문이 더이상 없습니다.');
    job.cancel();
    return;
  }

  // 이미 방문한 질문인 경우 처리
  if (data.question[currentIndex].isUsed) {
    console.log(`이미 처리한 질문 ID: ${data.question[currentIndex].id}`);
    currentIndex++;
    return getQuestion();
  }
    // 이미 저장된 질문인지 확인
    return Question.findOne({ where: { question: data.question[currentIndex].question } })
    .then(existingQuestion => {
      if (existingQuestion) {
        // console.log(`이미 저장된 질문 ID: ${data.question[currentIndex].id}`);
        currentIndex++;
        return getQuestion();
      }

      // Question DB에 저장
      return Question.create({ question: data.question[currentIndex].question })
        .then(() => {
          console.log(`Question DB에 저장 ID: ${data.question[currentIndex].id}`);

          // isUsed 값을 true로 변경
          data.question[currentIndex].isUsed = true;

          // 변경된 데이터를 data.json 파일에 저장
          fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

          currentIndex++;
          return data.question[currentIndex].question; // 다음 질문 반환
        })
        .catch(error => {
          console.log(error);
          currentIndex++;
          return getQuestion();
        });
    });
}

loadData();

// '0 0 12 * * *' 정각마다 바뀜

// schedule 함수
job = schedule.scheduleJob('*/20 * * * * *', async () => { // 20초마다 함수 실행(테스트용)
  try {
    const question = await getQuestion();

    if (question) {
      console.log("랜덤 질문이 선택되었습니다:", question);
    }
  } catch (error) {
    console.error("질문을 가져오는 동안 오류가 발생했습니다.", error);
  }
});

// Random 질문 조회
exports.question = async (req, res, next) => {
  try {
    const question = await Question.findAll({
      order: [['id', 'ASC']]
    });

    if (!question) {
      console.log("더 이상 질문이 없습니다.");
      return res.json({ question: null }); 
    }
    console.log("랜덤 질문이 선택되었습니다:", question);

    res.json({ question: question });
  } catch (error) {
    console.error("질문을 가져오는 동안 오류가 발생했습니다.", error);
    res.status(500).json({ error: "서버 오류" });
  }
};

// Random 질문에 대한 답변 생성
exports.answer = async (req, res, next) => {
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
      res.status(400).json({ message: "이미 해당 질문에 대한 답변을 작성하셨습니다." });
      return;
    }

    const createAnswer = await Answer.create({
      userID: req.user.id,
      questionID: random.id,
      answer: answer,
    });

    res.status(201).json(createAnswer);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 전체 Random Q&A 조회
exports.index = async (req, res, next) => {
  const questionID = req.params.id;
  try {
    const answers = await Answer.findAll({
      where: {
        questionID: questionID,
      },
      include: {
        model: User,
        attributes: ["mbti1", "mbti2", "mbti3", "mbti4"],
      },
    });
    res.status(200).json(answers);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// Random 답변 id로 조회(상세 페이지)
exports.read = async (req, res, next) => {
  try {
    const answer = await Answer.findOne({
      where: {
        id: req.params.id,
        userID: req.user.id,
      },
      include: {
        model: User,
        attributes: ["mbti1", "mbti2", "mbti3", "mbti4"],
      },
    });
    if (!answer) {
      res.status(404).json({ message: "답변이 없습니다." });
      return;
    }
    res.status(200).json(answer);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// Random 답변 수정
exports.update = async (req, res, next) => {
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

    res.status(200).json(answers);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// Random 답변 삭제
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
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
  res.end();
};
