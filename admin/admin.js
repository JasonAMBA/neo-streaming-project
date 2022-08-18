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