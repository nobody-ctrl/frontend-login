$( document ).ready(function() {
    $("#btn").click(
        function(){
            sendAjaxForm('http://5.187.6.96:3000/auth/login');
            return false; 
        }
    );
});


function sendAjaxForm(url) {
    $("#alert").removeClass("hidden");
    var elements = document.getElementById("ajax_form").elements;
    var obj ={};
    for(var i = 0 ; i < 2 ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    var formData = JSON.stringify(obj);

    jQuery.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        contentType: "application/json",
        dataType: "json", //формат данных
        data: formData,  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
            alert('Setting web token and redirecting you!')
            localStorage.setItem('tokem', response.token);
        },
        error: function(response) { // Данные не отправлены
            if ($('#alert').hasClass('alert-success')){
                $("#alert").removeClass("alert-success");
            }
            $("#alert").addClass("alert-danger");
            var msg = JSON.parse(response.responseText);
            $("#alert").html(msg.error.message);
            console.log(response);
        }
    });
}
