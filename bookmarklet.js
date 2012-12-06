javascript:(function(){

  if (location.href.match(/id([\d]{9})/)) {
    var id = location.href.match(/id([\d]{9})/)[1];
  } else {
    alert("アプリのidを取得できません。");return;
  }

  function getHttp(p, c) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', p, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        c(xmlhttp.responseText);
      }
    };
    xmlhttp.send(null);
  }

  var token = "4d945f60bacc64a52624dcaa11e70cb1070bf90eaf6eedc859e05dc5a4c1677c";
  var mid   = "13894";
  var af    = "http://queltide.com/js/acao.php?u="+encodeURIComponent("token="+token+"&mid="+mid+"&murl="+location.href);
  getHttp(af, function(aflink) {
    getHttp("https://itunes.apple.com/lookup?lang=ja_jp&country=JP&id="+id, function(req) {
      var json = eval("("+req+")");
      if (json.resultCount !== 1) {
        alert("アプリ情報を取得できません。");return;
      } else {
        d = json.results[0];
        var copypa = "<aside class='appstore'><div class='cf'><figure><a href='" +
                   aflink + "' rel='nofollow' target='itunes_store'><img src='" +
                   d.artworkUrl60 + "' width='75' alt='" +
                   d.trackName + "'></a></figure><div class='appstore_dv'><h4><a href='" +
                   aflink + "' rel='nofollow'>" +
                   d.trackName + " <img src='http://s.mzstatic.com/htmlResources/E6C6/web-storefront/images/viewinitunes_jp.png' alt='iTunesで見る' width='90'></a></h4><dl><dt>カテゴリ：</dt><dd>" +
                   d.genres.join(', ') + "</dd><dt>掲載時の価格：</dt><dd>" +
                   d.formattedPrice + "</dd><dt>販売会社：</dt><dd><a href='" +
                   d.artistViewUrl + "' rel='nofollow'>" +
                   d.artistName + "</a></dd><dt>バージョン：</dt><dd>" +
                   d.version + "</dd>";
        if (typeof d.supportedDevices != "undefined") copypa += "<dt>対象デバイス：</dt><dd>" + d.supportedDevices.join(', ') + "</dd>";
        copypa += "</dl></div></div></aside>";

        var d1 = document.createElement('div');
        d1.setAttribute('id', 'queltide_d1');
        d1.setAttribute('style','position:fixed;bottom:0px;left:0px;background-color:#111;filter:alpha(opacity=90);-moz-opacity:0.9;opacity:0.9;z-index:99999;overflow:auto;width:100%;height:100%;text-align:center;');
        document.body.appendChild(d1);

        var d2 = document.createElement('div');
        d2.setAttribute('id', 'queltide_d2');
        d2.setAttribute('style','padding:15px;position:fixed;width:400px;left:50%;top:10%;margin-left:-200px;z-index:99999;background:#FFF;border-radius:.25rem;-moz-border-radius:.25rem;-webkit-border-radius:.25rem;');
        d2.innerHTML="<h5>以下のHTMLをコピーしてブログにペースト。</h5><br><textarea style='width:370px;height:200px;border-radius:.25rem;-moz-border-radius:.25rem;-webkit-border-radius:.25rem;'>"+copypa+"</textarea>";
        document.body.appendChild(d2);
      }
    });
  });

})();
