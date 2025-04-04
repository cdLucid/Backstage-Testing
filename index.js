const loader = document.getElementsByClassName("loader")[0]; // Select the loader element

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || "";
            const to = newText[i] || "";
            const start = Math.floor(Math.random() * 80);
            const end = start + Math.floor(Math.random() * 150);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Scramble animation setup
const phrases = [
    "Welcome",
    "My personal replica of backstagetalks.com",
    "Inspired by Buro Milk",
    "Replicated by Dylon LaMarre",
];

const el = document.querySelector(".text");
const fx = new TextScramble(el);

let counter = 0;

// Function to fade out and remove the loader
const hideLoader = () => {
    if (loader) {
        loader.classList.add("hidden"); // Start fade-out transition
        setTimeout(() => {
            loader.style.display = "none"; // Remove after animation ends
        }, 1000); // Matches CSS transition duration
    } else {
        console.error("Loader element not found.");
    }
};

// Function to display text and eventually hide the loader
const next = () => {
    if (counter < phrases.length) {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 800);
        });
        counter++;
    } else {
        hideLoader(); // Apply fade-out transition
    }
};

// Start the animation
next();

const fullScreen = document.getElementById("full-page");

const issues = [
  { id: "issue8", color: "#f6e0a4" },
  { id: "issue7", color: "#ff608c" },
  { id: "issue6", color: "#fff", fontColor: "#000" },
  { id: "issue5", color: "#00c1b5" },
  { id: "issue4", color: "#ff6519" },
  { id: "issue3", color: "#ffbe00" },
  { id: "issue2", color: "#1d3fbb" },
  { id: "issue1", color: "#E30512" },
];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fullScreen.style.backgroundColor = issues.find(
          (issue) => issue.id === entry.target.id
        )?.color;
      }
    });
  },
  {
    root: document.querySelector("#full-page"),
    threshold: 0.5,
  }
);

issues.forEach((issue) => {
  const element = document.getElementById(issue.id);
  if (element) {
    observer.observe(element);
  }
});
