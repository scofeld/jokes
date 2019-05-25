(function(){
	let buttonRanadom = document.getElementById("random");
	let sidebar = document.getElementById("sidebar");
	let joke = document.getElementById("p");

	function sendRequest(url ,callback){
		if(typeof url !== 'string') return;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
                return;
            }
            var data = JSON.parse(this.responseText);
            if(typeof callback !== 'undefined'){
                callback(data);
			}
        }
	}
	function getCategoryJoke(category){
		if(typeof category !== 'string') return;
        sendRequest('https://api.chucknorris.io/jokes/random?category=' + category, function(data){
            if(typeof data !== 'undefined' && typeof data.value === 'string'){
                printJoke(data.value);
            }
        });
	}
	function getRandomJoke(){
		sendRequest('https://api.chucknorris.io/jokes/random', function(data){
            if(typeof data !== 'undefined' && typeof data.value === 'string'){
                printJoke(data.value);
            }
        });
	}
	function buildSideBar(){
		sendRequest('https://api.chucknorris.io/jokes/categories', function(data){
			if(typeof data !== 'undefined' && Array.isArray(data)){
                var html = data.reduce(function(html, category){
                    return html += '<li class="category">' + category + '</li>';
				}, '');
                sidebar.insertAdjacentHTML("beforeEnd", html);
			}
		});
	}
	function handleCategoryJoke(){
		document.addEventListener('click',function(e){
            if(e.target && e.target.classList.contains('category')){
                getCategoryJoke(e.target.textContent);
			}
		})
	}
	function printJoke(text){
		if(typeof text !== 'string') return;
        joke.innerHTML = text;
	}
	buildSideBar();
	handleCategoryJoke();
	getRandomJoke();
	buttonRanadom.addEventListener('click',getRandomJoke)
})();
