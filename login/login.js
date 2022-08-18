$("#connection").click((e) => {
    e.preventDefault();

    const pseudo = $("#pseudo").val();
    const pwd = $("#pwd").val();

    $.ajax({
        url: "login.php",
        type: "POST",
        data: {
            pseudo,
            pwd
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                if (res.user.is_admin == 1) {
                    localStorage.setItem('user', JSON.stringify(res.user));
                    const test = JSON.parse(localStorage.getItem('user'));
                    window.location.replace("../admin/admin.html");
                } else {
                    localStorage.setItem('user', JSON.stringify(res.user));
                    const test = JSON.parse(localStorage.getItem('user'));
                    window.location.replace("../homepage/homepage.html");
                }
            } else alert("Login ou mot de passe erroné");
        }
    })
})