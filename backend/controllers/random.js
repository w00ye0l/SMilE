const schedule = require("node-schedule");
const Question = require("../models/question");
const Answer = require("../models/answer");
const User = require("../models/user");
const fs = require("fs");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

let data; // data.json 파일을 저장할 변수
let currentIdx = 0; // 현재 처리 중인 인덱스
let job; // 스케쥴링 객체
let latestQuestion = null; // 가장 최근의 질문을 저장하는 변수

// 데이터 파일 경로
function loadData() {
  const rawData = fs.readFileSync("data.json");
  data = JSON.parse(rawData);

  // isUsed 값을 모두 false로 초기화
  data.question.forEach((q) => {
    q.isUsed = false;
  });
}

// 질문 저장하고 불러오는 함수
function getQuestion() {
  // 데이터 검사
  if (currentIdx >= data.question.length) {
    console.log("질문이 더이상 없습니다.");
    job.cancel();
    return;
  }

  // 이미 방문한 질문인 경우 처리
  if (data.question[currentIdx].isUsed) {
    console.log(`이미 처리한 질문 ID: ${data.question[currentIdx].id}`);
    currentIdx++;
    return getQuestion();
  }
  // 이미 저장된 질문인지 확인
  return Question.findOne({
    where: { question: data.question[currentIdx].question },
  }).then((existQuestion) => {
    if (existQuestion) {
      currentIdx++;
      return getQuestion();
    }

    // Question DB에 저장
    return Question.create({ question: data.question[currentIdx].question })
      .then(() => {
        const questionObject = data.question[currentIdx]; // 질문 객체 반환
        console.log(`Question DB에 저장 ID: ${questionObject.id}`);

        // isUsed 값을 true로 변경
        questionObject.isUsed = true;

        // 변경된 데이터를 data.json 파일에 저장
        fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

        // Update - User 모델의 answered를 false로 변경
        try {
          User.update({ answered: false }, { where: {} });
          console.log("answered가 false로 업데이트되었습니다.");
        } catch (error) {
          console.error(
            "answered를 업데이트하는 동안 오류가 발생했습니다.",
            error
          );
        }
        currentIdx++;
        return questionObject; // 다음 질문 반환
      })
      .catch((error) => {
        console.log(error);
        currentIdx++;
        return getQuestion();
      });
  });
}

loadData();

// */20 * * * * *
// '0 0 12 * * *' 정각마다 바뀜

// 스케줄링 rule 설정
const rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 5;
rule.second = 0;

// schedule 함수
job = schedule.scheduleJob(rule, async () => {
  try {
    const question = await getQuestion();

    if (question) {
      console.log("랜덤 질문이 선택되었습니다:", question);
    }
  } catch (error) {
    console.error("질문을 가져오는 동안 오류가 발생했습니다.", error);
  }
});

// 오늘의 질문 조회
exports.question = async (req, res, next) => {
  try {
    const latestQuestionDB = await Question.findOne({
      order: [["id", "DESC"]],
    });

    if (!latestQuestionDB) {
      console.log("더 이상 질문이 없습니다.");
      return res.json({
        question: latestQuestionDB.question,
        id: latestQuestionDB.id,
      });
    }

    const latestQuestion = latestQuestionDB.question;
    const latestQuestionId = latestQuestionDB.id;

    console.log("이미 선택한 랜덤 질문입니다:", latestQuestion);
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

    res.json({ question: latestQuestion, id: latestQuestionId });
  } catch (error) {
    console.error("질문을 가져오는 동안 오류가 발생했습니다.", error);
    res.status(500).json({ error: "서버 오류" });
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
    });
    res.status(200).json(answers);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// mbti별 답변 조회
exports.mbtiIndex = async (req, res, next) => {
  const questionID = req.params.id;
  // const { mbti1, mbti2, mbti3, mbti4 } = req.query;
  const mbti1 = req.params.mbti1 || "";
  const mbti2 = req.params.mbti2 || "";
  const mbti3 = req.params.mbti3 || "";
  const mbti4 = req.params.mbti4 || "";
  try {
    let mbtiInfo = {
      questionId: questionID,
    };

    if (mbti1) {
      mbtiInfo["$User.mbti1$"] = {
        [Op.like]: `${mbti1.toLowerCase()}%`,
      };
    }
    if (mbti2) {
      mbtiInfo["$User.mbti2$"] = {
        [Op.like]: `${mbti2.toLowerCase()}%`,
      };
    }
    if (mbti3) {
      mbtiInfo["$User.mbti3$"] = {
        [Op.like]: `${mbti3.toLowerCase()}%`,
      };
    }
    if (mbti4) {
      mbtiInfo["$User.mbti4$"] = {
        [Op.like]: `${mbti4.toLowerCase()}%`,
      };
    }

    const answers = await Answer.findAll({
      where: mbtiInfo,
      include: {
        model: User,
        attributes: ["mbti1", "mbti2", "mbti3", "mbti4"],
      },
    });

    let url = `/random/${questionID}/`;

    url += mbti1 ? mbti1.toLowerCase() : "_";
    url += mbti2 ? mbti2.toLowerCase() : "_";
    url += mbti3 ? mbti3.toLowerCase() : "_";
    url += mbti4 ? mbti4.toLowerCase() : "_";

    res.status(200).json({ answers, url });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};
