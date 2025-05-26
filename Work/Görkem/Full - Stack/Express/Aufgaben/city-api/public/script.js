fetch('/api/city/')
      .then(res => res.json())
      .then(cities => {
        const list = document.getElementById('city-list');
        cities.forEach(city => {
          const li = document.createElement('li');
          li.textContent = city.name + ' (ID: ' + city.id + ')';
          list.appendChild(li);
        });
    });