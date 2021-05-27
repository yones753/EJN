


const myURL = 'http://localhost:3000/'

const PlayersManager = function () {

    const getPlayers = function () {
        if (input.val() == "") {alert("Please add input !") } 
        else { 
             $.get(`${myURL}teams/${input.val()}`, function (players) {
                input.val("")
                render.renderPlayers(players)
            })
        }
    }

    const getMoreInfo = function (btn) {
        let fullName = $(btn).closest('.card').find('.card-header').text()
        let selector = $(btn).closest('.card').find('.divImg')
        let arr = fullName.split(" ");
        $.get(`/playerStats/${arr[1]}/${arr[0]}`, function(playersStats) {
            render.renderInfo(selector ,playersStats)
        }
     )
    }

    const getDreamTeam = function () {
        $.get('/dreamTeam',function(dreamTeam){
            idcardsElement.empty()
            if(dreamTeam.length === 0){
                $('.idcards').append(`<h2>You don't have players</h2>`)
            }else{
                render.renderPlayers(dreamTeam)
            }
        })
    }

    const addPlayertoDreamTeam = function () {
        personId = $(event.target).closest('div').attr('id')
        $.post(`roster/${personId}`,function(msg){
            alert(msg)
        })
    }

    const deletePlayertoDreamTeam = function () {
        personId = $(event.target).closest('div').attr('id')
        $.delete('/roster/:personId', function(msg){
            alert(msg)
        })
    }

    return {
        getPlayers: getPlayers,
        getDreamTeam: getDreamTeam,
        addPlayertoDreamTeam: addPlayertoDreamTeam,
        getMoreInfo: getMoreInfo,
        deletePlayertoDreamTeam,deletePlayertoDreamTeam

    }
}