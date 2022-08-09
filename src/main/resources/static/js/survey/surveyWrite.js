const accordion = document.getElementById("accordion");
const btnAddQuestion = document.getElementById("btnAddQuestion");
const btnSurveyRegist = document.getElementById("btnSurveyRegist");

let num = 1;

// 설문 등록 리스너
btnSurveyRegist.addEventListener("click", () => {
    let questCount = 0;
    let questArray = [];
    const surveyTitle = $('#serveyTitle').val();
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
                url      : "/survey/surveywrite"+"?"+"surveyTitle="+surveyTitle,
                data     : JSON.stringify(questArray),
                type     : "POST",
                dataType:'text',
                contentType:'application/json;',
                success : function(result) {
//                    if(result.loginResult == "1"){
                        location.href = "/survey/list";
//                    }else if(result.loginResult == "0"){
//                        swal({
//                            text: "계정 정보가 일치하지 않습니다.",
//                            icon: "error"
//                        });
//                    }
                },
                error:function(request,status,error){
                    swal({
                        text: "로그인 도중 서버에 문제가 발생했습니다.",
                        icon: "warning" //"info,success,warning,error" 중 택1
                    });
                }
            });
        }
        console.log("questArray : ", questArray);
    }
    
});

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
    });
}


// 문항 삭제 기능
function removeQ(number) {
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
