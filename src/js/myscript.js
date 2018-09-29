










function edit_profile() {
    $('#save_chg').parent().show();
   /* $('#edit_btn').click().hide();*/
    $('#edit_btn').hide();
    $('#next_btn').hide();

    $('input[type="text"]').removeAttr('disabled');
    $('input[type="checkbox"]').removeAttr('disabled');
    $('select').removeAttr('disabled');
  }


        /*------------------script for disable text start------------------------*/
       
         
        /*------------------script for disable text end------------------------*/

        $(document).ready(function(){
        $('#delete_service').click(function(){
            alert("are you sure you want to delete Service");
        });
        });


        /*add new services*/
        $(document).ready(function(){
        

        $("#add_new_service").click(function(){
            $('#newdiv').prepend("Appended item");
        });
        });




  /*-------------------include myscrip file---------------------*/