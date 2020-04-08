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

  var labelspair ={"poverty": "Poverty (%)","age":"Age (Median)",
                  "income":"Household Income (Median)","healthcare":"Lacks Healthcare (%)",
                "smokes":"Smokes (%)","obesity":"Obesity (%)"}

  
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  var currentX="poverty";
  var currentY="healthcare";
  var currentText = "abbr";


// create scales
function createScale(jData,axisName)
{
  var currentLinearScale = d3.scaleLinear()
   .domain([d3.min(jData, d => d[axisName]*.5),d3.max(jData, d => d[axisName]*1.5)])
   .range([0, width]);

  return currentLinearScale;
}

  // Append SVG element
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);


  // Append group element
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);


function updateChart(jData,currentX,currentY,xLinearScale,yLinearScale){

  var circlesGroup = chartGroup.selectAll("circle")
  .data(jData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d[currentX]))
  .attr("cy", d => yLinearScale(d[currentY]))
  .attr("r", "10")
  .attr("fill", "gold")
  .attr("stroke-width", "1")
  .attr("stroke", "black")
  .attr("opacity", ".9");

  return circlesGroup
}
function updateText(jData,currentX,currentY,currentText,xLinearScale,yLinearScale){
  var TextGroup = chartGroup.selectAll()
  .data(jData)
  .enter()
  .append("text")
  .text(d => (d[currentText]))
  .attr("x", d => xLinearScale(d[currentX]))
  .attr("y", d => yLinearScale(d[currentY]))
  .style("font-size", "11px")
  .style("text-anchor", "middle")
  .style('fill', 'black')
  .attr("opacity", ".5");

  return TextGroup;
}

function setLabel(skey,axis){
var svalue, degrees,x,y;
  Object.entries(labelspair).forEach(([key,value])=>{
    if (skey ==key)
    {
      svalue =value;
    }
  })
  if (axis=="X"){
    degrees = 0;
    x=0
    y=20
  }
  else{
    degrees=-90;
    x=(margin.left) * 2.5
    y=0 - (height - 40);
  }
  var currentLabel = labelsGroup.append("text")
  .attr("transform", "rotate("+degrees+")")
  .attr("x", x)
  .attr("y", y)
  .attr("value", skey) // value to grab for event listener.
  .classed("active", true)
  .text(svalue);

  return currentLabel;

}

d3.csv("D3_data_journalism/assets/data/data.csv").then(function(jData) {
  
  var xLinearScale = createScale(jData,currentX);
  var yLinearScale = createScale(jData,currentY);


  jData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.age = +data.age;
    data.income = +data.income;
    data.smokes = +data.smokes;
    data.obesity = +data.obesity;
  });

 

  // create axes
  var xAxis = d3.axisBottom(xLinearScale).ticks(6);
  var yAxis = d3.axisLeft(yLinearScale).ticks(6);;


chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

chartGroup.append("g")
  .call(yAxis);


updateChart(jData,currentX,currentY,xLinearScale,yLinearScale);
updateText(jData,currentX,currentY,currentText,xLinearScale,yLinearScale);



setLabel(currentX,"X");
setLabel(currentY,"Y");
  // var toolTip = d3.tip()
  //       .attr("class", "tooltip")
  //       .offset([80, -60])
  //       .html(function(d) {
  //         return (`<strong>${d.abbr}<strong><hr>${d.poverty}
  //         medal(s) won`);
  //       });

  // circlesGroup.on("mouseover", function(d) {
  //   toolTip.show(d, this);
  // })
  // // Step 4: Create "mouseout" event listener to hide tooltip
  //   .on("mouseout", function(d) {
  //     toolTip.hide(d);
  //   });

});
