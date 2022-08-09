function setOpenDoor(number) {
    swal({
        text: "선물함 문 상태를 '열림'으로 바꾸시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            let sendData = {
                "number" : number,
            }
            $.ajax({
                url      : "/cabinet/setOpenDoor",
                data     : sendData,
                type     : "GET",
                success: function (result) {
                    location.reload();
                },
                error:function(request,status,error){
                    swal("서버 오류입니다.", {
                        icon: "error",
                    });
                }
            });
        }
    });
}
function setCloseDoor(number) {
    swal({
        text: "선물함 문 상태를 '닫힘'으로 바꾸시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            let sendData = {
                "number" : number,
            }
            $.ajax({
                url      : "/cabinet/setCloseDoor",
                data     : sendData,
                type     : "GET",
                success: function (result) {
                    location.reload();
                },
                error:function(request,status,error){
                    swal("서버 오류입니다.", {
                        icon: "error",
                    });
                }
            });
        }
    });
}
function setInsertGoods(number) {
    swal({
        text: "상품 상태를 '있음'으로 바꾸시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            let sendData = {
                "number" : number,
            }
            $.ajax({
                url      : "/cabinet/setInsertGoods",
                data     : sendData,
                type     : "GET",
                success: function (result) {
                    location.reload();
                },
                error:function(request,status,error){
                    swal("서버 오류입니다.", {
                        icon: "error",
                    });
                }
            });
        }
    });
}
function setDeleteGoods(number) {
    swal({
        text: "상품 상태를 '없음'으로 바꾸시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            let sendData = {
                "number" : number,
            }
            $.ajax({
                url      : "/cabinet/setDeleteGoods",
                data     : sendData,
                type     : "GET",
                success: function (result) {
                    location.reload();
                },
                error:function(request,status,error){
                    swal("서버 오류입니다.", {
                        icon: "error",
                    });
                }
            });
        }
    });
}
