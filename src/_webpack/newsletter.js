import $ from 'cash-dom';
import Mailin from 'sendinblue-api';

var client = new Mailin("https://api.sendinblue.com/v2.0", "TrbXwJjMVZBz8HUD", 5000);    //Optional parameter: Timeout in MS
client.get_account().on('complete', function(data) {
    console.log(data);
});
