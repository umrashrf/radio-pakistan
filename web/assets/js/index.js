var channel = 0,
    volume = 10,
    radios = [];

var station_name,
    stream_url;


loadJSON('data.json', onLoad, onFail);

function onFail() {
    alert('Could not load radio data. Please try again.');
}

function onLoad(data) {
    radios = data;

    station_name = document.getElementById("rp-station-name");
    station_name.innerHTML = radios[channel].station_name;

    stream_url = document.getElementById("rp-stream-url");
    stream_url.src = radios[channel].stream_url;
}

/* bind arrow keys */
document.onkeydown = function(event) {
    event = event || window.event;
    switch (event.keyCode || event.which) {
        case 37: // left
            changeChannel(0);
        break;

        case 38: // up
            changeVolume(1);
        break;

        case 39: // right
            changeChannel(1);
        break;

        case 40: // down
            changeVolume(-1);
        break;

        default: return; // exit this handler for other keys
    }
};

function changeChannel(ichannel) {
	if (ichannel == 0) {
		if (hasRadio(channel - 1)) {
			channel = channel - 1;
		}
	} else if (ichannel == 1) {
		if (hasRadio(channel + 1)) {
			channel = channel + 1;
		}
	}

	station_name.innerHTML = radios[channel].station_name;
	stream_url.src = radios[channel].stream_url;
    stream_url.play();
}

function hasRadio(ichannel) {
	if (!(typeof radios[ichannel] == 'undefined')) {
		return true;
	} return false;
}

function changeVolume(diff) {
    volume += diff;
    volume = Math.min(Math.max(0, volume), 10);
    stream_url.volume = volume / 10;
}

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
