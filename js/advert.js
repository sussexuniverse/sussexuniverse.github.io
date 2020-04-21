function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = this.responseXML;
      make_ALL_talk_list();
    }
  };
  xmlhttp.open("GET", "./talks.xml", true);
  xmlhttp.send();
}



function make_ALL_talk_list() {

  var colors = {"astronomy": "682CBF", "quantum": "3E49BB", "particle": "526EFF", "materials": "32C12C", "mathematics": "FFEF00", "chemistry": "FF5500", "biology": "D40C00"};
  var subjects = ['all','astronomy','quantum','particle','materials','mathematics','chemistry','biology'];

  x = xmlDoc.getElementsByTagName("title");
  txt = "";
  for (i=x.length-1; i>=0; i--) {
    subject = xmlDoc.getElementsByTagName('talk')[i].getAttribute('subject');
    txt += '<div class="talk" onclick = "show_talk('+i+')";>';
    txt += '<img class="talk_image" src="images/talks/'+xmlDoc.getElementsByTagName('name')[i].childNodes[0].nodeValue+'@preview.jpg">';

    status = xmlDoc.getElementsByTagName('talk')[i].getAttribute('status');
    if (status=='0') {
      txt += '<div class="talk_status">LIVE Q&amp;A on Zoom</div>';
    } else if (status=='1') {
      txt += '<div class="talk_status">WATCH NOW</div>';
    } else {
      txt += '<div class="talk_status">NOT YET ONLINE</div>';
    }

    txt += '<div class="talk_subject" style="background-color: #'+colors[subject]+';"><img style="width:150px;" src="images/'+subject+'@4x.png"></div>';
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
