// Generated by CoffeeScript 1.4.0
var Chart, excluded, height, log, padding, width;

padding = 20;

height = 400;

width = 1000;

excluded = [2, 14];

log = function(m) {
  if (typeof console !== "undefined" && console !== null) {
    return console.log(m);
  }
};

Chart = (function() {

  function Chart(selector) {
    selector = selector || 'body';
    this.svg = d3.select(selector).append('svg').attr('width', width).attr('height', height);
    this.x = d3.scale.linear().domain([2000, 2012]).range([padding, width - padding]);
    this.axis = d3.svg.axis().scale(this.x).ticks(13).tickFormat(d3.format('0'));
    this.axisSelection = this.svg.append('g').attr('class', 'axis').attr('transform', 'translate(0, ' + (height - padding) + ')').call(this.axis);
  }

  Chart.prototype.load = function() {
    var _this = this;
    return d3.json('info', function(data) {
      return _this.handle(data);
    });
  };

  Chart.prototype.detach = function() {
    return $(this.svg.node).detach();
  };

  Chart.prototype.line = function(d) {
    var domain, line, x, y,
      _this = this;
    domain = d3.extent(d, function(d) {
      return d[1];
    });
    y = d3.scale.linear().domain(domain).range([height - 2 * padding, padding]);
    x = d3.scale.linear().domain([2000, 2015]).range([padding, width - padding]);
    line = d3.svg.line().y(function(d) {
      return y(d[1]);
    }).x(function(d) {
      return _this.x(Number(d[0]));
    });
    return line(d);
  };

  Chart.prototype.handle = function(data) {
    var index, _i, _len, _ref, _results;
    this.data = data;
    _ref = this.data;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      index = _ref[_i];
      _results.push(this.draw(index));
    }
    return _results;
  };

  Chart.prototype.draw = function(index) {
    var _this = this;
    return this.svg.append('path').datum(index.data.body).attr('class', 'line ' + index["class"]).attr('d', function(d) {
      return _this.line(d);
    }).append('title').text(index.description);
  };

  return Chart;

})();
