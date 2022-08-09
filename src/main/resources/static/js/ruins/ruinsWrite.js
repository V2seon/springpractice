function submitInsert() {
    const ruinsName = $('#ruinsName').val();
    const ruinsCode = $('#ruinsCode').val();
    const ruinsExp = $('#ruinsExp').val();
    if (ruinsName === "" || ruinsName === null) {
        swal({
            text: "유적 이름을 입력하세요.",
            icon: "warning" //"info,success,warning,error" 중 택1
        });
        $('#ruinsName').focus();
        return false;
    }
    if (ruinsCode === "" || ruinsCode === null) { 
        swal({
            text: "유적 코드을 입력하세요.",
            icon: "warning" //"info,success,warning,error" 중 택1
        });
        $('#ruinsCode').focus();
        return false;
    }
    if (ruinsExp === "" || ruinsExp === null) { 
        swal({
            text: "유적 설명을 입력하세요.",
            icon: "warning" //"info,success,warning,error" 중 택1
        });
        $('#ruinsExp').focus();
        return false;
    }
}
