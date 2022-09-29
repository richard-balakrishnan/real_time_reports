var toggler = document.getElementsByClassName('navbar-toggler')[0];
var nav = document.getElementsByClassName('navbar');
var mybutton = document.getElementById("backToTop");
var backToTop = document.getElementsByClassName('backToTop')[0];

document.addEventListener('DOMContentLoaded', function(){
    navHighlightEnableFunction();
    renderRealTimeReports();
    setEventListenerFiler();
    setEventListenerSearch();
})

toggler.addEventListener('click', function () {
    var toggler_dataset = this.dataset['bsTarget'].replace('#', '');
    var sideToggleElement = document.getElementById(toggler_dataset);
    sideToggleElement.classList.toggle("open");
});

backToTop.addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

window.onscroll = function () { scrollToTopEnableFunction(); navHighlightEnableFunction(); };


function navHighlightEnableFunction() {
    if (window.pageYOffset < 10) {
        nav[0].style.backgroundColor = "#fff1e7";
        nav[0].style.boxShadow = "none";
    }
    else {
        nav[0].style.backgroundColor = "#fff";
        nav[0].style.boxShadow = "0 8px 11px -6px rgba(0, 0, 0, 0.12)";
    }
}

function scrollToTopEnableFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function renderRealTimeReports() {
  if (reportData) {
    let drpItems = ["All Categories"];
    reportData.forEach((value, index, array) => {
      console.log(value);
      // dropdown section
      if (!drpItems.includes(value.category)) {
        drpItems.push(value.category);
      }
      // cards section and card append
      let makerTemp = template
        .replace("{{title}}", value.title)
        .replace("{{content}}", value.description)
        .replace("{{category}}", value.category)
        .replace("{{image}}", value.Image);
      let appendTo = document.querySelector("#real_time_reports_section .row");
      let div = document.createElement("div");
      div.className = "col";
      div.innerHTML = makerTemp;
      appendTo.append(div);
    });
    //dropdown append
    drpItems.forEach((value, index, array) => {
      let drpdwnItem = document.querySelector("#filter_section .dropdown-menu");
      let drpItem = drpTemplate.replace("{{item}}", value);
      if (index == 0) drpItem = drpItem.replace("{{isActive}}", "active");
      else drpItem = drpItem.replace("{{isActive}}", "");
      let li = document.createElement("li");
      li.innerHTML = drpItem;
      drpdwnItem.append(li);
    });
  }
}

function setEventListenerFiler() {
    let searchBox = document.querySelector("#filter_section input");
    let dropdown = document.querySelector("#filter_section .dropdown-menu");
    let drpdwnTitle = document.querySelector("#filter_section button");
    let dropdownItems = document.querySelectorAll("#filter_section a");
    dropdown.addEventListener("click", function (e) {
        if (e.target.tagName == "A") {
            searchBox.value = '';
            let category = e.target.innerText.trim().toUpperCase();
            // change drodown text to selected item
            drpdwnTitle.innerText = e.target.innerText.trim();
            // remove exsisting active class for dropdown item
            dropdownItems.forEach((value, index, array) => {
                value.classList.contains("active") ? value.classList.remove('active') : '';
            })
            // add active class for selected drodpwn item
            e.target.classList.add("active");
            let cards = document.querySelectorAll("#real_time_reports_section .col");
            cards.forEach((value, index, array) => {
                let classList = value.getElementsByClassName("card")[0].classList;
                if (category == "ALL CATEGORIES") {
                    cards[index].style.display = "block";
                } else {
                    if (classList[classList.length - 1].trim().toUpperCase() == category) {
                        cards[index].style.display = "block";
                    } else {
                        cards[index].style.display = "none";
                    }
                }
            });
        }
    });
}


function setEventListenerSearch() {
    let searchBox = document.querySelector("#filter_section input");
    let drpdwnTitle = document.querySelector("#filter_section button");
    let cards = document.querySelectorAll("#real_time_reports_section .col");
    searchBox.addEventListener("keyup", function (e) {
        let searchVal = searchBox.value;
        cards.forEach((value, index, array) => {
            let cardTitle = value.getElementsByClassName("card-title")[0].innerText;
            if (drpdwnTitle.innerText.trim().toUpperCase() == "ALL CATEGORIES") {
                if (cardTitle.trim().toUpperCase().indexOf(searchVal.trim().toUpperCase()) > -1) {
                    cards[index].style.display = "block";
                } else {
                    cards[index].style.display = "none";
                }
            } else {
                cards.forEach((value, index, array) => {
                    if (
                        value.getElementsByClassName(drpdwnTitle.innerText.trim()).length >
                        0
                    ) {
                        let cardTitle = value.getElementsByClassName("card-title")[0].innerText;
                        if (cardTitle.trim().toUpperCase().indexOf(searchVal.trim().toUpperCase()) > -1) {
                            cards[index].style.display = "block";
                        } else {
                            cards[index].style.display = "none";
                        }
                    }
                });
            }
        });
    });
}

var drpTemplate = `<a class="dropdown-item {{isActive}}">{{item}}</a>`;

var template = `
    <div class="card h-100 {{category}}">
        <img src="./asset/{{image}}.png" class="card-img-top" id="real_time_reports_img" alt="real time report image">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text text-truncate text-truncate-2">{{content}}</p>
        </div>
    </div>`;