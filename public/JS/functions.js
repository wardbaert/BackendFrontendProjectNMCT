function getdata(){
        var naam = document.getElementById("searchbox").value;
        var url = 'http://localhost:3000/searchSerie/'+naam;
        var databox = document.getElementById('searchContent')
        $.get(url,function(data, status){
           while (databox.firstChild) {
            databox.removeChild(databox.firstChild);
            }
            var h2 = document.createElement("h2")       
            var t3 = document.createTextNode("Search results");
            h2.appendChild(t3);
            databox.appendChild(h2);
            for (i = 0; i < data.results.length; ++i) {
                if(data.results[i].poster_path != null){
               var div1 = document.createElement("div");
               div1.setAttribute('class','col-md-3');
               var h = document.createElement("H4")                // Create a <h1> element
               var t = document.createTextNode(data.results[i].name);                                               
               var img = document.createElement("img");
               var btn = document.createElement("a");
               //btn.setAttribute('class', 'btn btn-default')
               btn.setAttribute('href', '/detail/'+data.results[i].id);
               img.setAttribute('src', 'https://image.tmdb.org/t/p/w185'+data.results[i].poster_path);
                console.log("serie "+data.results[i].name);
                 h.appendChild(t);  
                div1.appendChild(h);
                div1.appendChild(img);
                btn.appendChild(div1);
                databox.appendChild(btn);
                }
            }
        })
}