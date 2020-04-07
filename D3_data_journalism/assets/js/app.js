var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
  // var svgWidth = window.innerWidth;
  // var svgHeight = window.innerHeight;

  var svgWidth = 900;
  var svgHeight = 550;

  var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // Append SVG element
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  // Append group element
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("D3_data_journalism/assets/data/data.csv").then(function(jData) {
  

  jData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare= +data.healthcare;
  });

  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(jData, d => d.poverty))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(jData, d => d.healthcare)])
    .range([height, 0]);

  // create axes
  var xAxis = d3.axisBottom(xLinearScale).ticks(6);
  var yAxis = d3.axisLeft(yLinearScale).ticks(6);;


  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

chartGroup.append("g")
  .call(yAxis);

  var circlesGroup = chartGroup.selectAll("circle")
  .data(jData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "10")
  .attr("fill", "gold")
  .attr("stroke-width", "1")
  .attr("stroke", "black");

  var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
          return (`<strong>${d.abbr}<strong><hr>${d.poverty}
          medal(s) won`);
        });

  circlesGroup.on("mouseover", function(d) {
    toolTip.show(d, this);
  })
  // Step 4: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function(d) {
      toolTip.hide(d);
    });

});
