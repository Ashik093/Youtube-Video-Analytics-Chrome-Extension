chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    },
    tabs => {
        let url = tabs[0].url
        let split = url.split('v=')
        split = split[1].split('&')
        getVideoDetails(split[0])
    }
)

function getVideoDetails(id) {
    let apiKey = "your api key";
    let restApi = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + apiKey + "&part=snippet,contentDetails,statistics,status";
    axios.get(restApi).then((res) => {
        let data = res.data
        $("#VideoTitle").html(data.items[0].snippet.title)
        $("#tags").val(data.items[0].snippet.tags)
        $("#thumbnailPreview").attr('src', data.items[0].snippet.thumbnails.medium.url)
        $("#Comments").html(data.items[0].statistics.commentCount)
        $("#Dislikes").html(data.items[0].statistics.dislikeCount)
        $("#Likes").html(data.items[0].statistics.likeCount)
        $("#Views").html(data.items[0].statistics.viewCount)

        let live = data.items[0].snippet.liveBroadcastContent == 'none' ? 'No' : 'Yes'
        let license = data.items[0].contentDetails.licensedContent == true ? 'Yes' : 'No'
        let child = data.items[0].status.madeForKids == false ? 'No' : 'Yes'

        $("#License").html(license)
        $("#Live").html(live)
        $("#Child").html(child)
        let earning = (parseFloat(data.items[0].statistics.viewCount) * 0.001).toFixed(2)
        $("#Earning").html('$' + earning)

        $('#maxBTN').on('click', function() {
            let maxres = data.items[0].snippet.thumbnails.maxres.url
                // window.open(maxres)
            forceDownload(maxres, 'maxres.jpg')
        })
        $('#standardBTN').on('click', function() {
            let standard = data.items[0].snippet.thumbnails.standard.url
                //window.open(standard)
            forceDownload(standard, 'standard.jpg')
        })
        $('#highBTN').on('click', function() {
            let high = data.items[0].snippet.thumbnails.high.url
                //window.open(high)
            forceDownload(high, 'high.jpg')
        })
        $('#MediumBTN').on('click', function() {
            let medium = data.items[0].snippet.thumbnails.medium.url
                //window.open(medium)
            forceDownload(medium, 'medium.jpg')
        })
    }).catch((error) => {

    })
}

function forceDownload(url, fileName) {
    chrome.downloads.download({
        url: url,
        filename: fileName,
        saveAs: true
    })
}