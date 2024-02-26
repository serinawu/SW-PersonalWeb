const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjQyYTc2MzAxMjZhNDg1N2E5Y2JlMTVjZDlkMWZjMCIsInN1YiI6IjY1ZDg0NThmMWJmODc2MDE2NGJlYWYzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LbOp8JARbv97Liv7TjV-3WLKx7FQ2r6ATzUCS5_9pmM'
    }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=zh-tw&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {
        const randomIndex = Math.floor(Math.random() * response.results.length);

        const movieTitle = response.results[randomIndex].title;
        document.querySelector(".title-info h1").textContent = movieTitle;

        const movieOverview = response.results[randomIndex].overview;
        document.querySelector(".title-info-synapsis").textContent = movieOverview;

        const maturityNumber = response.results[randomIndex].adult ? "18+" : "16+";
        document.querySelector(".maturity-number").textContent = maturityNumber;

        const voteAverage = response.results[randomIndex].vote_average;
        document.querySelector(".duration-vote-average").textContent = voteAverage;

        const language = response.results[randomIndex].original_language;
        document.querySelector(".title-info-metadata-item .language").textContent = language;

        const releaseDate = response.results[randomIndex].release_date;
        document.querySelector(".release_Date").textContent = releaseDate;
    
        const movieBackdrop = response.results[randomIndex].backdrop_path;
        const backdropUrl = "https://image.tmdb.org/t/p/original" +  movieBackdrop;
        
        document.querySelector(".bg-img").style.backgroundImage = `url(${backdropUrl})`;
    
        const imageContainer = document.getElementById("imageContainer");
        const carousel = document.createElement('div');
        carousel.classList = 'carousel';

        const shuffledResults = response.results.sort(() => 0.5 - Math.random());
        shuffledResults.slice().forEach(movie => {
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
            img.alt = 'Movie Poster';
            img.style.objectFit = 'cover';
            img.width = 330;
            img.height = 190;
            carousel.appendChild(img);
        });
        imageContainer.innerHTML = '';
        imageContainer.appendChild(carousel);
    })
    .catch(err => console.error(err));

    //推薦電影slider
    const imageWidth = 350;
    let scrollPosition = 0;
    
    function scrollLeft() {
        if (scrollPosition > 0) {
            scrollPosition -= imageWidth;
            document.querySelector('.carousel').style.transform = `translateX(-${scrollPosition}px)`;
        }
    }
    
    function scrollRight() {
        const carousel = document.querySelector('.carousel');
        const maxScrollPosition = carousel.scrollWidth - carousel.offsetWidth;
    
        if (scrollPosition < maxScrollPosition) {
            scrollPosition += imageWidth;
            document.querySelector('.carousel').style.transform = `translateX(-${scrollPosition}px)`;
        }
    }
    
    document.getElementById('movie-left').addEventListener('click', scrollLeft);
    document.getElementById('movie-right').addEventListener('click', scrollRight);
    