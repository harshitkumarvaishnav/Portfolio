const scriptURL =
        "https://script.google.com/macros/s/AKfycbwAdm4jgLK2yxt5Lmoz2yaDg9rRXwqOrXXlw8UdPv-GChF_c-8HmGXam35O2mYhU2Y7/exec";
      const form = document.forms["submit-to-google-sheet"];
      const msg = document.getElementById("msg");

      // header text  change
      var professions = ["UI/UX Developer", "Graphics Designer", "Content Writer", "Web Developer"];
      var index = 0;
      var professionIndex = 0;
      var professionText = "";
      var interval;
    
      // Function to animate text letter by letter
      function animateText() {
        var profession = professions[index];
        if (professionIndex < profession.length) {
          professionText += profession.charAt(professionIndex);
          document.getElementById("profession").textContent = professionText;
          professionIndex++;
          interval = setTimeout(animateText, 100); // Adjust speed here (milliseconds)
        } else {
          clearTimeout(interval);
          setTimeout(removeText, 1000); // Wait for 1 second before removing text
        }
      }
    
      // Function to remove text letter by letter
      function removeText() {
        if (professionText.length > 0) {
          professionText = professionText.slice(0, -1);
          document.getElementById("profession").textContent = professionText;
          interval = setTimeout(removeText, 50); // Adjust speed here (milliseconds)
        } else {
          clearTimeout(interval);
          index = (index + 1) % professions.length;
          professionIndex = 0;
          setTimeout(animateText, 1000); // Wait for 1 second before starting next profession
        }
      }
    
      // Start the animation
      animateText();


      // form submit
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then((response) => {
            msg.innerHTML = "Message sent successfully";
            setTimeout(function () {
              msg.innerHTML = "";
            }, 1000);
            form.reset();
          })
          .catch((error) => console.error("Error!", error.message));
      });
      
//Back to top script

      document.addEventListener("DOMContentLoaded", function () {
        var backButton = document.getElementById("back-to-top");
    
        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backButton.style.display = "block";
            } else {
                backButton.style.display = "none";
            }
        };
    
        backButton.addEventListener("click", function () {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
        });
    });
    