$("input:submit").click((e) => {
    

    const id = $("#id_manga").val();
    const name = $("#name").val();
    const summary = $("#summary").val();
    const logo = $("#logo").val();
    const author = $("#author").val();
    const release = $("#release").val();
    const number_episodes = $("#number_episodes").val();
    const number_arcs = $("#number_arcs").val();

    if (id != '') updateManga(id, name, summary, logo, author, release, number_episodes, number_arcs);
    else insertManga(name, summary, logo, author, release, number_episodes, number_arcs);
});

$.ajax({
    url: "edit_mangas.php",
    type: "GET",
    data: {
        choice: 'select'
    },
    dataType: 'json',
    success: (res, status) => {
        if (res.success) {
            let html = '';

            res.mangas.forEach(manga => {
                html += "<tr id='tr-" + manga.id_manga + "'>" +
                    "<td>" + manga.name + "</td>" +
                    "<td>" + manga.summary + "</td>" +
                    "<td>" + "<img src='" + "../mangas/" + manga.logo + "'>" + "</td>" +
                    "<td>" + manga.author + "</td>" +
                    "<td>" + manga.release_date + "</td>" +
                    "<td>" + manga.number_episodes + "</td>" +
                    "<td>" + manga.number_arcs + "</td>" +
                    "<td><button onclick='wantToUpdate(" + manga.id_manga + ")'>Modifier</button></td>" +
                    "<td><button onclick='wantToDelete(" + manga.id_manga + ", \"" + manga.name + "\")'>Supprimer</button></td>" +
                    "</tr>";
            });

            $('table').append(html);
        } else $("#error").html(res.msg)
    }
});

function insertManga(name, summary, logo, author, release, number_episodes, number_arcs) {
    $.ajax({
        url: "edit_mangas.php",
        type: "POST",
        data: {
            choice: 'insert',
            name,
            summary,
            logo,
            author,
            release,
            number_episodes,
            number_arcs
        },
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                const newManga = "<tr id='tr-" + res.newid + "'>" +
                    "<td>" + name + "</td>" +
                    "<td>" + summary + "</td>" +
                    "<td><img src='" + logo + "'></td>" +
                    "<td>" + author + "</td>" + 
                    "<td>" + release + "</td>" + 
                    "<td>" + number_episodes + "</td>" + 
                    "<td>" + number_arcs + "</td>" + 
                    "<td><button onclick='wantToUpdate(" + res.newid + ")'>Modifier</button></td>" +
                    "<td><button onclick='wantToDelete(" + res.newid + ", " + manga.name + ")'>Supprimer</button></td>" +
                    "</tr>";
                $('table').append(newManga);
            } else $("#error").html(res.msg);

            document.querySelector('form').reset();
        }
    });
}

function wantToUpdate(id) {
    $("#cancelUpdate").show();

    $.ajax({
        url: "edit_mangas.php",
        type: "GET",
        data: {
            choice: 'select_id',
            id
        },
        dataType: "json",
        success: (res, status) => {
            if (res.success) {
                $("#id_manga").val(res.manga.id_manga);
                $("#name").val(res.manga.name);
                $("#summary").val(res.manga.summary);
                $("#logo").val(res.manga.logo);
                $("#author").val(res.manga.author);
                $("#release").val(res.manga.release_date);
                $("#number_episodes").val(res.manga.number_episodes);
                $("#number_arcs").val(res.manga.number_arcs);
            }
        }
    })
}

function updateManga(id, name, summary, logo, author, release, number_episodes, number_arcs) {
    $.ajax({
        url: "edit_mangas.php",
        type: "POST",
        data: {
            choice: 'update',
            id,
            name,
            summary,
            logo,
            author,
            release,
            number_episodes,
            number_arcs
        },
        dataType: 'json',
        success: (res, status) => {
            if (res.success) {
                const updateManga = "<td>" + name + "</td>" +
                    "<td>" + summary + "</td>" + 
                    "<td>" + "img src='" + "../mangas/" + logo + "'>" + "</td>" +
                    "<td>" + author + "</td>" +
                    "<td>" + release + "</td>" +
                    "<td>" + number_episodes + "</td>" +
                    "<td>" + number_arcs + "</td>" + 
                    "<td><button onclick='wantToUpdate(" + id + ")'>Modifier</button></td>" +
                    "<td><button onclick='wantToDelete(" + id + ", " + name_manga + ")'>Supprimer</button></td>";
                $('#tr-' + id).html(updateManga);
            } else $("error").html(res.msg);

            document.querySelector('form').reset();
        }
    });
}

$("#cancelUpdate").hide();

$("#cancelUpdate").click((e) => {
    e.preventDefault();

    document.querySelector('form').reset();
    $("#cancelUpdate").hide();
})

function wantToDelete(id, name) {
    const wantTo = confirm("Supprimer le manga" + name + "?");

    if (wantTo) {
        $.ajax({
            url: "edit_mangas.php",
            type: "POST",
            data: {
                choice: 'delete',
                id
            },
            dataType: 'json',
            success: (res, status) => {
                if (res.success) {
                    $("#tr-" + id).remove();
                } else $("#error").html(res.msg);
            }
        });
    }
}

