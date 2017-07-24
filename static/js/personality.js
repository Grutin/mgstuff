// this handles the tab interactions on personality.html

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// this handles the chart display

function dataToChart(data_dict) {
    document.addEventListener("DOMContentLoaded", function(event) {

        // start by making a list of all the ids (corresponding to all the graphs)
        id_list = []
        for (var key in data_dict) {
            id_list.push(key);
        }

        // iterate over the list of ids to build each chart
        for (var i=0; i < id_list.length; i++ ) {

            labels_list = [];

            // this switch helps build the list for labels of the chart (labels_list)
            switch(id_list[i]) {
                case "personality": labels_list = ["openness","conscientiousness","extraversion","agreeableness","emotional_range"]; break;
                case "needs": labels_list = ["challenge","closeness","curiosity","excitement","harmony","ideal","liberty","love","practicality","self_expression","stability","structure"];  break;
                case "values": labels_list = ["conservation","openness_to_change","hedonism","self_enhancement","self_transcendence"];  break;
                case "Openness": labels_list = ["adventurousness","artistic_interests","emotionality","imagination","intellect","liberalism"];  break;
                case "Conscientiousness": labels_list = ["achievement_striving","cautiousness","dutifulness","orderliness","self_discipline","self_efficacy"];  break;
                case "Extraversion": labels_list = ["activity_level","assertiveness","cheerfulness","excitement_seeking","outgoing","gregariousness"];  break;
                case "Agreeableness": labels_list = ["altruism","cooperation","modesty","uncompromising","sympathy","trust"];  break;
                case "Emotional_range": labels_list = ["anger","anxiety","depression","immoderation","self_consciousness","susceptible_to_stress"];  break;
            }

        // now compile all the data in the graph

            var ctx = document.getElementById(id_list[i]).getContext('2d');
            var myChart = new Chart(ctx, {
              type: 'radar',
              data: {
                scaleOverride: true,
                scaleSteps: 5,
                scaleStepWidth: 0.2,
                scaleStartValue: 0,
                labels: labels_list,
                datasets: [{
                    label: "Your personality scores",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    data: data_dict[id_list[i]][0]
                },
                {
                    label: "Where you rank in percentile",
                    backgroundColor: "rgba(220,220,220,0.2)",
                    data: data_dict[id_list[i]][1]
                }
                ]
              }
            });

        }

    });
}

function checkButton() {
    console.log("function checkbutton() triggered");
    // check if there is text in the text field. if there is, take it, if there isn't, take document attached.
    var textInput = document.getElementById("text_input_field").innerHTML;
    if (textInput !== "") {
        XHR_send(textInput);
    } else { // there must be a file attached, so send this
        var file = document.getElementById('fileItem').files[0];
        XHR_send(file);
    }
}

// this handles the file upload
function XHR_send(input) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'myservice/username?id=some-unique-id');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200 && xhr.responseText !== newName) {
            alert('Something went wrong.  Name is now ' + xhr.responseText);
        }
        else if (xhr.status !== 200) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(encodeURI('name=' + input));
}

// this handles the status of the button "send" to submit text
$(document).ready(function() {
     $(':input[type="submit"]').prop('disabled', true);

     // this handles the text area
     $('input[type="text"]').keyup(function() {
        if($(this).val() != '') {
           $(':input[type="submit"]').prop('disabled', false);
        } else { // if there was text that's been removed
            if (!$('input[type="file"]').val()) { // and if there is no file in upload button
                $(':input[type="submit"]').prop('disabled', true);
            }
        }
     });

     // this handles the file upload field

     $('input[type="file"]').change(
        function(){
            if ($(this).val()) {
                $(':input[type="submit"]').prop('disabled', false);

            } else { // if there was a file but it's been removed
                if ($(':input[type="text"]') == '') { // if the text area is also empty
                    $(':input[type="submit"]').prop('disabled', true);
                }
            }
        }
     );
 });
