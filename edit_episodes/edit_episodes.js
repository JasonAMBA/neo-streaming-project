$.ajax({
    url: "../edit_arcs/edit_arcs.php",
    type: "GET",
    data: {
        choice: "select"
    },
    dataType: "json",
    success: (res, status) => {
        if (res.success) {
            let AllArc;

            res.arcs.forEach(arc => {
                AllArc += "<option value ='" + arc.id_arc + "'>" + arc.name_arc + "</option>";
            });

            $('#arc').append(AllArc);
        }
    }
})

$.ajax({
    url: "edit_episodes.php",
    type: "GET",
    data: {
        choice: 'select'
    },
    dataType: "json",
    success: (res, status) => {
        if (res.success) {
            let html = '';

            res.episodes.forEach(episode => {
                html += "<tr id='tr-" + episode.id_episode + "'>" +
                    "<td>" + episode.number_episode + "</td>" +
                    "<td>" + episode.titre_episode + "</td>" +
                    "<td>" + "<video controls src='" + "../mangas/" + episode.video + "'>" + "</video>" + "</td>" +
                    "<td>" + episode.arc + "</td>" +
                    "<td>" + "<img src='" + "../mangas/" + episode.manga + "'>" + "</td>" +
                    "<td><button onclick='wantToDelete(" + episode.id_episode + ", \"" + episode.titre_episode + "\")'>Supprimer</button></td>" +
                    "</tr>";
            });

            $('table').append(html);
        } else $("#error").html(res.msg)
    }
})

$("input:submit").click((e) => {

    const id = $("#id_episode").val();
    const number = $("#number").val();
    const name = $("#name").val();
    const video = $("#video").val();
    const arc = $("#arc").val();

    insertEps(number, name, video, arc);
});

function insertEps(number, name, video, arc) {
    $.ajax({
        url: "edit_episodes.php",
        type: "POST",
        data: {
            choice: 'insert',
            number,
            name,
            video,
            arc
        },
        dataType:"json",
        success: (res, status) => {
            if (res.success) {
                const newEps = "<tr id='tr-" + res.newid + "'>" +
                    "<td>" + number + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td><video controls src='" + video + "'> "+" </video> "+" </td>" +
                    "<td>" + arc + "</td>" +
                    "<td><button onclick='wantToDelete(" + res.newid + ", " + episode.titre_episode + ")'>Supprimer</button></td>" +
                    "</tr>";

                $('table').append(newEps);
            } else $("#error").html(res.msg);

            document.querySelector('form').reset();
        }
    })
};

function wantToDelete(id, name) {
    const wantTo = confirm("Supprimer" + name + "?");

    if (wantTo) {
        $.ajax({
            url: "edit_episodes.php",
            type: "POST",
            data: {
                choice: 'delete',
                id
            },
            dataType: "json",
            success: (res, status) => {
                if (res.success) {
                    $("#tr-" + id).remove();
                } else $("#error").html(res.msg);
            }
        });
    }
}