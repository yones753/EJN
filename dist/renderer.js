

class Renderer {
    constructor() {

    }
    renderPlayers = function (players) {
        idcardsElement.empty()
        if (typeof players === 'string') {
            idcardsElement.append(`
            <div moreInfoo>${players}</div>
            `)
        } else {
            const source = $('#player-template').html();
            const template = Handlebars.compile(source);
            const newHTML = template({ players });
            idcardsElement.append(newHTML);
        }
    }

    renderInfo = function (selector, playersStats) {
       
        $(selector).empty()
        $(selector).find('img').css('display', 'none')
        $(selector).append(`
        <div class="moreInfoo">Games_played : ${playersStats.games_played}</div>
        <div class="moreInfoo">Blocks_per_game: ${playersStats.blocks_per_game}</div>
        <div class="moreInfoo">Assists_per_game : ${playersStats.assists_per_game}</div>
        <div class="moreInfoo">Minutes_per_game : ${playersStats.minutes_per_game}</div>
        `);
    }

}

