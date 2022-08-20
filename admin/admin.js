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

$('button').click(() => {
    $('aside, #overlay').addClass('open');
});

$('#overlay').click(() => {
    $('aside, #overlay').removeClass('open');
})

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