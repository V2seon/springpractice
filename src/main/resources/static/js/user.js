function deletePost(){
    var delete_index = $('#modal-delete').attr('name');
    var data = {
        "delete_index" : delete_index
    };
    $.ajax({
        url: "/delete",
        data: data,
        type: "POST",
        error: function(error){
            swal({
                title: "에러",
                text: "서버 에러로 삭제 실패",
                icon: "error"
            });
        },
        success: function(data){
            searching();
        }
    });
}

// 삭제버튼 누르면 경고창을 띄움
function passValue(obj){
$('#modal-delete').on('show.bs.modal', function(e){
    document.getElementById('modal-delete').setAttribute('name', obj);
    });
}