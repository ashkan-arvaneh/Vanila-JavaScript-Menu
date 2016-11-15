(function () {

    var menuData = {
        "menu": [{
            "title": "Events",
            "submenu": [{
                "title": "Cool Events",
                "uri": "#"
            }],
            "uri": "#"
        }, {
            "title": "Articles",
            "submenu": [{
                "title": "Cool Articles",
                "uri": "#"
            }],
            "uri": "#"
        }, {
            "title": "Reporting",
            "submenu": [{
                "title": "Activity Log",
                "uri": "#"
            }, {
                "title": "Statistics",
                "submenu": [{
                    "title": "Real-Time",
                    "uri": "#"
                }, {
                    "title": "Source Metrics",
                    "uri": "#"
                }, {
                    "title": "Users",
                    "uri": "#"
                }, {
                    "title": "Slideshows",
                    "uri": "#"
                }],
                "uri": "#"
            }, {
                "title": "Export/Archive",
                "uri": "#"
            }],
            "uri": "#"
        }, {
            "title": "Syndication",
            "uri": "#"
        }, {
            "title": "API",
            "uri": "#"
        }]
    };

    function removeElementsByClassAndStyleReset(className, el) {
        var liElements = el.parentNode.parentNode.getElementsByClassName('liMenu');

        for(var i=0; i < liElements.length; i++){
            liElements[i].style.backgroundColor = '#cccccc';
        }

        var elements = el.parentNode.parentNode.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    function menuElem(obj, el) {

        for (var i = 0; i < obj.length; i++) {

            var menuElement = document.createElement("li");
            menuElement.className = 'liMenu';
            el.appendChild(menuElement);

            var menuLink = document.createElement("a");
            menuLink.setAttribute("href", obj[i].uri);
            menuLink.setAttribute("title", obj[i].title);

            var arrow = document.createElement("div");
            arrow.className = 'arrow';
            arrow.innerHTML = '>';

            var title = document.createElement("div");
            title.className = 'title';
            title.innerHTML = obj[i].title;

            menuLink.appendChild(title);

            if (typeof obj[i].submenu != 'undefined') {
                menuLink.className = 'subMenuLink';
                menuLink.appendChild(arrow);
            }

            menuElement.appendChild(menuLink);

            if (typeof obj[i].submenu != 'undefined') {
                var subMenu = document.createElement("ul");
                subMenu.className = 'subMenu';

                var properties = {
                    submenu: obj[i].submenu,
                    subMenuEl: subMenu,
                    menuEl: menuElement
                };

                menuLink.properties = properties;
                Object.defineProperty(menuLink, "submenu", { value: properties.submenu });
                Object.defineProperty(menuLink, "subMenuEl", { value: properties.subMenuEl });
                Object.defineProperty(menuLink, "menuEl", { value: properties.menuEl });
                openSubMenu(menuLink);
            }
        }
    }

    function openSubMenu(el) {
        el.addEventListener("click", function (ev) {
            ev.stopPropagation();
            removeElementsByClassAndStyleReset('subMenu', el);
            el.parentNode.style.backgroundColor = '#b8b8b8';
            var subMenus = ev.target.parentNode.parentNode.parentNode.getElementsByTagName("ul");

            var subMenusli = ev.target.parentNode.parentNode.parentNode.getElementsByTagName("li");

            var links = ev.target.parentNode.parentNode.parentNode.getElementsByClassName('subMenuLink');


            for (var i = 0; i < links.length; i++) {
                links[i].style.color = "#fff";
            }

            this.style.color = "#6d6d6d";
            
            if (typeof this.properties.subMenuEl != 'undefined') {
                this.properties.subMenuEl.innerHTML = "";
                this.properties.menuEl.appendChild(this.properties.subMenuEl);
                menuElem(this.properties.submenu, this.properties.subMenuEl);
            }
            else {
                this.subMenuEl.innerHTML = "";
                this.menuEl.appendChild(this.subMenuEl);
                menuElem(this.submenu, this.subMenuEl);
            }

        });

    }

    return menuElem(menuData.menu, document.getElementById("menu"));

})();
