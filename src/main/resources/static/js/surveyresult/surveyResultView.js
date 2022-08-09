let questCount = 0;
num = 1;

for (var i=0; i < qqqe.length; i++){
    let SS_PK = "";
    let SM_PK_FK = "";
    let SS_SEQ = "";
    let SS_CONTENT = "";
    let SS_TYPE = "";
    let SS_Q1 = "";
    let SS_Q2 = "";
    let SS_Q3 = "";
    let SS_Q4 = "";
    let SS_Q5 = "";
    let SRS_PK = "";
    let srmPkFk = "";
    let smPkFkFk = "";
    let SRS_SEQ = "";
    let SRS_ANSWER = "";

    if(qqqe[i].ss_TYPE == 0){
        SS_PK = qqqe[i].ss_PK;
        SM_PK_FK = qqqe[i].ss_PK_FK;
        SS_SEQ = qqqe[i].ss_SEQ;
        SS_CONTENT = qqqe[i].ss_CONTENT;
        SS_TYPE = qqqe[i].ss_TYPE;
        SS_Q1 = qqqe[i].ss_Q1;
        SS_Q2 = qqqe[i].ss_Q2;
        SS_Q3 = qqqe[i].ss_Q3;
        SS_Q4 = qqqe[i].ss_Q4;
        SS_Q5 = qqqe[i].ss_Q5;
        SRS_PK = qqqe[i].srs_PK;
        srmPkFk = qqqe[i].srmPkFk;
        smPkFkFk = qqqe[i].smPkFkFk;
        SRS_SEQ = qqqe[i].srs_SEQ;
        SRS_ANSWER = qqqe[i].srs_ANSWER;

        if ($('#accordion').children()) {
            questCount = $('#accordion').children().length;
         }
        questCount++;
        $('#accordion').append(addQuestion2(num, SS_SEQ, SS_CONTENT, SS_Q1, SS_Q2, SS_Q3, SS_Q4, SS_Q5, SRS_ANSWER));
        num++;
    }

    else{
        SS_PK = qqqe[i].ss_PK;
        SM_PK_FK = qqqe[i].ss_PK_FK;
        SS_SEQ = qqqe[i].ss_SEQ;
        SS_CONTENT = qqqe[i].ss_CONTENT;
        SS_TYPE = qqqe[i].ss_TYPE;
        SS_Q1 = qqqe[i].ss_Q1;
        SS_Q2 = qqqe[i].ss_Q2;
        SS_Q3 = qqqe[i].ss_Q3;
        SS_Q4 = qqqe[i].ss_Q4;
        SS_Q5 = qqqe[i].ss_Q5;
        SRS_PK = qqqe[i].srs_PK;
        srmPkFk = qqqe[i].srmPkFk;
        smPkFkFk = qqqe[i].smPkFkFk;
        SRS_SEQ = qqqe[i].srs_SEQ;
        SRS_ANSWER = qqqe[i].srs_ANSWER;
        if ($('#accordion').children()) {
            questCount = $('#accordion').children().length;
        }
        questCount++;
        $('#accordion').append(addQuestion3(num, SS_SEQ, SS_CONTENT, SRS_ANSWER));
        num++;
    }
console.log(qqqe[i]);

}


function addQuestion2(num, SS_SEQ, SS_CONTENT, SS_Q1, SS_Q2, SS_Q3, SS_Q4, SS_Q5, SRS_ANSWER) {
    var htmlchild = `
        <li class="card card-primary card-outline">
        <a class="d-block w-100" >
            <div class="card-header">
                <h4 class="card-title" style="display:inline;">
                    ${SS_CONTENT}
                </h4>
                <h4 class="card-title abbwords"
                    style="display:inline;">

                </h4>
            </div>
        </a>

        <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body">
                <div class="form-group row">
                    <label class="col-form-label">A1:</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q1}"
                               style="${SRS_ANSWER == 1 ? 'color:red; font-Weight:bold; font-style:italic;':''}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
                <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body">
                <div class="form-group row">
                    <label class="col-form-label">A2:</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q2}"
                               style="${SRS_ANSWER == 2 ? 'color:red; font-Weight:bold; font-style:italic;':''}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
                <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body">
                <div class="form-group row">
                    <label class="col-form-label">A3:</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q3}"
                               style="${SRS_ANSWER == 3 ? 'color:red; font-Weight:bold; font-style:italic;':''}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
                <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body">
                <div class="form-group row">
                    <label class="col-form-label">A4:</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q4}"
                               style="${SRS_ANSWER == 4 ? 'color:red; font-Weight:bold; font-style:italic;':''}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
                        <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body">
                <div class="form-group row">
                    <label class="col-form-label">A5:</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SS_Q5}"
                               style="${SRS_ANSWER == 5 ? 'color:red; font-Weight:bold; font-style:italic;':''}"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
    </li>

    `;
    return htmlchild;
}

function addQuestion3(num, SS_SEQ, SS_CONTENT, SRS_ANSWER) {
    var htmlchild = `
        <li class="card card-primary card-outline">
        <a class="d-block w-100" >
            <div class="card-header">
                <h4 class="card-title" style="display:inline;">
                    ${SS_CONTENT}
                </h4>
                <h4 class="card-title abbwords"
                    style="display:inline;">

                </h4>
            </div>
        </a>

        <div class="collapse show" data-parent="#accordion" style="">
            <div id="q_2_body_mult" class="card-body">
                <div class="form-group row">
                    <label class="col-form-label">A1:</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control"
                               value="${SRS_ANSWER}"
                               style="color:red; font-Weight:bold; font-style:italic;"
                               readonly="readonly">
                    </div>
                </div>
            </div>
        </div>
    </li>

    `;
    return htmlchild;
}