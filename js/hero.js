//document.addEventListener("DOMContentLoaded", bindButtons);

window.onload = function()
{
  bindButtons();



}
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
            c.style.display = "none";


        }
    }
}

function showPage() {

    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
    document.getElementById('myInput').value = '';

}


function showLoader() {

    document.getElementById("loader-wrapper").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
    document.getElementById('myInput').value = '';

}


function bindButtons(event)
{


    var req = new XMLHttpRequest();
    var website = 'https://gateway.marvel.com/v1/public/characters?';
    var limit = 12;

    if(event)
    {
      var  page = event;
    }
    else
    {
        var page = 1;
    }

    var ofset = (page - 1)*limit ;

    console.log(page);

    var web = website + 'limit=' + limit + '&offset=' + ofset + '&ts=1534583810257&apikey=' + apiKey + "&hash=f746bdd4e37d44e8f49de8cfa4d202d7" ;


    req.open('GET', web, true);

    req.setRequestHeader('Content-Type', 'aplication/json');
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400)
        {
            var result = JSON.parse(req.responseText);
            var div1 = document.getElementById('row');

            var totalNumberOfItems = result.data.total;
            var totalNumberOfPages = Math.round(totalNumberOfItems/limit);
            totalNumberOfPages += 1
            if(!event) {

                $(".pagination").append("<li class='current-page active' ><a href='javascript:void(0)'>" + 1 + "</a></li>");


                for (var b = 2; b <= totalNumberOfPages; b++) {

                    $(".pagination").append("<li class='current-page' ><a href='javascript:void(0)'>" + b + "</a></li>");

                }

                $(".pagination li.current-page").on("click", function () {
                    if ($(this).hasClass("active")) {
                        return false;
                    }
                    else {

                        var currentPage = $(this).index();

                        $(".pagination li").removeClass("active");
                        $(this).addClass("active");

                        bindButtons(currentPage);

                        document.getElementById("row").textContent = "";
                        myVar = setTimeout(showLoader, 500);
                    }

                });
            }

            for (var i = 0; i <= result.data.results.length-1; i++) {

                 var value = result.data.results[i];


                 var col2 = document.createElement("DIV") ;
                 col2.setAttribute("class", "col-xs-12 col-sm-6 col-md-3 col-xsl-half list-group");


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




    });

    req.send(null);


}








