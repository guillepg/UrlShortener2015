$(document).ready(
    function() {
        $("#shortener").submit(
            function(event) {

                $.ajax({
                    url: 'www.google.com',
                    success: function(result){
                        alert('reply');
                    },
                    error: function(result){
                        alert('timeout/error');
                    }
                });


                event.preventDefault();
                $.ajax({
                    type : "POST",
                    url : "/link",
                    data : $(this).serialize(),
                    success : function(msg) {
                        $("#result").html(
                            "<div class='alert alert-success lead'><a target='_blank' href='"
                            + msg.uri
                            + "'>"
                            + msg.uri
                            + "</a></div>");
                    },
                    error : function() {
                        $("#result").html(
                                "<div class='alert alert-danger lead'>ERROR</div>");
                    }
                });
            });
    });