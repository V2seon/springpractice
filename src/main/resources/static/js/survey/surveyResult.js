let questCount = 0;
num = 1;
let surveyResultTypeArray = new Array();
let surveyResultDataArray = new Array();

// 타입순서
for (var i=0; i < qqqe.length; i++){
    let sstype      = qqqe[i].sstype;
    surveyResultTypeArray.push(sstype);
}

for (var i = 0; i < surveyResultData.length; i++){
    let SEQ = surveyResultData[i].srs_SEQ - 1;
    let ANSWER = surveyResultData[i].srs_ANSWER;
    
    if (surveyResultTypeArray[SEQ] === 0) {
        // 객관식
        if (surveyResultDataArray[SEQ] === null || surveyResultDataArray[SEQ] === undefined) {
            let mult = [0,0,0,0,0];
            surveyResultDataArray[SEQ] = mult;
        }
        const answernumber = parseInt(ANSWER) - 1;
        surveyResultDataArray[SEQ][answernumber]++;
    } else if (surveyResultTypeArray[SEQ] === 1) {
        // 주관식
        if (surveyResultDataArray[SEQ] === null || surveyResultDataArray[SEQ] === undefined) {
            let shortArr = new Array();
            surveyResultDataArray[SEQ] = shortArr;
        }
        surveyResultDataArray[SEQ].push(ANSWER);
    }
}
console.log("surveyResultDataArray", surveyResultDataArray);

for (var i=0; i < qqqe.length; i++){
    let sspk        = qqqe[i].sspk;
    let smpkfk      = qqqe[i].smpkfk;
    let ssSeq       = qqqe[i].ssSeq;
    let sscontent   = qqqe[i].sscontent;
    let sstype      = qqqe[i].sstype;
    let ssQ1        = qqqe[i].ssQ1;
    let ssQ2        = qqqe[i].ssQ2;
    let ssQ3        = qqqe[i].ssQ3;
    let ssQ4        = qqqe[i].ssQ4;
    let ssQ5        = qqqe[i].ssQ5;

    if(sstype === 0){
        if ($('#accordion').children()) {
            questCount = $('#accordion').children().length;
         }
        questCount++;
        $('#accordion').append(addQuestion2(num, ssSeq, sscontent, ssQ1, ssQ2, ssQ3, ssQ4, ssQ5, surveyResultDataArray[i]));
        num++;
    }else{
        if ($('#accordion').children()) {
            questCount = $('#accordion').children().length;
        }
        questCount++;
        $('#accordion').append(addQuestion3(num, ssSeq, sscontent));
        num++;
    }
    // console.log(qqqe[i]);

}


function addQuestion2(num, SS_SEQ, SS_CONTENT, SS_Q1, SS_Q2, SS_Q3, SS_Q4, SS_Q5, cntDatas) {
    var htmlchild = `
        <li class="card card-primary card-outline">
        <a class="d-block w-100" >
            <div class="card-header">
                <h4 class="card-title mt-1" style="display:inline;">
                    ${SS_CONTENT}
                </h4>
            </div>
        </a>

        <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body" style="padding-bottom: 0px;padding-top: 15px;">
                <div class="form-group row">
                    <label class="col-form-label">A1 :</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q1}${cntDatas != null ? '('+cntDatas[0]+'명)' : '(설문자 없음)'}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
        <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body" style="padding-bottom: 0px;padding-top: 15px;">
                <div class="form-group row">
                    <label class="col-form-label">A2 :</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q2}${cntDatas != null ? '('+cntDatas[1]+'명)' : '(설문자 없음)'}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
        <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body" style="padding-bottom: 0px;padding-top: 15px;">
                <div class="form-group row">
                    <label class="col-form-label">A3 :</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q3}${cntDatas != null ? '('+cntDatas[2]+'명)' : '(설문자 없음)'}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
        <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body" style="padding-bottom: 0px;padding-top: 15px;">
                <div class="form-group row">
                    <label class="col-form-label">A4 :</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q4}${cntDatas != null ? '('+cntDatas[3]+'명)' : '(설문자 없음)'}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
        <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body" style="padding-bottom: 0px;padding-top: 15px;">
                <div class="form-group row">
                    <label class="col-form-label">A5 :</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q5}${cntDatas != null ? '('+cntDatas[4]+'명)' : '(설문자 없음)'}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
    </li>

    `;
    return htmlchild;
}

function addQuestion3(num, SS_SEQ, SS_CONTENT) {
    var htmlchild = `
        <li class="card card-primary card-outline">
            <a class="d-block w-100" >
                <div class="card-header">
                    <h4 class="card-title mt-1" style="display:inline;  margin-right:0.5%;">
                        ${SS_CONTENT}
                    </h4>
                     <button type="button" class="float-center btn-primary" style="font-size: 0.9rem; border-radius: 5px;" data-toggle="modal" data-target="#modal-narrative" onclick="questions(${num}, '${SS_CONTENT}')">답변 보기</button>
                </div>
            </a>
        </li>
    `;
    return htmlchild;
}

function questions(num, title){
        var num = num-1;
        $('#NarPaging').empty();
        document.getElementById('title_qs').innerText = "";
        document.getElementById('title_qs').innerText = title;

        // 주관식 설문 질문 제목 클릭할 때, surveyResultDataArray 길이가 0이면 고객이 1명도 설문에 응하지 않았다는 뜻이다.
        if(surveyResultDataArray.length == 0){
            $('#NarPaging').append(questions_no("설문자 없음"));
        }

        // 주관식 설문 질문 제목 클릭할 때, surveyResultDataArray 길이가 0이 아니라면 고객이 주관식 설문에 응했으므로 그 Array에서 있는 응답 그대로 다 가져온다.
        else{
            for(var i=0; i < surveyResultDataArray[num].length; i++){
                $('#NarPaging').append(questions_yes(i+1, surveyResultDataArray[num][i]));
            }
        }
}

function questions_no(answer){

var questions = `
    <tr>
        <td value="${answer}">${answer}</td>
    </tr>
`;
     return questions;
}


function questions_yes(i, answer){

var questions = `
    <tr>
        <td value="${i}">${i}</td>
        <td value="${answer}">${answer}</td>
    </tr>
`;
     return questions;
}


function cancel(){
    $('#NarPaging').empty();
    document.getElementById('title_qs').innerText = "";
}