var index = 0,
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
    station_name.innerHTML = radios[index].station_name;

    stream_url = document.getElementById("rp-stream-url");
    stream_url.src = radios[index].stream_url;
}

/* bind arrow keys */
document.onkeydown = function(event) {
    event = event || window.event;
    switch (event.keyCode || event.which) {
        case 37: // left
            changeChannel(0);
        break;

        case 38: // up
        break;

        case 39: // right
            changeChannel(1);
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
};

function changeChannel(_index) {
	if (_index == 0) {
		if (hasRadio(index - 1)) {
			index = index - 1;
		}
	} else if (_index == 1) {
		if (hasRadio(index + 1)) {
			index = index + 1;
		}
	}

	station_name.innerHTML = radios[index].station_name;
	stream_url.src = radios[index].stream_url;
    stream_url.play();
}

function hasRadio(_index) {
	if (!(typeof radios[_index] == 'undefined')) {
		return true;
	} return false;
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
