const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.5
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    let delay = 450; 

    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            setTimeout(() => {
                entry.target.classList.add('appear');
            }, delay);

            delay += 100; 
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

const faders2 = document.querySelectorAll('.Hfade-in');

const appearOptions2 = {
    threshold: 1
};

const appearOnScroll2 = new IntersectionObserver(function(entries, appearOnScroll2) {
    let delay = 100; 

    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            setTimeout(() => {
                entry.target.classList.add('appear');
            }, delay);

            delay += 100; 
            appearOnScroll2.unobserve(entry.target);
        }
    });
}, appearOptions2);

faders2.forEach(fader => {
    appearOnScroll2.observe(fader);
});
