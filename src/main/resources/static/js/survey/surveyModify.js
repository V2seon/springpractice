

const accordion = document.getElementById("accordion");
const btnAddQuestion = document.getElementById("btnAddQuestion");
const btnSurveyRegist = document.getElementById("btnSurveyRegist");

let num = 1;
let deleteArray = [];
let questArray = [];
//const surveyTitle = $('#serveyTitle').val();
const smpk = $('#smpk').val();
// 설문 등록 리스너
btnSurveyRegist.addEventListener("click", () => {
    let questCount = 0;
//    let questArray = [];
    const surveyTitle = $('#serveyTitle').val();
//    const smpk = $('#smpk').val();
    if (surveyTitle === "" || surveyTitle === null) {
        swal({
            text: "설문 제목을 입력하세요.",
            icon: "warning" //"info,success,warning,error" 중 택1
        });
        $('#serveyTitle').focus();
    } else {
        if ($('#accordion').children()) {
            questCount = $('#accordion').children().length;
        }
        if (questCount == 0) {
            swal({
                text: "문항을 1개이상 등록하세요.",
                icon: "warning" //"info,success,warning,error" 중 택1
            });
        } else {
            for (let i = 0; i < questCount; i++){
                const uniqueValue = $('#accordion').children('li').eq(i).children('input').val();
                const SS_SEQ = i+1;
                const SS_PK = $(`#q_${uniqueValue}_pk`).val();
                const SM_PK_FK = $(`#q_${uniqueValue}_fk`).val();
                const SS_CONTENT = $(`#q_${uniqueValue}_title`).val();
                const SS_TYPE = $(`input[name=q_${uniqueValue}_radio_type]:checked`).val();
                let SS_Q1 = "";
                let SS_Q2 = "";
                let SS_Q3 = "";
                let SS_Q4 = "";
                let SS_Q5 = "";
                if (SS_TYPE === '0') {
                    SS_Q1 = $(`#q_${uniqueValue}_input_a1`).val();
                    SS_Q2 = $(`#q_${uniqueValue}_input_a2`).val();
                    SS_Q3 = $(`#q_${uniqueValue}_input_a3`).val();
                    SS_Q4 = $(`#q_${uniqueValue}_input_a4`).val();
                    SS_Q5 = $(`#q_${uniqueValue}_input_a5`).val();
                }

                if (SS_CONTENT === '' || SS_CONTENT === null) {
                    swal({
                        text: `${SS_SEQ}번 질문을 입력하세요.`,
                        icon: "warning" //"info,success,warning,error" 중 택1
                    });
                    return false;
                }
                if (SS_TYPE === '0') {
                    if (SS_Q1 === '' || SS_Q1 === null) {
                        swal({
                            text: `${SS_SEQ}번 질문의 1번 선택지 내용을 입력하세요.`,
                            icon: "warning" //"info,success,warning,error" 중 택1
                        });
                        return false;
                    }else if (SS_Q2 === '' || SS_Q2 === null) {
                        swal({
                            text: `${SS_SEQ}번 질문의 2번 선택지 내용을 입력하세요.`,
                            icon: "warning" //"info,success,warning,error" 중 택1
                        });
                        return false;
                    }else if (SS_Q3 === '' || SS_Q3 === null) {
                        swal({
                            text: `${SS_SEQ}번 질문의 3번 선택지 내용을 입력하세요.`,
                            icon: "warning" //"info,success,warning,error" 중 택1
                        });
                        return false;
                    }else if (SS_Q4 === '' || SS_Q4 === null) {
                        swal({
                            text: `${SS_SEQ}번 질문의 4번 선택지 내용을 입력하세요.`,
                            icon: "warning" //"info,success,warning,error" 중 택1
                        });
                        return false;
                    }else if (SS_Q5 === '' || SS_Q5 === null) {
                        swal({
                            text: `${SS_SEQ}번 질문의 5번 선택지 내용을 입력하세요.`,
                            icon: "warning" //"info,success,warning,error" 중 택1
                        });
                        return false;
                    }
                }
                
                
                const question = {
                    'SS_PK': SS_PK,
                    'SM_PK_FK': SM_PK_FK,
                    'SS_SEQ': SS_SEQ,
                    'SS_CONTENT': SS_CONTENT,
                    'SS_TYPE': SS_TYPE,
                    'SS_Q1': SS_Q1,
                    'SS_Q2': SS_Q2,
                    'SS_Q3': SS_Q3,
                    'SS_Q4': SS_Q4,
                    'SS_Q5': SS_Q5
                };
                questArray.push(question);
            }
            $.ajax({
                url      : "/survey/surveydelete"+"?"+"surveyTitle="+surveyTitle+"&"+"smpk="+smpk,
                data     : JSON.stringify(deleteArray),
                type     : "POST",
                dataType:'text',
                contentType:'application/json;',
                success : function(result) {
                    modify()
                },
                error:function(request,status,error){
                    swal({
                        text: "삭제하는데 문제가 발생하여 실패했습니다.",
                        icon: "warning" //"info,success,warning,error" 중 택1
                    });
                }
            });
        }
        console.log("questArray : ", questArray);
        console.log("deleteArray : ", deleteArray);
        console.log(surveyTitle);
    }
    
});

function modify(){
            const title = $('#serveyTitle').val();
            $.ajax({
                url      : "/survey/surveymodify"+"?"+"surveyTitle="+title+"&"+"smpk="+smpk,
                data     : JSON.stringify(questArray),
                type     : "POST",
                dataType:'text',
                contentType:'application/json;',
                success : function(result) {
                        location.href = "/survey/list";
                },
                error:function(request,status,error){
                    swal({
                        text: "삭제하는데 문제가 발생하여 실패했습니다.",
                        icon: "warning" //"info,success,warning,error" 중 택1
                    });
                }
            });
}

// 문항추가 리스너
btnAddQuestion.addEventListener("click", () => {
    let questCount = 0;
    if ($('#accordion').children()) {
        questCount = $('#accordion').children().length;
    }
    questCount++;
    $('#accordion').append(addQuestion(num, questCount));
    num++;
});

// 질문 입력 감지 이벤트 체크
$(document).on('input', 'input[type=text]', function (e) {
    const attrID = $(this).attr('id');
    const attrArray = attrID.split('_');
    const number = attrArray[1];
    const type = attrArray[2];
    if (type === 'title') {
        $(`#q_${number}_toptitle`).text(" " + $(this).val());
    }
});

// 라디오버튼 체인지 이벤트 체크
$(document).on('change', 'input[type=radio]', function (e) {
    const attrID = $(this).attr('id');
    const attrArray = attrID.split('_');
    const number = attrArray[1];
    const type = attrArray[2];
    if (type === "short") {
        $(`#q_${number}_body_mult`).empty();
    } else if (type === "mult") {
        $(`#q_${number}_body_mult`).append(addMultType(number));
    } else if (type === "type") {
        const typeNumber = attrArray[4];
        if (typeNumber === "1") {
            // 일반
            $(`#q_${number}_input_a1`).val("매우 좋음");
            $(`#q_${number}_input_a2`).val("좋음");
            $(`#q_${number}_input_a3`).val("보통");
            $(`#q_${number}_input_a4`).val("안 좋음");
            $(`#q_${number}_input_a5`).val("매우 안 좋음");
            $(`#q_${number}_input_a1`).attr('readonly', "readonly");
            $(`#q_${number}_input_a2`).attr('readonly', "readonly");
            $(`#q_${number}_input_a3`).attr('readonly', "readonly");
            $(`#q_${number}_input_a4`).attr('readonly', "readonly");
            $(`#q_${number}_input_a5`).attr('readonly', "readonly");
        } else if (typeNumber === "2") {
            // 커스텀
            $(`#q_${number}_input_a1`).val("");
            $(`#q_${number}_input_a2`).val("");
            $(`#q_${number}_input_a3`).val("");
            $(`#q_${number}_input_a4`).val("");
            $(`#q_${number}_input_a5`).val("");
            $(`#q_${number}_input_a1`).removeAttr("readonly");
            $(`#q_${number}_input_a2`).removeAttr("readonly");
            $(`#q_${number}_input_a3`).removeAttr("readonly");
            $(`#q_${number}_input_a4`).removeAttr("readonly");
            $(`#q_${number}_input_a5`).removeAttr("readonly");
            
        }
    }
});


// 순서바꾸는 기능
$(function () {
    $("#accordion").sortable();
});
$("#accordion").sortable({
    revert: false,
    update: function () {
        reSort();
        // $('#accordion li').each(function (index) {
        //     const nownumber = index + 1;
        //     $(this).attr('id', `q_${nownumber}`);
        //     $(this).children('a').attr('href', `#collapse${nownumber}`);
        //     $(this).children('a').children('div').children('h4').text(`${nownumber} 문항`);
        //     $(this).children('a').children('div').children('button').attr('onclick', `removeQ(${nownumber})`);
        //     $(this).children('div').attr('id', `collapse${nownumber}`);
            
        //     $(this).children('div').children('div').children('div').eq(0).children('div').eq(0).children('input').attr('id', `q_${nownumber}_mult`);
        //     $(this).children('div').children('div').children('div').eq(0).children('div').eq(0).children('input').attr('name', `q_${nownumber}_radio_type`);
        //     $(this).children('div').children('div').children('div').eq(0).children('div').eq(0).children('label').attr('for', `q_${nownumber}_mult`);
        //     $(this).children('div').children('div').children('div').eq(0).children('div').eq(1).children('input').attr('id', `q_${nownumber}_short`);
        //     $(this).children('div').children('div').children('div').eq(0).children('div').eq(1).children('input').attr('name', `q_${nownumber}_radio_type`);
        //     $(this).children('div').children('div').children('div').eq(0).children('div').eq(1).children('label').attr('for', `q_${nownumber}_short`);
            
        //     $(this).children('div').children('div').children('div').eq(1).children('div').children('label').attr('for', `q_${nownumber}_title`);
        //     $(this).children('div').children('div').children('div').eq(1).children('div').children('div').children('input').attr('id', `q_${nownumber}_title`);
            
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(0).children('input').attr('id', `q_${nownumber}_mult_1`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(0).children('input').attr('name', `q_${nownumber}_radio_mult_type`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(0).children('label').attr('for', `q_${nownumber}_mult_1`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(1).children('input').attr('id', `q_${nownumber}_mult_2`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(1).children('input').attr('name', `q_${nownumber}_radio_mult_type`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(1).children('label').attr('for', `q_${nownumber}_mult_2`);

        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(2).children('label').attr('for', `q_${nownumber}_input_a1`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(2).children('div').children('input').attr('id', `q_${nownumber}_input_a1`);
            
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(3).children('label').attr('for', `q_${nownumber}_input_a2`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(3).children('div').children('input').attr('id', `q_${nownumber}_input_a2`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(4).children('label').attr('for', `q_${nownumber}_input_a3`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(4).children('div').children('input').attr('id', `q_${nownumber}_input_a3`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(5).children('label').attr('for', `q_${nownumber}_input_a4`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(5).children('div').children('input').attr('id', `q_${nownumber}_input_a4`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(6).children('label').attr('for', `q_${nownumber}_input_a5`);
        //     $(this).children('div').children('div').children('div').eq(2).children('div').eq(6).children('div').children('input').attr('id', `q_${nownumber}_input_a5`);
            
        // });
    }
});
// 문항 재정렬
function reSort() {
    $('#accordion li').each(function (index) {
        const nownumber = index + 1;
        $(this).attr('id', `q_${nownumber}`);
        $(this).children('a').attr('href', `#collapse${nownumber}`);
        $(this).children('a').children('div').children('h4').eq(0).text(`[${nownumber}번 질문]`);
        $(this).children('div').attr('id', `collapse${nownumber}`);
        $(this).children('div').children('button').attr('onclick', `removeQ(${nownumber})`);
        $(this).children('div').children('button').children('input').attr('id', `q_${nownumber}_sspk`);
        $(this).children('div').children('button').children('input').next('input').attr('id', `q_${nownumber}_smpkfk`);
        $(this).children('div').children('button').children('input').next('input').next('input').attr('id', `q_${nownumber}_content`);

    });
}


// 문항 삭제 기능
function removeQ(number) {
//    delete originalArray[number-1];
     sspk = $(`#q_${number}_sspk`).val();
     smpkfk = $(`#q_${number}_smpkfk`).val();
     sscontent = $(`#q_${number}_content`).val();

    const questionremoves = {
      "sspk" : sspk,
      "smpkfk" : smpkfk,
      "sscontent" : sscontent
    }
    deleteArray.push(questionremoves);
    console.log(deleteArray);
//    if(smpkfk == originalArray[number-1].smpkfk && sspk == originalArray[number-1].sspk){
//    deleteArray.push(originalArray[number-1]);
//    console.log("맞음");
//    }
//    else{
//    console.log("값이 틀렸음");
//    }
    $(`#q_${number}`).remove();
    reSort();
}

// 문항추가 클릭시 HTML 태그 생성
function addQuestion(number, seq) {
    var htmlchild = `
    <li id="q_${number}" class="card card-primary card-outline">
        <input type="hidden" value="${number}">
        <a class="d-block w-100 collapsed" data-toggle="collapse" href="#collapse${number}" aria-expanded="false">
            <div class="card-header">
                <h4 class="card-title" style="display:inline;">
                    [${seq}번 질문]
                </h4>
                <h4 id="q_${number}_toptitle" class="card-title abbwords" style="display:inline;">
                    
                </h4>
            </div>
        </a>
        
        <div id="collapse${number}" class="collapse" data-parent="#accordion">
            <button type="button" class="btn btn-danger btn-xs btn-primary" style="float: right;" onclick="removeQ(${number})">
                <i class="far fa-minus-square"></i>
            </button>
            <div class="card-body">
                <label class="col-form-label">문항 타입</label>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_mult" name="q_${number}_radio_type" value="0" checked>
                    <label for="q_${number}_mult" class="custom-control-label">객관식</label>
                </div>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_short" name="q_${number}_radio_type" value="1">
                    <label for="q_${number}_short" class="custom-control-label">주관식</label>
                </div>
            </div>
            <div class="card-body">
                <div class="form-group row">
                    <label for="q_${number}_title" class="col-sm-1 col-form-label">질문</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_title">
                    </div>
                </div>
            </div>
            <div id="q_${number}_body_mult" class="card-body">
                <label class="col-form-label">객관식 타입</label>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_type_mult_1" name="q_${number}_radio_mult_type" value="0" checked>
                    <label for="q_${number}_type_mult_1" class="custom-control-label">일반</label>
                </div>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_type_mult_2" name="q_${number}_radio_mult_type" value="1">
                    <label for="q_${number}_type_mult_2" class="custom-control-label">커스텀</label>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a1" class="col-sm-1 col-form-label">A1</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a1" value="매우 좋음" readonly="readonly">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a2" class="col-sm-1 col-form-label">A2</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a2" value="좋음" readonly="readonly">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a3" class="col-sm-1 col-form-label">A3</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a3" value="보통" readonly="readonly">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a4" class="col-sm-1 col-form-label">A4</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a4" value="안 좋음" readonly="readonly">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a5" class="col-sm-1 col-form-label">A5</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a5" value="매우 안 좋음" readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
    </li>
    `;
    return htmlchild;
}

// 객관식 타입 추가하기
function addMultType(number) {
    const htmlchild = `
        <label class="col-form-label">객관식 타입</label>
        <div class="custom-control custom-radio">
            <input class="custom-control-input" type="radio" id="q_${number}_type_mult_1" name="q_${number}_radio_mult_type" value="0" checked>
            <label for="q_${number}_type_mult_1" class="custom-control-label">일반</label>
        </div>
        <div class="custom-control custom-radio">
            <input class="custom-control-input" type="radio" id="q_${number}_type_mult_2" name="q_${number}_radio_mult_type" value="1">
            <label for="q_${number}_type_mult_2" class="custom-control-label">커스텀</label>
        </div>
        <div class="form-group row">
            <label for="q_${number}_input_a1" class="col-sm-1 col-form-label">1번 선택지</label>
            <div class="col-sm-12">
                <input type="text" class="form-control" id="q_${number}_input_a1" value="매우 좋음" readonly="readonly">
            </div>
        </div>
        <div class="form-group row">
            <label for="q_${number}_input_a2" class="col-sm-1 col-form-label">2번 선택지</label>
            <div class="col-sm-12">
                <input type="text" class="form-control" id="q_${number}_input_a2" value="좋음" readonly="readonly">
            </div>
        </div>
        <div class="form-group row">
            <label for="q_${number}_input_a3" class="col-sm-1 col-form-label">3번 선택지</label>
            <div class="col-sm-12">
                <input type="text" class="form-control" id="q_${number}_input_a3" value="보통" readonly="readonly">
            </div>
        </div>
        <div class="form-group row">
            <label for="q_${number}_input_a4" class="col-sm-1 col-form-label">4번 선택지</label>
            <div class="col-sm-12">
                <input type="text" class="form-control" id="q_${number}_input_a4" value="안 좋음" readonly="readonly">
            </div>
        </div>
        <div class="form-group row">
            <label for="q_${number}_input_a5" class="col-sm-1 col-form-label">5번 선택지</label>
            <div class="col-sm-12">
                <input type="text" class="form-control" id="q_${number}_input_a5" value="매우 안 좋음" readonly="readonly">
            </div>
        </div>
    `;
    return htmlchild;
}













//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (var i=0; i < qqqe.length; i++){
    let questCount = 0;
    let sspk = "";
    let smpkfk = "";
    let sscontent = 0;
    let ssQ1 = "";
    let ssQ2 = "";
    let ssQ3 = "";
    let ssQ4 = "";
    let ssQ5 = "";
    let inserttime = "";
    let modifytime = "";

    if(qqqe[i].sstype == 0){
        sspk = qqqe[i].sspk;
        smpkfk = qqqe[i].smpkfk;
        sscontent = qqqe[i].sscontent;
        ssQ1 = qqqe[i].ssQ1;
        ssQ2 = qqqe[i].ssQ2;
        ssQ3 = qqqe[i].ssQ3;
        ssQ4 = qqqe[i].ssQ4;
        ssQ5 = qqqe[i].ssQ5;
        inserttime = qqqe[i].ssinsertdatetime;
        modifytime = qqqe[i].ssmodifydatetime;

        if ($('#accordion').children()) {
            questCount = $('#accordion').children().length;
         }
        questCount++;
        $('#accordion').append(addQuestion2(num, questCount, sscontent, ssQ1, ssQ2, ssQ3, ssQ4, ssQ5, sspk, smpkfk, inserttime, modifytime));
        num++;
    }

    else{
        sspk = qqqe[i].sspk;
        smpkfk = qqqe[i].smpkfk;
        sscontent = qqqe[i].sscontent;
        if ($('#accordion').children()) {
            questCount = $('#accordion').children().length;
        }
        questCount++;
        $('#accordion').append(addQuestion3(num, questCount, sscontent, sspk, smpkfk, inserttime, modifytime));
        num++;
    }
console.log(qqqe[i].sspk);

<!--console.log( qqqe[i].ssQ1);-->
<!--console.log( qqqe[i].ssQ2);-->
<!--console.log( qqqe[i].ssQ3);-->
<!--console.log( qqqe[i].ssQ4);-->
<!--console.log( qqqe[i].ssQ5);-->


}


// 문항추가 클릭시 HTML 태그 생성 (객관식)
function addQuestion2(number, seq, sscontent, ssQ1, ssQ2, ssQ3, ssQ4, ssQ5, sspk, smpkfk, inserttime, modifytime) {
    var htmlchild = `
    <li id="q_${number}" class="card card-primary card-outline">
        <input type="hidden" value="${number}">
        <a class="d-block w-100 collapsed" data-toggle="collapse" href="#collapse${number}" aria-expanded="false">
            <div class="card-header">
                <h4 class="card-title" style="display:inline;">
                    [${seq}번 질문]
                </h4>
                <h4 id="q_${number}_toptitle" class="card-title abbwords" style="display:inline;">
                    ${sscontent}
                </h4>

            </div>
        </a>

        <div id="collapse${number}" class="collapse" data-parent="#accordion">
            <button type="button" class="btn btn-danger btn-xs btn-primary" style="float: right;" onclick="removeQ(${number})">
                <input id="q_${number}_sspk" value="${sspk}" type="hidden">
                <input id="q_${number}_smpkfk" value="${smpkfk}" type="hidden">
                <input id="q_${number}_content" value="${sscontent}" type="hidden">
                <i class="far fa-minus-square"></i>
            </button>
            <div class="card-body">
                <label class="col-form-label">문항 타입</label>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_mult" name="q_${number}_radio_type" value="0" checked>
                    <label for="q_${number}_mult" class="custom-control-label">객관식</label>
                </div>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_short" name="q_${number}_radio_type" value="1">
                    <label for="q_${number}_short" class="custom-control-label">주관식</label>
                </div>
            </div>
            <div class="card-body">
                <div class="form-group row">
                    <label for="q_${number}_title" class="col-sm-1 col-form-label">질문</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_title" value="${sscontent}">
                        <input type="text" class="form-control" id="q_${number}_pk" value="${sspk}" style="display:none" type="hidden">
                        <input type="text" class="form-control" id="q_${number}_fk" value="${smpkfk}" style="display:none" type="hidden">
                        <input type="text" class="form-control" id="q_${number}_inserttime" value="${inserttime}" style="display:none" type="hidden">
                        <input type="text" class="form-control" id="q_${number}_modifytime" value="${modifytime}" style="display:none" type="hidden">
                    </div>
                </div>
            </div>
            <div id="q_${number}_body_mult" class="card-body">
                <label class="col-form-label">객관식 타입</label>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_type_mult_1" name="q_${number}_radio_mult_type" value="0">
                    <label for="q_${number}_type_mult_1" class="custom-control-label">일반</label>
                </div>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_type_mult_2" name="q_${number}_radio_mult_type" value="1" checked>
                    <label for="q_${number}_type_mult_2" class="custom-control-label">커스텀</label>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a1" class="col-sm-1 col-form-label">A1</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a1" value="${ssQ1}" >
                    </div>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a2" class="col-sm-1 col-form-label">A2</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a2" value="${ssQ2}" >
                    </div>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a3" class="col-sm-1 col-form-label">A3</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a3" value="${ssQ3}" >
                    </div>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a4" class="col-sm-1 col-form-label">A4</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a4" value="${ssQ4}" >
                    </div>
                </div>
                <div class="form-group row">
                    <label for="q_${number}_input_a5" class="col-sm-1 col-form-label">A5</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_input_a5" value="${ssQ5}" >
                    </div>
                </div>
            </div>
        </div>
    </li>
    `;
    return htmlchild;
}


<!--// 문항추가 클릭시 HTML 태그 생성 (주관식)-->
function addQuestion3(number, seq, sscontent, sspk, smpkfk, inserttime, modifytime) {
    var htmlchild = `
    <li id="q_${number}" class="card card-primary card-outline">
        <input type="hidden" value="${number}">
        <a class="d-block w-100 collapsed" data-toggle="collapse" href="#collapse${number}" aria-expanded="false">
            <div class="card-header">
                <h4 class="card-title" style="display:inline;">
                    [${seq}번 질문]
                </h4>
                <h4 id="q_${number}_toptitle" class="card-title abbwords" style="display:inline;">
                        ${sscontent}
                </h4>

            </div>
        </a>

        <div id="collapse${number}" class="collapse" data-parent="#accordion">
            <button type="button" class="btn btn-danger btn-xs btn-primary" style="float: right;" onclick="removeQ(${number})">
                <input id="q_${number}_sspk" value="${sspk}" type="hidden">
                <input id="q_${number}_smpkfk" value="${smpkfk}" type="hidden">
                <input id="q_${number}_content" value="${sscontent}" type="hidden">
                <i class="far fa-minus-square"></i>
            </button>
            <div class="card-body">
                <label class="col-form-label">문항 타입</label>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_mult" name="q_${number}_radio_type" value="0">
                    <label for="q_${number}_mult" class="custom-control-label">객관식</label>
                </div>
                <div class="custom-control custom-radio">
                    <input class="custom-control-input" type="radio" id="q_${number}_short" name="q_${number}_radio_type" value="1" checked>
                    <label for="q_${number}_short" class="custom-control-label">주관식</label>
                </div>
            </div>
            <div class="card-body">
                <div class="form-group row">
                    <label for="q_${number}_title" class="col-sm-1 col-form-label">질문</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="q_${number}_title" value="${sscontent}">
                        <input type="text" class="form-control" id="q_${number}_pk" value="${sspk}" style="display:none" type="hidden">
                        <input type="text" class="form-control" id="q_${number}_fk" value="${smpkfk}" style="display:none" type="hidden">
                        <input type="text" class="form-control" id="q_${number}_inserttime" value="${inserttime}" style="display:none" type="hidden">
                        <input type="text" class="form-control" id="q_${number}_modifytime" value="${modifytime}" style="display:none" type="hidden">
                    </div>
                </div>
            </div>
            <div id="q_${number}_body_mult" class="card-body">
        </div>
    </li>
    `;
    return htmlchild;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////