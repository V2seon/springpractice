const deletebtn = document.getElementById("deletebtn");
deletebtn.addEventListener("click", deletePost);

function deletePost(){
    var delete_index = $('#modal-delete').attr('name');
    var data = {
        "delete_index" : delete_index
    };
    $.ajax({
        url : "/delete",
        data:data,
        type:"POST",
        error:function(error){
            swal({
                title: "에러",
                text: "서버 에러로 삭제 실패",
                icon: "error"
            });
        },
        success:function(data){
            searching();
        }
        });
}