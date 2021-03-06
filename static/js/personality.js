// this handles the tab interactions on personality.html

function openTab(tab, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = [tab.parentNode.nextElementSibling, tab.parentNode.nextElementSibling.nextElementSibling];
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = tab.parentNode.children;
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    for (i = 0; i < tabcontent.length; i++) {
        if (hasClass(tabcontent[i],tabName)) {
            tabcontent[i].style.display = "block";
        }
    }
    tab.className += " active";
}

// just a helper function for above
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


// writes data into the 3 columns and the data menu

function dataToDataTab(data_dict) {
    document.addEventListener("DOMContentLoaded", function(event) {
        main_categories = ["personality","values","needs"];
        sub_categories = ["Openness","Conscientiousness","Extraversion","Agreeableness","Emotional_range"];
        three_col = document.getElementById("col-container").children;

        // iterate over the 3 columns / 3 main categories
        for (i = 0; i<main_categories.length; i++ ) {

            var new_ul = document.createElement("UL");
            labels_list = returnLabelList(main_categories[i]);
            // iterate over the labels
            for (var j = 0; j < labels_list.length; j++) {
                new_li = document.createElement("LI");
                new_text_node = document.createTextNode(labels_list[j]);
                new_title_div = document.createElement("DIV");
                new_li.appendChild(new_title_div);
                new_title_div.appendChild(new_text_node);

                // if the category is one of the big 5, add a chevron 
                if (main_categories[i] == "personality") {
                    var new_span = document.createElement("SPAN");
                    new_span.className = "glyphicon glyphicon-chevron-right";
                    new_title_div.appendChild(new_span);
                    // also make the title of the category clickable
                    new_title_div.setAttribute("data-toggle","collapse");
                    new_title_div.setAttribute("data-target","#" + labels_list[j]);

                }

                new_sub_li = document.createElement("LI");
                // generating the progress bars and values. the [1] below corresponds to getting percentiles instead of raw value.
                new_sub_progress_node = document.createElement("PROGRESS");
                new_sub_progress_node.className += "progress";
                new_sub_progress_node.max = 1;
                new_sub_progress_node.value = data_dict[main_categories[i]][1][j];
                new_sub_value_node = document.createElement("SPAN");
                new_sub_value_node.textContent = data_dict[main_categories[i]][1][j].toString().substring(0,4);
                new_sub_value_node.style.float = "right";
                //new_sub_text_node = document.createTextNode(data_dict[main_categories[i]][1][j]);
                new_sub_li.appendChild(new_sub_progress_node);
                new_sub_li.appendChild(new_sub_value_node);
                new_li.appendChild(new_sub_li);
                new_ul.appendChild(new_li);
            }
            three_col[i].children[1].appendChild(new_ul);
        }

        // now doing the sub_categories within big5
        for (i = 0; i < sub_categories.length; i++) {
            var parent_li = $("li:contains("+sub_categories[i]+")")[0];
            // the parent div is necessary to hide/display all at once
            var new_div = document.createElement("div");
            new_div.id = sub_categories[i];
            new_div.className += "collapse accordion-body";
            labels_list = returnLabelList(sub_categories[i]);
             // eaach of those sub categories have a series of subsubcategories
            for (var j = 0; j < labels_list.length; j++) {
                new_li = document.createElement("LI");
                new_text_node = document.createTextNode(labels_list[j]);
                new_li.appendChild(new_text_node);
                new_sub_li = document.createElement("LI");
                // generating the progress bars and vallues. the [1] below corresponds to getting percentiles instead of raw value.
                new_sub_progress_node = document.createElement("PROGRESS");
                new_sub_progress_node.className += "progress";
                new_sub_progress_node.max = 1;
                new_sub_progress_node.value = data_dict[sub_categories[i]][1][j];
                new_sub_value_node = document.createElement("SPAN");
                new_sub_value_node.textContent = data_dict[sub_categories[i]][1][j].toString().substring(0,4);
                new_sub_value_node.style.float = "right";
                new_sub_li.appendChild(new_sub_progress_node);
                new_sub_li.appendChild(new_sub_value_node);
                new_li.appendChild(new_sub_li);
                new_div.appendChild(new_li);
            }
            $(new_div).insertAfter(parent_li)
        }

        // add a click listener to change the chevron on the menus
        $('*[data-toggle="collapse"]').click(function(){
            console.log("event triggered");
            console.log(this);
            if($(this.children[0]).hasClass("glyphicon-chevron-down")) {
               this.children[0].className = "glyphicon glyphicon-chevron-right";
            } else {
            this.children[0].className = "glyphicon glyphicon-chevron-down";
            }
         });

        // now put the "Data" tab active in the columns
        DataTabs = $( ".tablinks:contains('Data')" );
        for (i = 0; i<DataTabs.length;i++) {
            DataTabs[i].className += " active";
        }

    });
}



// this handles the chart display

function dataToChart(data_dict) {
    document.addEventListener("DOMContentLoaded", function(event) {

        // start by making a list of all the ids (corresponding to all the graphs)
        id_list = ["values","needs","personality"];

        // iterate over the list of ids to build each chart
        for (var i=0; i < id_list.length; i++ ) {

            // this switch helps build the list for labels of the chart (labels_list)
            labels_list = returnLabelList(id_list[i]);


        // now compile all the data in the graph
            
            var ctx = document.getElementById(id_list[i] + "-graph").getContext('2d');
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

// this makes a correspondance between top and sub categories
function returnLabelList(parent_label) {
    switch(parent_label) {
        case "personality": return ["Openness","Conscientiousness","Extraversion","Agreeableness","Emotional_range"]; break;
        case "needs": return ["challenge","closeness","curiosity","excitement","harmony","ideal","liberty","love","practicality","self_expression","stability","structure"];  break;
        case "values": return ["conservation","openness_to_change","hedonism","self_enhancement","self_transcendence"];  break;
        case "Openness": return ["adventurousness","artistic_interests","emotionality","imagination","intellect","liberalism"];  break;
        case "Conscientiousness": return ["achievement_striving","cautiousness","dutifulness","orderliness","self_discipline","self_efficacy"];  break;
        case "Extraversion": return ["activity_level","assertiveness","cheerfulness","excitement_seeking","outgoing","gregariousness"];  break;
        case "Agreeableness": return ["altruism","cooperation","modesty","uncompromising","sympathy","trust"];  break;
        case "Emotional_range": return ["anger","anxiety","depression","immoderation","self_consciousness","susceptible_to_stress"];  break;
        case "Purchasing_Preferences": return ["consumption_preferences_automobile_ownership_cost","consumption_preferences_clothes_quality","consumption_preferences_clothes_style",
                                                         "consumption_preferences_clothes_comfort","consumption_preferences_influence_brand_name","consumption_preferences_influence_utility",
                                                         "consumption_preferences_influence_online_ads","consumption_preferences_influence_social_media","consumption_preferences_influence_family_members",
                                                         "consumption_preferences_spur_of_moment","consumption_preferences_credit_card_payment"]; break;
        case "Health_and_Activity_Preferences": return ["consumption_preferences_eat_out","consumption_preferences_gym_membership","consumption_preferences_outdoor"]; break;
        case "Other": return ["consumption_preferences_concerned_environment,consumption_preferences_start_business"]; break;
        case "Movie_Preferences": return ["consumption_preferences_movie_romance","consumption_preferences_movie_adventure","consumption_preferences_movie_horror",
                                          "consumption_preferences_movie_musical","consumption_preferences_movie_historical","consumption_preferences_movie_science_fiction",
                                          "consumption_preferences_movie_war","consumption_preferences_movie_drama","consumption_preferences_movie_action",
                                          "consumption_preferences_movie_documentary"]; break;
        case "Music_Preferences": return ["consumption_preferences_music_rap","consumption_preferences_music_country","consumption_preferences_music_r_b",
                                          "consumption_preferences_music_hip_hop","consumption_preferences_music_live_event","consumption_preferences_music_playing",
                                          "consumption_preferences_music_latin","consumption_preferences_music_rock","consumption_preferences_music_classical"]; break;
        case "Reading_Preferences": return ["consumption_preferences_read_frequency","consumption_preferences_books_entertainment_magazines","consumption_preferences_books_non_fiction",
                                            "consumption_preferences_books_financial_investing","consumption_preferences_books_autobiographies"]; break;
    }
}


// this handles the status of the button "send" to submit text
$(document).ready(function() {
     $(':input[type="submit"]').prop('disabled', true);

     // this handles the text area
         $('#freeText').keyup(function() {
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
                if ($('#freeText')[0].value == '') { // if the text area is also empty
                    $(':input[type="submit"]').prop('disabled', true);
                }
            }
        }
     );
 });
