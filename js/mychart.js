var chart = new Chartist.Bar('.ct-chart', {
  labels: ['Basic FrontEnd: HTML5 / CSS3 / JavaScript', 
  				 'FrontEnd Library: jQuery / React JS / Angular JS', 
  				 'Web Framework: Ruby on Rails', 
  				 'RDBS: MySQL / MS-SQL / PostgreSQL', 
  				 'NoSQL: MongoDB', 'Baas: Parse / Firebase', 
  				 'Version Control: Git / Subversion', 
  				 'Mobile: Android / React Native',
  				 'Low-Level Language: Assembly / C',
  				 'OOP Language: C++ / Java',
  				 'Modern Language: Ruby / Python'],
  series: [5, 2, 3, 3, 1, 2, 4, 2, 4, 4, 2]
}, {
	distributeSeries: true,
	seriesBarDistance: 10,
  axisX: {
    offset: 50
  },
  axisY: {
    offset: 150,
    labelInterpolationFnc: function(value) {
      str = '';
      switch (value){
      	case 1:
      		str = 'Fundamental Awareness. Basic Knowledge';
      		break;
      	case 2:
      		str = 'Novice. Limited Experience.';
      		break;
      	case 3:
      		str = 'Intermediate. Practical Application.';
      		break;
      	case 4:
      		str = 'Advanced. Applied Theory.';
      		break;
      	case 5:
      		str = "Expert. Recognized Authority.";
      		break;
      }
      return str;
    },
    // scaleMinSpace: 15
  }
}).on('draw', function(data) {
  if(data.type === 'bar') {
    data.element.attr({
      style: 'stroke-width: 30px'
    });
  }
});

// Let's put a sequence number aside so we can use it in the event callbacks
var seq = 0,
  delays = 80,
  durations = 500;

// Once the chart is fully created we reset the sequence
chart.on('created', function() {
  seq = 0;
});

// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
chart.on('draw', function(data) {
  seq++;

  if(data.type === 'bar') {
    // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
    data.element.animate({
      opacity: {
        // The delay when we like to start the animation
        begin: seq * delays + 1000,
        // Duration of the animation
        dur: durations,
        // The value where the animation should start
        from: 0,
        // The value where it should end
        to: 1
      }
    });
  } else if(data.type === 'label' && data.axis === 'x') {
    data.element.animate({
      y: {
        begin: seq * delays,
        dur: durations,
        from: data.y + 100,
        to: data.y,
        // We can specify an easing function from Chartist.Svg.Easing
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'label' && data.axis === 'y') {
    data.element.animate({
      x: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 100,
        to: data.x,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'point') {
    data.element.animate({
      x1: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      x2: {
        begin: seq * delays,
        dur: durations,
        from: data.x - 10,
        to: data.x,
        easing: 'easeOutQuart'
      },
      opacity: {
        begin: seq * delays,
        dur: durations,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      }
    });
  } else if(data.type === 'grid') {
    // Using data.axis we get x or y which we can use to construct our animation definition objects
    var pos1Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis.units.pos + '1'] - 30,
      to: data[data.axis.units.pos + '1'],
      easing: 'easeOutQuart'
    };

    var pos2Animation = {
      begin: seq * delays,
      dur: durations,
      from: data[data.axis.units.pos + '2'] - 100,
      to: data[data.axis.units.pos + '2'],
      easing: 'easeOutQuart'
    };

    var animations = {};
    animations[data.axis.units.pos + '1'] = pos1Animation;
    animations[data.axis.units.pos + '2'] = pos2Animation;
    animations['opacity'] = {
      begin: seq * delays,
      dur: durations,
      from: 0,
      to: 1,
      easing: 'easeOutQuart'
    };

    data.element.animate(animations);
  }
});

// For the sake of the example we update the chart every time it's created with a delay of 10 seconds
// chart.on('created', function() {
//   if(window.__exampleAnimateTimeout) {
//     clearTimeout(window.__exampleAnimateTimeout);
//     window.__exampleAnimateTimeout = null;
//   }
//   window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
// });
