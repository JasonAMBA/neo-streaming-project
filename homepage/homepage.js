$('#deco').click((e) => {
    e.preventDefault();
    $.ajax({
        url: "../logout/logout.php",
        type: "GET",
        data: {

        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                localStorage.removeItem('user');
                window.location.replace("../homepage/homepage.html")
            } else alert("erreur")
        }
    })
})

if (localStorage.getItem('user')) {
    $('#deco').css("display", "block");
} else $('#deco').css("display", "none");

if (localStorage.getItem('user')) {
    $('#register').css("display", "none");
} else $('#register').css("display", "block");

if (localStorage.getItem('user')) {
    $('#login').css("display", "none");
} else $('#login').css("display", "block");

$.ajax({
    url: "../edit_mangas/edit_mangas.php",
    type: "GET",
    data: {
        choice: 'select'
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let html = '';

            res.mangas.forEach(manga => {
                html += "<div>" +
                    "<a href='../manga/manga.html?id=" + manga.id_manga + "'>" + "<img src='" + "../mangas/" + manga.logo + "'>" + "</a>" +
                    "</div>"
            });

            $('#manga').append(html);
        } else $("#error").html(res.msg)
    }
});

$.ajax({
    url: "../watch/watch.php",
    type: "GET",
    data: {
        choice: 'select_id'
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let hist = '';

            res.ids.forEach(id => {
                hist += "<a href='../watch/watch.html?id=" + id.id_user + "'>" + "<h2> Historique </h2>" + "</a>"
            });

            $('#historical').append(hist);
        } else alert("erreur lors de l'ajout de l'historique !")
    }
});

if (localStorage.getItem('user')) {
    $('#historical').css("display", "block");
} else $('#historical').css("display", "none");

if (localStorage.getItem('user')) {
    $('#condition').css("display", "none");
} else $('#condition').css("display", "block");

if (localStorage.getItem('user')) {
    $('#manga').css("display", "block");
} else $('#manga').css("display", "none");

$.ajax({
    url: "../update_user/update_user.php",
    type: "GET",
    data: {
        choice: 'select'
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let info = '';

            res.users.forEach(user => {
                info += "<a href='../update_user/update_user.html?id=" + user.id_user + "'>" + "<h2> Modifier vos informations </h2>" + "</a>"
            });

            $('#update').append(info);
        } else $("#error").html(res.msg)
    }
});