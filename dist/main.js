

const input = $("#input")
const idcardsElement = $(".idcards")

const playersManager = new PlayersManager()
const render = new Renderer()
 


$("#rosterBtn").on("click",function(){
    playersManager.getPlayers()
})

$("#dreamTeamBtn").on("click",function(){
    playersManager.getDreamTeam()
})

$("body").on("click",".addPlayer",function(){
    playersManager.addPlayertoDreamTeam()

})

$("body").on("click",".showInfo",function(){
    playersManager.getMoreInfo(this)
})





