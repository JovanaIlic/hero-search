document.addEventListener("DOMContentLoaded", bindButtons);
var apiKey = "d0b3da6fa1663047e4000bd33c866bc1";
var myVar;

function myFunction() {
    var input, filter, content, b, c, i, erorr;
    input = document.getElementById("myInput");
    erorr = document.getElementById("message");
    filter = input.value.toUpperCase();
    content = document.getElementById("row");
    b = content.getElementsByTagName("div");

    for (i = 0; i < b.length + 1; i++) {
        c = b[i];

        if (c.innerHTML.toUpperCase().indexOf(filter) > -1) {
           c.style.display = "";

        }
         else
        {
            b[i].style.display = "none";


        }

    }
}

function showPage() {

    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
    document.getElementById('myInput').value = '';

}




function bindButtons(event)
{


    var req = new XMLHttpRequest();
    var website = 'https://gateway.marvel.com/v1/public/characters?'
    var web = website + 'ts=1534583810257&apikey=' + apiKey + "&hash=f746bdd4e37d44e8f49de8cfa4d202d7" ;


    req.open('GET', web, true);

    req.setRequestHeader('Content-Type', 'aplication/json');
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400)
        {
            var result = JSON.parse(req.responseText);

             for (var i = 0; i <= result.data.results.length-1; i++) {

                 var value = result.data.results[i];

                 var div1 = document.getElementById('row');
                 var col2 = document.createElement("DIV") ;
                 col2.setAttribute("class", "col-xs-12 col-sm-6 col-md-3 col-xsl-half");


                 var div2 = document.createElement("a") ;
                 div2.setAttribute("class", "item");
                 for (var j = 0; j <= value.urls.length-1; j++)
                     div2.setAttribute("href", value.urls[0].url);


                 div2.setAttribute("target", '_blank');
                 var name = document.createElement("H2") ;
                 name.setAttribute("class", "name");

                 if( value.name !== "undefined")
                    name.innerHTML = value.name;

                 div1.appendChild(col2);
                 col2.appendChild(div2);



                var photo = value.thumbnail.path + "/portrait_uncanny." + value.thumbnail.extension;
                 var itemPicture = document.createElement("IMG");
                 if( photo !== "undefined")
                     itemPicture.src = photo;

                 var picture = document.createElement("SPAN") ;
                 picture.setAttribute("id", "picture");
                 picture.appendChild(itemPicture);
                 div2.appendChild(picture);
                 div2.appendChild(name);
             }
              myVar = setTimeout(showPage, 500);

        }


         event.preventDefault();

    });
    req.send(null);


}