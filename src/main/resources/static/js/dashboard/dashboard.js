function log0(){
    var day_string = $('#type0').val();
    var day_strings = day_string.split('/');
    var type0 = "type0";
    var year = day_strings[0];
    var month = day_strings[1];
//    var month = month_temp.substring[1];
    console.log(year);
    console.log(month);

    var paramiters = {
//        'type0': type0,
        'year': year,
        'month': month
    }
    $.ajax({
        url      : "/log0",
        data     : paramiters,
        type     : "POST",
        success : function(result) {
        console.log(result);
        console.log(result[0]);
                $("#month0").text(result[0]+"월 신규 유저 (주)");
                $("#new_users_count_week_1").text(result[1]+"명");
                $("#new_users_count_week_2").text(result[2]+"명");
                $("#new_users_count_week_3").text(result[3]+"명");
                $("#new_users_count_week_4").text(result[4]+"명");
                $("#new_users_count_week_5").text(result[5]+"명");
        }
    });

}