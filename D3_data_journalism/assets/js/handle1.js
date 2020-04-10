var svgArea = d3.select("body").select("svg");

  var svgWidth = 900;
  var svgHeight = 600;

  var margin = {
    top: 50,
    bottom: 100,
    right: 50,
    left: 110
  };



function handeBuild(jData,currentX,currentY){
  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
chartGroup=createChart()
var xLinearScale=createScale(jData,currentX)
var yLinearScale=createScale(jData,currentY)

createAxis(chartGroup,xLinearScale,null);
createAxis(chartGroup,null,yLinearScale);
updateChart(chartGroup,jData,currentX,currentY,xLinearScale,yLinearScale);
updateText(chartGroup,jData,currentX,currentY,currentText,xLinearScale,yLinearScale);
populateLabels(labelsGroup)

return labelsGroup;
}
Data=getData()
var labelsGroup=handeBuild(Data,currentX,currentY);
labelsGroup.selectAll("text")
    .on("click", function() {
      var clickedvalue = d3.select(this).attr("value");
      alert(clickedvalue);
    });