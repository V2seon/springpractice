let modifyArray = [];

function row_modify_state(obj){

    state = $(`#d${obj}`).val();

    if(state == "수정하기"){
        $(`#b${obj}`).removeAttr("readonly");
        $(`#c${obj}`).removeAttr("readonly");
        $(`#d${obj}`).val("저장하기");
        $(`#d${obj}`).text("저장하기");
        $(`#d${obj}`).removeClass("btn btn-success");
        $(`#d${obj}`).addClass("btn btn-primary");
    }
    else if(state == "저장하기"){
//        $(`#b${obj}`).attr('readonly', "readonly");
//        $(`#c${obj}`).attr('readonly', "readonly");
//        $(`#d${obj}`).val("수정하기");
//        $(`#d${obj}`).text("수정하기");
//        $(`#d${obj}`).removeClass("btn btn-primary");
//        $(`#d${obj}`).addClass("btn btn-success");

        const TSL_PK = $(`#a${obj}`).val();
        const TSL_LATITUDE = $(`#b${obj}`).val();
        const TSL_LONGITUDE = $(`#c${obj}`).val();

        const info = {
            'TSL_PK' : TSL_PK,
            'TSL_LATITUDE' : TSL_LATITUDE,
            'TSL_LONGITUDE' : TSL_LONGITUDE
        };

        modifyArray.push(info);
        console.log(modifyArray);

            $.ajax({
                url      : "/treasurehunt/location_modify",
                data     : JSON.stringify(modifyArray),
                type     : "POST",
                dataType:'text',
                contentType:'application/json;',
                success : function(result) {
                    location.href = "/treasurehunt/location";
                },
                error:function(request,status,error){
                    swal({
                        text: "보물 위치 설정 수정 도중 문제가 발생하여 실패했습니다.",
                        icon: "warning" //"info,success,warning,error" 중 택1
                    });
                }
            });

    }
}

//let modify_length = 0;
//modify_length = $('#length').val();

//function button_state(){
//    let count = 0;
//    for (let i = 0; i < modify_length; i++){
//        const state = $(`#d${i+1}`).val();
//            if(state == "저장하기"){
//                count ++;
//            }
//    }
//    console.log(count);
//        if(count >= 1){
//            swal({
//                text: "각 행별로 모두 저장하기 버튼을 누른 다음 다시 시도하세요.",
//                icon: "warning" //"info,success,warning,error" 중 택1
//            });
//            return false;
//        }
//        else{
//            location_modify()
//        }
//
//}
//
//
//function location_modify(){
//
//    for (let i = 0; i < modify_length; i++){
//        const TSL_PK = $(`#a${i+1}`).val();
//        const TSL_LATITUDE = $(`#b${i+1}`).val();
//        const TSL_LONGITUDE = $(`#c${i+1}`).val();
//
//        const info = {
//            'TSL_PK' : TSL_PK,
//            'TSL_LATITUDE' : TSL_LATITUDE,
//            'TSL_LONGITUDE' : TSL_LONGITUDE
//        };
//
//        modifyArray.push(info);
//
//    }
//
//    console.log(modifyArray);
//
//                $.ajax({
//                    url      : "/treasurehunt/location_modify",
//                    data     : JSON.stringify(modifyArray),
//                    type     : "POST",
//                    dataType:'text',
//                    contentType:'application/json;',
//                    success : function(result) {
//                        location.href = "/treasurehunt/location";
//                    },
//                    error:function(request,status,error){
//                        swal({
//                            text: "보물 위치 설정 수정 도중 문제가 발생하여 실패했습니다.",
//                            icon: "warning" //"info,success,warning,error" 중 택1
//                        });
//                    }
//                });
//
//}