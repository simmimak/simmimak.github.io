window.addEventListener("load", function () {
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function () {
        document.querySelector(".preloader").style.display = "none";

    }, 1000)
})



// Aside Navbar

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        // remove back secion
        removeBackSectionClass();

        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("back-section");
        }


        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                // add back section
                addBackSectionClass(j);
            }
            navList[j].querySelector("a").classList.remove("active")
        }
        this.classList.add("active")
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })

}

function removeBackSectionClass() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section")
    }
}

function addBackSectionClass(num) {
    allSection[num].classList.add("back-section");
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")

}
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", asideSectionTogglerBtn)
function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

window.onscroll = function() {
    scrollFunction();
  };
  
function scrollFunction() {
if (document.body.scrollTop >20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scroll-top").classList.add("show");
    document.getElementById("scroll-message").classList.add("show");
} else {
    document.getElementById("scroll-top").classList.remove("show");
    document.getElementById("scroll-message").classList.remove("show");
}
}

document.getElementById("scroll-top").addEventListener("click", function() {
scrollToTop();
});

function scrollToTop() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}
  

var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var width = canvas.width;
        var height = canvas.height;

        function Particle(x, y) {
            this.x = x;
            this.y = y;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
            this.radius = Math.random() * 10 + 2;
            this.color = "#b77c9a";
        }

        var particles = [];
        for(var i = 0; i < 100; i++) {
            particles.push(new Particle(Math.random() * width, Math.random() * height));
        }

        function drawParticle(p) {
            context.beginPath();
            context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            context.closePath();
            context.fillStyle = p.color;
            context.fill();
        }
//I don't use this func, but you can color randomly some elements with that. I just advise you to create an array of defined colors to avoid it being too flashy. //

        function getRandomColor() {
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }

        function drawLine(p1, p2) {
          context.beginPath();
          context.moveTo(p1.x, p1.y);
          context.lineTo(p2.x, p2.y);
          context.strokeStyle = "#b77c9a";
          context.stroke();
        }

        function animate() {
            context.clearRect(0, 0, width, height);
            for(var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if(p.x < 0 || p.x > width){
                  p.vx = -p.vx;
                }
                if(p.y < 0 || p.y > height) {
                  p.vy = -p.vy;
                }
                drawParticle(p);
                for(var j = i + 1; j < particles.length; j++) {
                  var p2 = particles[j]
                  var dx = p.x - p2.x;
                  var dy = p.y - p2.y;
                  var dist = Math.sqrt(dx * dx + dy * dy);
                  if(dist < 50) {
                    drawLine(p, p2);
                  }
                }
            }
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            width = canvas.width;
            height = canvas.height;
            for(var i = 0; i < particles.length; i++) {
              var p = particles[i];
              if(p.x > width) {
                p.x = width;
              }
              if(p.y > height) {
                p.y = height;
              }
            }
        });