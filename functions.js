let urlParams = new URLSearchParams(window.location.search)

function getSites() {
    return sites
}

function getReferringSite() {
    if (urlParams.has('referrer')) {
        return 'https://' + urlParams.get('referrer');
    } else if (document.referrer !== '') {
        return 'https://' + new URL(document.referrer).host
    }

    return getRandomSite()
}

function getNextSite() {
    var index = sites.findIndex(element => element.url === getReferringSite())
    var site = sites[index + 1] ?? sites[0]

    return site.url
}

function getPreviousSite() {
    var index = sites.findIndex(element => element.url === getReferringSite())
    var site = (index - 1) < 0 ? sites[sites.length - 1] : sites[index - 1]

    return site.url
}

function getRandomSite() {
    return sites[Math.floor(Math.random() * sites.length)].url
}

function getCounterStats() {
    fetch('https://app.usefathom.com/vip/jack-mcdade')
        .then(response => response.json())
        .then(function(data) {
            document.querySelectorAll('#hit-counter')[0].innerHTML = zeroPad(data, 7);
        })
}

getCounterStats()

const zeroPad = (num, places) => String(num).padStart(places, '0')
