var svgWidth = 900;
var svgHeight = 600;

  var margin = {
    top: 50,
    bottom: 100,
    right: 50,
    left: 110
  };

var labelspair={"poverty": "Poverty (%)","age":"Age (Median)","income":"Household Income (Median)","healthcare":"Lacks Healthcare (%)","smokes":"Smokes (%)","obesity":"Obesity (%)"}
var Xlabelspair ={"poverty": "Poverty (%)","age":"Age (Median)","income":"Household Income (Median)"}
var Ylabelspair={"healthcare":"Lacks Healthcare (%)","smokes":"Smokes (%)","obesity":"Obesity (%)"}
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;
var currentX="poverty";
var currentY="healthcare";
var currentText = "abbr";
var chartGroup,labelsGroup,axisI,pairAxis,jData;
var iPair={0:3,1:4,2:5,3:0,4:1,5:2}