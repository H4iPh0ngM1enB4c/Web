let counter = 0;
let counter2 = 0;

//Static
const birthdayString = "Birthday: June 1, 2011";
const celebrateString = "Thanks everyone for visiting!"
const contactmethod = "Contact me through Discord: @Slowmotion.0";

//Countdown
const birthdayMonth = 6;
const birthdayDay = 1;
const birthYear = 2011;
const today = new Date();
const dayoftoday = new Date().getDate;
const monthoftoday = new Date().getMonth;
const currentYear = today.getFullYear();

var radio = null;
var radioPlayingSong = null;

var radioIsLoading = false;

let nextBirthday = new Date(currentYear, birthdayMonth - 1, birthdayDay);
if (today > nextBirthday) {
    nextBirthday = new Date(currentYear + 1, birthdayMonth - 1, birthdayDay);
}

const timeDifference = nextBirthday - today;
const daysUntilBirthday = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

const nextAge = nextBirthday.getFullYear() - birthYear;


//Event
document.addEventListener('DOMContentLoaded', function() {
    if (dayoftoday == birthdayDay && monthoftoday == birthdayMonth) document.getElementById('countdown').textContent = celebrateString;
    else document.getElementById('countdown').textContent = birthdayString;

    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', function(event) {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.shiftKey && event.key === 'C') || (event.ctrlKey && event.key === 'U')) {
            event.preventDefault();
        }
    });
    
    //Status
    fetch('https://api.lanyard.rest/v1/users/727497287777124414')
        .then(response => response.json())
        .then(data => {
            const status = data.data.discord_status;
            const statusElement = document.getElementById('bio-status');
            
            // Set the text based on status
            statusElement.textContent = '●';
            
            // Remove any existing status classes
            statusElement.classList.remove('online', 'idle', 'dnd', 'offline');

            console.log(status);
            
            // Add class based on the status
            switch (status) {
                case 'online':
                    statusElement.classList.add('online');
                    break;
                case 'idle':
                    statusElement.classList.add('idle');
                    break;
                case 'dnd':
                    statusElement.classList.add('dnd');
                    break;
                case 'offline':
                    statusElement.classList.add('offline');
                    break;
                default:
                    statusElement.classList.add('offline'); // Default to offline
            }
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById('bio-status').textContent = '⚠︎';
        });

    setInterval(change, 5000);
    // setInterval(changemethod, 5000);

    setInterval(setRadioText, 500);

    let a = new EventSource("https://api.zeno.fm/mounts/metadata/subscribe/fikggbpoi71vv");
    a.onmessage = function(t) {
        let e = JSON.parse(t.data);
        if (e.streamTitle) {
            radioPlayingSong = e.streamTitle;
        }
    }
});

