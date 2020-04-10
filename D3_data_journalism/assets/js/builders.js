function createChart(){
  
        var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

        var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    return chartGroup;
  }

function createScale(jData,axisName)
{
        var currentLinearScale = d3.scaleLinear()
        .domain([d3.min(jData, d => d[axisName]*0.9),d3.max(jData, d => d[axisName]*1.6)])
        .range([0, width]);

    return currentLinearScale;
};
function createAxis(chartGroup,xLinearScale,yLinearScale){
    // create axes
    if (xLinearScale)
    {
        var xAxis = d3.axisBottom(xLinearScale);
        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);
        
        return xAxis;
    }
    if(yLinearScale)
    {
        var yAxis = d3.axisLeft(yLinearScale).ticks(6);;

        chartGroup.append("g")
        .call(yAxis);
        
        return yAxis;
    }

}

function updateChart(chartGroup,jData,currentX,currentY,xLinearScale,yLinearScale){

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
  function updateText(chartGroup,jData,currentX,currentY,currentText,xLinearScale,yLinearScale){
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
function createLabelsGroup(chartGroup){
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    return labelsGroup;
}
function setLabel(labelsGroup,SelectedKey,axis,i,akey){
    var SelectedKeyValue, degrees,x,y;
                    Object.entries(labelspair).forEach(([key,value])=>{
                      if (SelectedKey ==key)
                      {
                        SelectedKeyValue =value;
                      }
                    })
    if (axis=="X"){
      degrees = 0;
      x=0
      y=(i+1)*20
    }
    else{
      degrees=-90;
      x=(margin.left) * 2.5
      
      y=0 - (height - i*20);
    }
    var currentLabel = labelsGroup.append("text")
    .attr("transform", "rotate("+degrees+")")
    .attr("x", x)
    .attr("y", y)
    .attr("value", SelectedKey) // value to grab for event listener.
    .text(SelectedKeyValue);
    
    console.log(SelectedKey);
    console.log(SelectedKeyValue);
          if (akey==SelectedKey){
              console.log("a="+akey);
                currentLabel.classed("active", true);
                currentLabel.classed("inactive", false);
          }
          else if (akey == null)
          {
              if (i==0)
                {
                  currentLabel.classed("active", true);
                  currentLabel.classed("inactive", false);
                }
              if (i==3)
                {
                  currentLabel.classed("active", true);
                  currentLabel.classed("inactive", false);
                }
            }
          else
            {
              currentLabel.classed("active", false);
              currentLabel.classed("inactive", true);
            }
  
    return currentLabel;
  }
  
function populateLabels(labelsGroup,akey){
    var i=0;
    Object.keys(Xlabelspair).forEach((key)=>{
      setLabel(labelsGroup,key,"X",i,akey)
      i++
  
     });
  
  Object.keys(Ylabelspair).forEach((key)=>{
    setLabel(labelsGroup,key,"Y",i,akey)
    i--
  });
  }

    function findObject(clickedvalue){
    var i=0;
    Object.keys(labelspair).forEach((key)=>{
      if(key==clickedvalue){
        Object.entries(iPair).forEach(([key,value])=>{
            if (key == i){
              axisI=value;
            }
        })
      }
      i++;
    })
    var j=0
    Object.keys(labelspair).forEach((key)=>{
      
      if (j==axisI){
        pairAxis=key;
       
      }
      j++;
    });
    
    return pairAxis;
    }