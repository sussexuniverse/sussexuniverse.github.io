function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = this.responseXML;
      make_ALL_talk_list();
      use_params();
    }
  };
  xmlhttp.open("GET", "./talks.xml", true);
  xmlhttp.send();
}


function use_params() {

  var searchParams = new URLSearchParams(window.location.search);

  console.log(window.location.search);

  if (searchParams.has("talk")==true) {
    show_talk(searchParams.get("talk"));
  }

  if (searchParams.has("subject")==true) {
    make_talk_list(searchParams.get("subject"));
  }

}



function make_talk_list(chosen_subject) {

  var colors = {"astronomy": "682CBF", "quantum": "3E49BB", "particle": "526EFF", "materials": "32C12C", "mathematics": "FFEF00", "chemistry": "FF5500", "biology": "D40C00"};
  var subjects = ['all','astronomy','quantum','particle','materials','mathematics','chemistry','biology'];

  x = xmlDoc.getElementsByTagName("title");
  txt = "";
  for (i=x.length-1; i>=0; i--) {
    subject = xmlDoc.getElementsByTagName('talk')[i].getAttribute('subject');
    if (chosen_subject==subject) {
      txt += '<div class="talk" onclick = "show_talk('+i+')";>';
      txt += '<img class="talk_image" src="images/talks/'+xmlDoc.getElementsByTagName('name')[i].childNodes[0].nodeValue+'@small.jpg">';

      status = xmlDoc.getElementsByTagName('talk')[i].getAttribute('status');
      if (status=='0') {
        txt += '<div class="talk_status">COMING SOON</div>';
      } else if (status=='1') {
        txt += '<div class="talk_status">WATCH NOW</div>';
      } else {
        txt += '<div class="talk_status">NOT YET ONLINE</div>';
      }


      txt += '<div class="talk_subject" style="background-color: #'+colors[subject]+';"><img style="width:50px;" src="images/'+subject+'@4x.png"></div>';
      txt += '<div class="talk_info">';
      txt += '<span class="talk_title">'+x[i].childNodes[0].nodeValue+'</span><br>';
      txt += '<span class="talk_speaker">'+xmlDoc.getElementsByTagName('speaker')[i].childNodes[0].nodeValue+'</span><br>';
      txt += '<span class="talk_date">'+xmlDoc.getElementsByTagName('date')[i].childNodes[0].nodeValue+'</span>';
      txt += '</div>';
      txt += '</div>';

    }
  }
  document.getElementById("talks").innerHTML = txt;

  for (var i = 0; i < subjects.length; i++) {
    document.getElementById('subject-'+subjects[i]).className = "subject";
  }
  document.getElementById('subject-'+chosen_subject).className = "subject_highlighted";


}



function make_ALL_talk_list() {

  var colors = {"astronomy": "682CBF", "quantum": "3E49BB", "particle": "526EFF", "materials": "32C12C", "mathematics": "FFEF00", "chemistry": "FF5500", "biology": "D40C00"};
  var subjects = ['all','astronomy','quantum','particle','materials','mathematics','chemistry','biology'];

  x = xmlDoc.getElementsByTagName("title");
  txt = "";
  for (i=x.length-1; i>=0; i--) {
    subject = xmlDoc.getElementsByTagName('talk')[i].getAttribute('subject');
    txt += '<div class="talk" onclick = "show_talk('+i+')";>';
    txt += '<img class="talk_image" src="images/talks/'+xmlDoc.getElementsByTagName('name')[i].childNodes[0].nodeValue+'@small.jpg">';

    status = xmlDoc.getElementsByTagName('talk')[i].getAttribute('status');
    if (status=='0') {
      txt += '<div class="talk_status">COMING SOON</div>';
    } else if (status=='1') {
      txt += '<div class="talk_status">WATCH NOW</div>';
    } else {
      txt += '<div class="talk_status">NOT YET ONLINE</div>';
    }

    txt += '<div class="talk_subject" style="background-color: #'+colors[subject]+';"><img style="width:50px;" src="images/'+subject+'@4x.png"></div>';
    txt += '<div class="talk_info">';
    txt += '<span class="talk_title">'+x[i].childNodes[0].nodeValue+'</span><br>';
    txt += '<span class="talk_speaker">'+xmlDoc.getElementsByTagName('speaker')[i].childNodes[0].nodeValue+'</span><br>';
    txt += '<span class="talk_date">'+xmlDoc.getElementsByTagName('date')[i].childNodes[0].nodeValue+'</span>';
    txt += '</div>';
    txt += '</div>';
  }
  document.getElementById("talks").innerHTML = txt;

  for (var i = 0; i < subjects.length; i++) {
    document.getElementById('subject-'+subjects[i]).className = "subject";
  }
  document.getElementById('subject-all').className = "subject_highlighted";


}


function show_talk(i) {

  // history.pushState(null, null, 'index.html?talk='+String(i));

  console.log(i);
  status = xmlDoc.getElementsByTagName('talk')[i].getAttribute('status');

  if (status=='1') {
    document.getElementById("talk_window").innerHTML = '<div id="videoWrapper"><iframe src="https://www.youtube.com/embed/'+xmlDoc.getElementsByTagName('youtube')[i].childNodes[0].nodeValue+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
  } else if (status=='0') {
    document.getElementById("talk_window").innerHTML = '<img width="100%" src="images/talks/'+xmlDoc.getElementsByTagName('name')[i].childNodes[0].nodeValue+'@preview.jpg"><div id="talk_status">COMING SOON</div><div id="zoom_status">LIVE Q&A ON ZOOM</div>';
  } else {
    document.getElementById("talk_window").innerHTML = '<img width="100%" src="images/talks/'+xmlDoc.getElementsByTagName('name')[i].childNodes[0].nodeValue+'@preview.jpg"><div id="talk_status">TBD</div>';
  }

document.getElementById("talk_window").innerHTML += '<div id="talk_close" onclick="close_talk();"><img width="30px" src="images/close.png"></div>';

  document.getElementById("talk_title").innerHTML = xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue;
  document.getElementById("talk_speaker").innerHTML = xmlDoc.getElementsByTagName('speaker')[i].childNodes[0].nodeValue;
  document.getElementById("talk_date").innerHTML = xmlDoc.getElementsByTagName('date')[i].childNodes[0].nodeValue;


  if (status=='0') {
    document.getElementById("talk_website").innerHTML = 'Watch live on <a href="https://www.youtube.com/channel/UC0EJg0QOaBzolMegQFd5Xww">YouTube</a> from 7pm';
    document.getElementById("talk_zoom").innerHTML = 'Live Q&#38;A on <a href="'+xmlDoc.getElementsByTagName('zoom')[i].childNodes[0].nodeValue+'">Zoom</a>';
    $("#talk_zoom").css("display", "block");
    $("#talk_website").css("display", "block");
  } else {
    $("#talk_zoom").css("display", "none");
    $("#talk_website").css("display", "none");
  }

  document.getElementById("talk_abstract").innerHTML = xmlDoc.getElementsByTagName('abstract')[i].childNodes[0].nodeValue;

  $("#talk_background").css("display", "block");
  $("#talk_container").css("display", "block");
  $(window).scrollTop(0);


}


function close_talk() {
  $("#talk_background").css("display", "none");
  $("#talk_container").css("display", "none");
}
