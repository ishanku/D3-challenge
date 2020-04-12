function handeBuild(currentX,currentY){
    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
      }
    console.clear();
    d3.csv("D3_data_journalism/assets/data/data.csv").then(function(jData) {    
        jData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.age = +data.age;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
        });
       
        
        var chartGroup = createChart();
        var xLinearScale=createScale(jData,currentX)
        var yLinearScale=createScale(jData,currentY)
        createAxis(chartGroup,xLinearScale,null);
        createAxis(chartGroup,null,yLinearScale);
        circlesGroup=updateChartCircles(chartGroup,jData,currentX,currentY,xLinearScale,yLinearScale);
        updateText(chartGroup,jData,currentX,currentY,currentText,xLinearScale,yLinearScale);
        
        var labelsGroup=createLabelsGroup(chartGroup);
        populateLabels(labelsGroup,currentX,currentY)
    

        labelsGroup.selectAll("text")
        .on("click", function() {
        var clickedvalue = d3.select(this).attr("value");
        var PairAxis=findObject(clickedvalue)
        Object.keys(Xlabelspair).forEach((key)=>{
            if(clickedvalue==key)
                {

                    currentX=clickedvalue;
                    currentY=PairAxis;
                    handeBuild(currentX,currentY);
                }
        })
        Object.keys(Ylabelspair).forEach((key)=>{
            if(clickedvalue==key)
                {

                    currentY=clickedvalue;
                    currentX=PairAxis;
                    handeBuild(currentX,currentY);
                }
        })
       

    })
    });
}

handeBuild(currentX,currentY);
